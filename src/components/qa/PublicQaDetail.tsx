import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { Helmet } from "react-helmet-async";

import { getQaByQuestionNumber, listQa, type QaEntry } from "../../lib/qaStore";
import LoadingSpinner from "../Common/LoadingSpinner";
import { useAuth } from "../../context/AuthContext";
import { auth, db } from "../../firebase";
import { buildQaCanonicalUrl, isGooglebot, stripHtml } from "../../utils/seo";

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
  const navigate = useNavigate();

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

  const apiBase =
    (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(
      /\/$/,
      ""
    ) || "";
  const createOrderUrl = `${apiBase}/api/create-order`;
  const verifyPaymentUrl = `${apiBase}/api/verify-payment`;

  const verifyAndUnlock = useCallback(
    async (paymentResponse: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    }) => {
      if (!entry || !user) return;
      try {
        const token = await auth.currentUser?.getIdToken();
        if (!token) {
          throw new Error("Unable to verify payment. Please login again.");
        }

        const response = await fetch(verifyPaymentUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            razorpay_order_id: paymentResponse.razorpay_order_id,
            razorpay_payment_id: paymentResponse.razorpay_payment_id,
            razorpay_signature: paymentResponse.razorpay_signature,
            type: "qa_unlock",
          }),
        });

        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.error || "Payment verification failed.");
        }

        await addDoc(collection(db, "qaUnlocks"), {
          userId: user.uid || user.id,
          questionNumber: entry.questionNumber,
          questionId: entry.id,
          questionTitle: entry.title,
          questionSlug: entry.slug,
          amount: entry.price,
          currency: "INR",
          status: "completed",
          razorpayOrderId: paymentResponse.razorpay_order_id,
          razorpayPaymentId: paymentResponse.razorpay_payment_id,
          razorpaySignature: paymentResponse.razorpay_signature,
          purchasedAt: serverTimestamp(),
        });

        unlock(entry.id);
        setRemoteUnlocked(true);
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
    [entry, unlock, user, verifyPaymentUrl]
  );

  const handleUnlock = useCallback(async () => {
    if (!entry) {
      toast.error("Question details missing. Please refresh and try again.");
      return;
    }
    if (!user) {
      toast.error("Please login to unlock this answer");
      const redirectPath =
        typeof window !== "undefined"
          ? `${window.location.pathname}${window.location.search}`
          : "/qa";
      navigate(`/login?redirect=${encodeURIComponent(redirectPath)}`);
      return;
    }
    if (!razorpayReady || !window.Razorpay) {
      toast.error("Payment gateway not ready. Please try again.");
      return;
    }

    setIsProcessing(true);

    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        throw new Error("Unable to authenticate payment request.");
      }

      const amountInPaise = Math.round(entry.price * 100);
      const response = await fetch(createOrderUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: "INR",
          type: "qa_unlock",
          metadata: {
            questionNumber: entry.questionNumber,
            questionId: entry.id,
            questionTitle: entry.title,
            questionSlug: entry.slug,
            userId: user.uid || user.id,
          },
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create order. Please retry.");
      }

      const { orderId, amount } = data;
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency: "INR",
        name: "Essay Embassy",
        description: `Unlock Q&A: ${entry.title?.replace(/<[^>]+>/g, "") || ""}`,
        order_id: orderId,
        handler: verifyAndUnlock,
        prefill: {
          name: user.name || "",
          email: user.email || "",
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
    navigate,
    razorpayReady,
    user,
    verifyAndUnlock,
  ]);

  const unlocked = useMemo(() => {
    if (!entry) return false;
    return remoteUnlocked || isUnlocked(entry.id);
  }, [entry, isUnlocked, remoteUnlocked]);

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
  const metaDescription = questionText.slice(0, 155) || plainTitle;
  const shouldShowAnswer = useMemo(() => {
    if (!entry) return false;
    if (isGooglebot()) return true;
    return unlocked;
  }, [entry, unlocked]);
  const qaJsonLd = useMemo(() => {
    if (!entry || !canonicalUrl) return null;
    const createdAtIso = new Date(entry.createdAt || Date.now()).toISOString();
    return {
      "@context": "https://schema.org",
      "@type": "QAPage",
      mainEntity: {
        "@type": "Question",
        name: plainTitle,
        text: questionText || plainTitle,
        answerCount: 1,
        upvoteCount: DEFAULT_UPVOTE_COUNT,
        dateCreated: createdAtIso,
        author: {
          "@type": "Person",
          name: "Essay Embassy Expert",
        },
        acceptedAnswer: {
          "@type": "Answer",
          text: answerText,
          dateCreated: createdAtIso,
          upvoteCount: DEFAULT_UPVOTE_COUNT,
          url: canonicalUrl,
          author: {
            "@type": "Person",
            name: "Essay Embassy Expert",
          },
        },
      },
    };
  }, [answerText, canonicalUrl, entry, plainTitle, questionText]);
  const paywallJsonLd = useMemo(() => {
    if (!canonicalUrl) return null;
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
  }, [canonicalUrl]);

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
            </section>

              {/* Answer Section */}
            {shouldShowAnswer ? (
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
            )}

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
