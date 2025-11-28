import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Helmet } from "react-helmet-async";

import { getQaByQuestionNumber, listQa, type QaEntry } from "../../lib/qaStore";
import LoadingSpinner from "../Common/LoadingSpinner";
import { useAuth } from "../../context/AuthContext";
import { auth, db } from "../../firebase";
import { buildQaCanonicalUrl, isGooglebot, stripHtml } from "../../utils/seo";
import { API_BASE_URL } from "../../config/api";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

const formatINR = (value: number) => {
  const hasDecimal = Math.round(value * 100) % 100 !== 0;
  return `₹${value.toLocaleString("en-IN", {
    minimumFractionDigits: hasDecimal ? 2 : 0,
    maximumFractionDigits: hasDecimal ? 2 : 0,
  })}`;
};

const ACCESS_TOKEN_PREFIX = "qa_access_";
const SITE_URL =
  import.meta.env.VITE_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://essay-embassy-project.onrender.com";
const DEFAULT_UPVOTE_COUNT = 10;

function useUnlocked() {
  const KEY = "qaUnlockedIds";
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      setIds(raw ? (JSON.parse(raw) as string[]) : []);
    } catch {
      setIds([]);
    }
  }, []);
  const isUnlocked = (id: string) => ids.includes(id);
  const unlock = (id: string) => {
    const next = Array.from(new Set([...ids, id]));
    localStorage.setItem(KEY, JSON.stringify(next));
    setIds(next);
  };
  return { ids, isUnlocked, unlock };
}

export type PublicQaDetailProps = {
  questionNumber: string;
  slug: string;
};

const PublicQaDetail: React.FC<PublicQaDetailProps> = ({
  questionNumber,
  slug,
}) => {
  const [entry, setEntry] = useState<QaEntry | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isUnlocked, unlock } = useUnlocked();
  const [remoteUnlocked, setRemoteUnlocked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [razorpayReady, setRazorpayReady] = useState(false);
  const { user } = useAuth();
  const [guestUnlocked, setGuestUnlocked] = useState(false);
  const [showOptionalEmailPrompt, setShowOptionalEmailPrompt] = useState(false);
  const [optionalEmail, setOptionalEmail] = useState("");
  const [isSendingMagicLink, setIsSendingMagicLink] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [storedAccessToken, setStoredAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (window.Razorpay) {
      setRazorpayReady(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayReady(true);
    script.onerror = () =>
      console.error("Failed to load Razorpay checkout script");
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setNotFound(false);
    (async () => {
      try {
        const matchByNumber = await getQaByQuestionNumber(questionNumber);
        if (!isMounted) return;
        if (matchByNumber && matchByNumber.status === "published") {
          setEntry(matchByNumber);
        } else {
          // fallback: load list and try to match (legacy data)
          const all = await listQa({ status: "published" });
          const fallback = all.find(
            (e) => e.questionNumber === questionNumber && e.slug === slug
          );
          if (fallback) {
            setEntry(fallback);
          } else {
            setNotFound(true);
          }
        }
      } catch (error) {
        console.error("Failed to load Q&A entry", error);
        if (isMounted) setNotFound(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [questionNumber, slug]);

  const checkIfUnlocked = useCallback(async () => {
    if (!user || !entry) return;
    try {
      const unlocksQuery = query(
        collection(db, "qaUnlocks"),
        where("userId", "==", user.uid || user.id),
        where("questionNumber", "==", entry.questionNumber),
        where("status", "==", "completed")
      );
      const snapshot = await getDocs(unlocksQuery);
      const unlocked = !snapshot.empty;
      setRemoteUnlocked(unlocked);
      if (unlocked) {
        unlock(entry.id);
      }
    } catch (error) {
      console.error("Error checking unlock status:", error);
    }
  }, [entry, unlock, user]);

  useEffect(() => {
    if (!user || !entry) {
      setRemoteUnlocked(false);
      return;
    }
    checkIfUnlocked();
  }, [user, entry, checkIfUnlocked]);

  const createOrderUrl = `${API_BASE_URL}/api/create-order`;
  const registerAccessUrl = `${API_BASE_URL}/api/register-access`;
  const sendMagicLinkUrl = `${API_BASE_URL}/api/send-magic-link`;
  const verifyAccessUrl = `${API_BASE_URL}/api/verify-access`;

  const accessStorageKey = entry
    ? `${ACCESS_TOKEN_PREFIX}${entry.questionNumber}`
    : null;

  const verifyToken = useCallback(
    async (token: string, questionNumber: string) => {
      try {
        const response = await fetch(verifyAccessUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ questionNumber, accessToken: token }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Unable to verify access");
        }
        return Boolean(data.valid);
      } catch (error) {
        console.error("Access token verification failed:", error);
        return false;
      }
    },
    [verifyAccessUrl]
  );

  const ensureTokenAccess = useCallback(
    async (token: string) => {
      if (!entry) return false;
      const valid = await verifyToken(token, entry.questionNumber);
      if (valid) {
        if (accessStorageKey) {
          localStorage.setItem(accessStorageKey, token);
        }
        setStoredAccessToken(token);
        setGuestUnlocked(true);
      }
      return valid;
    },
    [accessStorageKey, entry, verifyToken]
  );

  const registerAccess = useCallback(
    async (
      paymentResponse: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      },
      email: string | null
    ) => {
      if (!entry) {
        throw new Error("Question not available");
      }

      const response = await fetch(registerAccessUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionNumber: entry.questionNumber,
          questionId: entry.id,
          questionTitle: stripHtml(entry.title || entry.question || ""),
          questionSlug: entry.slug,
          paymentId: paymentResponse.razorpay_payment_id,
          orderId: paymentResponse.razorpay_order_id,
          paymentSignature: paymentResponse.razorpay_signature,
          userId: user?.uid || null,
          email: email || null,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to register access");
      }
      return data as { accessToken: string; hasEmail?: boolean };
    },
    [entry, registerAccessUrl, user]
  );

  const sendMagicLink = useCallback(
    async (emailAddress: string, tokenOverride?: string | null) => {
      if (!entry) throw new Error("Question not available");
      const tokenToUse =
        tokenOverride ??
        (accessStorageKey ? localStorage.getItem(accessStorageKey) : null);
      if (!tokenToUse) {
        throw new Error("Access token not found");
      }

      const response = await fetch(sendMagicLinkUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailAddress,
          questionNumber: entry.questionNumber,
          slug: entry.slug,
          accessToken: tokenToUse,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to send magic link");
      }
      return data;
    },
    [accessStorageKey, entry, sendMagicLinkUrl]
  );

  const verifyAndUnlock = useCallback(
    async (paymentResponse: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    }) => {
      if (!entry) return;
      try {
        const emailForRecord = user?.email || null;
        const registration = await registerAccess(
          paymentResponse,
          emailForRecord
        );
        const token = registration?.accessToken;
        if (token) {
          await ensureTokenAccess(token);
        }
        unlock(entry.id);
        if (user) {
          setRemoteUnlocked(true);
        }
        if (emailForRecord && token) {
          try {
            await sendMagicLink(emailForRecord, token);
            toast.success("Magic link sent to your email.");
            setMagicLinkSent(true);
          } catch (emailError) {
            console.error("Magic link email failed:", emailError);
          }
          setShowOptionalEmailPrompt(false);
        } else {
          setShowOptionalEmailPrompt(true);
          setMagicLinkSent(false);
        }
        toast.success("✅ Answer unlocked successfully!");
      } catch (error) {
        console.error("Verification error:", error);
        toast.error(
          error instanceof Error
            ? error.message
            : "Payment verification failed. Please contact support."
        );
      } finally {
        setIsProcessing(false);
      }
    },
    [
      ensureTokenAccess,
      entry,
      registerAccess,
      sendMagicLink,
      unlock,
      user,
    ]
  );

  const handleUnlock = useCallback(async () => {
    if (!entry) {
      toast.error("Question details missing. Please refresh and try again.");
      return;
    }
    if (!razorpayReady || !window.Razorpay) {
      toast.error("Payment gateway not ready. Please try again.");
      return;
    }

    setIsProcessing(true);

    try {
      const idToken = user ? await auth.currentUser?.getIdToken() : null;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (idToken) {
        headers.Authorization = `Bearer ${idToken}`;
      }

      const amountInPaise = Math.max(Math.round(entry.price * 100), 100);
      const response = await fetch(createOrderUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({
          amount: amountInPaise,
          currency: "INR",
          type: "qa_unlock",
          questionNumber: entry.questionNumber,
          questionId: entry.id,
          questionTitle: stripHtml(entry.title || entry.question || ""),
          questionSlug: entry.slug,
          userId: user?.uid || null,
          email: user?.email || null,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create order. Please retry.");
      }

      const orderDetails = data.order || {};
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderDetails.amount || amountInPaise,
        currency: orderDetails.currency || "INR",
        name: "Essay Embassy",
        description: stripHtml(entry.title || entry.question || ""),
        order_id: orderDetails.id || data.orderId,
        handler: verifyAndUnlock,
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },
        theme: {
          color: "#0d9488",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      };

      const razorpay = new window.Razorpay!(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to initiate payment. Please try again."
      );
      setIsProcessing(false);
    }
  }, [
    createOrderUrl,
    entry,
    razorpayReady,
    user,
    verifyAndUnlock,
  ]);

  const handleSendMagicLink = useCallback(async () => {
    const emailValue = optionalEmail.trim();
    if (!emailValue) {
      toast.error("Please enter your email address.");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailValue)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      setIsSendingMagicLink(true);
      await sendMagicLink(emailValue, storedAccessToken);
      toast.success("Magic link sent! Check your email.");
      setMagicLinkSent(true);
      setShowOptionalEmailPrompt(false);
    } catch (error) {
      console.error("Magic link error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to send magic link."
      );
    } finally {
      setIsSendingMagicLink(false);
    }
  }, [optionalEmail, sendMagicLink, storedAccessToken]);

  const unlocked = useMemo(() => {
    if (!entry) return false;
    return remoteUnlocked || isUnlocked(entry.id) || guestUnlocked;
  }, [entry, guestUnlocked, isUnlocked, remoteUnlocked]);

  const priceLabel = entry ? formatINR(entry.price) : "₹0";
  const canonicalUrl = useMemo(() => {
    if (!entry) return "";
    return buildQaCanonicalUrl(entry.questionNumber, entry.slug, SITE_URL);
  }, [entry]);
  const plainTitle = entry
    ? stripHtml(entry.title || entry.question || `Question ${entry.questionNumber}`)
    : "Essay Embassy Q&A";
  const questionText = entry ? stripHtml(entry.question || entry.title) : "";
  const answerText = entry ? stripHtml(entry.answer) : "";
  const hasAnswer = entry ? answerText.trim().length > 0 : false;
  const questionAttachments = entry?.questionAttachments ?? [];
  const answerAttachments = entry?.answerAttachments ?? [];
  const metaDescription = questionText.slice(0, 155) || plainTitle;
  const shouldShowAnswer = useMemo(() => {
    if (!entry) return false;
    if (isGooglebot()) return true;
    return unlocked;
  }, [entry, unlocked]);
  const qaJsonLd = useMemo(() => {
    if (!entry || !canonicalUrl) return null;
    const createdAtIso = new Date(entry.createdAt || Date.now()).toISOString();
    const questionName = questionText || plainTitle;

    const mainEntity: Record<string, unknown> = {
      "@type": "Question",
      name: questionName,
      text: questionName,
      answerCount: hasAnswer ? 1 : 0,
      upvoteCount: DEFAULT_UPVOTE_COUNT,
      dateCreated: createdAtIso,
      author: {
        "@type": "Organization",
        name: "Essay Embassy",
        url: "https://essayembassy.com",
      },
    };

    if (hasAnswer) {
      mainEntity.acceptedAnswer = {
        "@type": "Answer",
        text: answerText,
        dateCreated: createdAtIso,
        upvoteCount: DEFAULT_UPVOTE_COUNT,
        url: canonicalUrl,
        author: {
          "@type": "Organization",
          name: "Essay Embassy Expert Team",
          url: "https://essayembassy.com",
        },
      };
    }

    return {
      "@context": "https://schema.org",
      "@type": "QAPage",
      mainEntity,
    };
  }, [answerText, canonicalUrl, entry, hasAnswer, plainTitle, questionText]);
  const paywallJsonLd = useMemo(() => {
    if (!canonicalUrl || !hasAnswer) return null;
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      isAccessibleForFree: "False",
      url: canonicalUrl,
      hasPart: {
        "@type": "WebPageElement",
        isAccessibleForFree: "False",
        cssSelector: ".paywall-content",
      },
    };
  }, [canonicalUrl, hasAnswer]);
  const orderNowUrl = useMemo(() => {
    const topic = plainTitle.trim();
    return topic ? `/order-now?topic=${encodeURIComponent(topic)}` : "/order-now";
  }, [plainTitle]);

  useEffect(() => {
    if (!entry || !accessStorageKey) return;
    const storedToken = localStorage.getItem(accessStorageKey);
    if (storedToken) {
      ensureTokenAccess(storedToken);
    } else {
      setGuestUnlocked(false);
      setStoredAccessToken(null);
    }
  }, [accessStorageKey, ensureTokenAccess, entry]);

  useEffect(() => {
    if (!entry) return;
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("access");
    if (urlToken) {
      ensureTokenAccess(urlToken).then((valid) => {
        if (valid) {
          window.history.replaceState({}, "", window.location.pathname);
        }
      });
    }
  }, [entry, ensureTokenAccess]);

  useEffect(() => {
    setShowOptionalEmailPrompt(false);
    setOptionalEmail("");
    setMagicLinkSent(false);
  }, [entry?.id]);

  const renderAttachments = (
    attachments: NonNullable<QaEntry["questionAttachments"]>,
    prefix: "question" | "answer"
  ) => {
    if (!attachments.length) return null;
    return (
      <div className="mt-4 space-y-3">
        {attachments.map((attachment, index) =>
          attachment.type === "image" ? (
            <div
              key={`${prefix}-img-${index}`}
              className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
            >
              <img
                src={attachment.url}
                alt={attachment.name}
                loading="lazy"
                className="w-full h-auto object-contain bg-white"
              />
            </div>
          ) : (
            <a
              key={`${prefix}-pdf-${index}`}
              href={attachment.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-semibold hover:bg-primary-100 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11V7m0 4l-2-2m2 2l2-2m-2 6a4 4 0 010 8m0-8a4 4 0 010-8m0 8v8"
                />
              </svg>
              View PDF ({attachment.name})
            </a>
          )
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="rounded-lg border p-8 bg-card">
          <h1 className="text-xl font-semibold mb-2">Question not found</h1>
          <p className="text-sm text-muted-foreground mb-6">It may have been removed or is not published.</p>
          <Link to="/qa" className="px-4 py-2 rounded bg-primary text-primary-foreground">Back to catalog</Link>
        </div>
      </div>
    );
  }

  if (!entry) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Helmet>
        <title>{`${plainTitle} | Essay Embassy Q&A`}</title>
        <meta name="description" content={metaDescription} />
        <meta
          name="keywords"
          content={entry.subject || "essay help, expert answers, tutoring"}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${plainTitle} | Essay Embassy Q&A`} />
        <meta property="og:description" content={metaDescription} />
        {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${plainTitle} | Essay Embassy Q&A`} />
        <meta name="twitter:description" content={metaDescription} />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        {qaJsonLd ? (
          <script type="application/ld+json">{JSON.stringify(qaJsonLd)}</script>
        ) : null}
        {paywallJsonLd ? (
          <script type="application/ld+json">{JSON.stringify(paywallJsonLd)}</script>
        ) : null}
      </Helmet>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav
            aria-label="Breadcrumb"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
            className="text-sm text-gray-600 dark:text-gray-400"
          >
            <span
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="inline-flex items-center gap-2"
            >
              <Link itemProp="item" to="/">
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
              <span className="mx-2 text-gray-400">/</span>
            </span>
            <span
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="inline-flex items-center gap-2"
            >
              <Link itemProp="item" to="/qa">
                <span itemProp="name">Knowledge Base</span>
              </Link>
              <meta itemProp="position" content="2" />
              <span className="mx-2 text-gray-400">/</span>
            </span>
            <span
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400"
            >
              <span itemProp="name">{plainTitle}</span>
              <meta itemProp="position" content="3" />
            </span>
          </nav>
        </div>

      {/* Main layout with sidebar */}
        <div className="grid lg:grid-cols-[minmax(0,1fr)_380px] gap-8 items-start">
        {/* Content card */}
          <article
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            itemScope
            itemType="https://schema.org/QAPage"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Q</span>
                  </div>
                  <div>
                    <div className="text-sm text-primary-100">Question {entry.questionNumber}</div>
                    <div className="text-xs text-primary-200">{entry.subject || "General"}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{priceLabel}</div>
                  <div className="text-xs text-primary-200">one-time access</div>
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold leading-tight" dangerouslySetInnerHTML={{ __html: entry.title || entry.question }} />
          </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Question Section */}
              <section
                className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white" itemProp="name">
                    {plainTitle}
                  </h2>
                </div>
                <meta itemProp="answerCount" content="1" />
                <meta itemProp="upvoteCount" content={String(DEFAULT_UPVOTE_COUNT)} />
                <meta
                  itemProp="dateCreated"
                  content={new Date(entry.createdAt || Date.now()).toISOString()}
                />
                <div
                  className="prose prose-gray dark:prose-invert max-w-none"
                  itemProp="text"
                  dangerouslySetInnerHTML={{ __html: entry.question }}
                />
                {renderAttachments(questionAttachments, "question")}
            </section>

              {/* Answer Section */}
            {hasAnswer ? (
              shouldShowAnswer ? (
                <section
                  className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border-2 border-green-200 dark:border-green-800 p-6"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <div className="flex items-center mb-4">
                    <svg
                      className="w-6 h-6 text-green-600 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <h3 className="text-lg font-semibold text-green-900">
                      Expert Solution
                    </h3>
                    <span className="ml-auto text-sm text-green-600 font-medium">
                      {unlocked ? "✓ Unlocked" : "Previewing for Google"}
                    </span>
                  </div>

                  <meta itemProp="upvoteCount" content={String(DEFAULT_UPVOTE_COUNT)} />
                  <div
                    className={`prose prose-gray dark:prose-invert max-w-none paywall-content ${
                      unlocked ? "" : "seo-only"
                    }`}
                    itemProp="text"
                    dangerouslySetInnerHTML={{ __html: entry.answer }}
                  />
                  {renderAttachments(answerAttachments, "answer")}
                </section>
              ) : (
                <section className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-8 text-center shadow-lg paywall-content">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full mb-4">
                    <svg
                      className="w-8 h-8 text-teal-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Premium Answer
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Unlock the complete solution with detailed explanations and
                    step-by-step guidance.
                  </p>

                  <button
                    onClick={handleUnlock}
                    disabled={isProcessing}
                    className="inline-flex items-center justify-center px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                        Unlock for {priceLabel}
                      </>
                    )}
                  </button>

                  <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Instant access
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Secure payment
                    </div>
                  </div>
                </section>
              )
            ) : (
              <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl border border-blue-200 dark:border-blue-800 p-8 text-center shadow-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Need a custom answer to this exact question?
                </h3>
                <p className="text-gray-700 dark:text-gray-200 mb-6 max-w-2xl mx-auto">
                  This question hasn't been solved yet. Order a custom, plagiarism-free solution from our experts and get it in as little as 3 hours.
                </p>
                <Link
                  to={orderNowUrl}
                  className="inline-flex items-center justify-center px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white text-lg font-semibold rounded-lg transition-colors"
                >
                  Order Solution Now
                </Link>
              </section>
            )}

            {unlocked && showOptionalEmailPrompt ? (
              <div className="mt-6 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                      💡 Access from any device
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-200 mb-3">
                      Enter your email to receive a magic link. No login required—access this answer anywhere, anytime.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={optionalEmail}
                        onChange={(e) => setOptionalEmail(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg border border-blue-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      <button
                        onClick={handleSendMagicLink}
                        disabled={isSendingMagicLink}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60"
                      >
                        {isSendingMagicLink ? "Sending..." : "Send Link"}
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowOptionalEmailPrompt(false)}
                    className="text-gray-400 hover:text-gray-600"
                    aria-label="Dismiss email prompt"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ) : null}

            {unlocked && magicLinkSent && !showOptionalEmailPrompt ? (
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg text-sm text-green-800 dark:text-green-100">
                Magic link sent! Check your inbox for instant access from any device.
              </div>
            ) : null}

              {/* Question Details */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Paper Type</span>
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{entry.paperType || "General"}</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Price</span>
              </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {priceLabel}
                  </div>
              </div>
            </section>

              {/* What You'll Get Section */}
              <section className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">What You'll Get</h3>
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Step-by-step derivation and explanations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Clean formatting with professional presentation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Key takeaways and common pitfalls</span>
                  </div>
                </div>
            </section>

              {/* About Section */}
              <section className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">About This Question</h3>
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  <p className="mb-2">
                    Tagged under <span className="font-semibold text-primary-600 dark:text-primary-400">{entry.subject || "General"}</span> category.
                  </p>
                  <p>
                    Difficulty level: <span className="font-semibold text-orange-600 dark:text-orange-400">Intermediate</span> • 
                    Estimated solve time: <span className="font-semibold text-blue-600 dark:text-blue-400">15-30 minutes</span>
                  </p>
              </div>
            </section>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default PublicQaDetail;
