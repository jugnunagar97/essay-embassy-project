import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import EnhancedRichTextEditor from "../common/EnhancedRichTextEditor";
import LoadingSpinner from "../common/LoadingSpinner";
import { QaEntry, QaAttachment, getQaById, slugify, updateQa, upsertQa } from "../../lib/qaStore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";

const SUBJECTS = [
  "History",
  "Math",
  "Science",
  "English",
  "Economics",
  "Business",
  "Computer Science",
  "Other",
];
const PAPER_TYPES = ["Essay", "Research Paper", "Case Study", "Lab Report", "Assignment", "Other"];

const isRichTextEmpty = (html: string) =>
  html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;|&#160;/g, " ")
    .trim().length === 0;

type Props = {
  id?: string;
  redirectPath?: string | null;
  onSuccess?: () => void;
  onCancel?: () => void;
  createDefaults?: Partial<QaEntry>;
  updateOverrides?: Partial<QaEntry>;
};

const QaForm: React.FC<Props> = ({
  id,
  redirectPath = '/admin/qa',
  onSuccess,
  onCancel,
  createDefaults,
  updateOverrides,
}) => {
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const draftIdRef = useRef(id || `draft-${Date.now()}`);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [uploading, setUploading] = useState<{ question: boolean; answer: boolean }>({
    question: false,
    answer: false,
  });

  const [form, setForm] = useState({
    title: "",
    question: "",
    answer: "",
    subject: "",
    paperType: "",
    price: "",
    status: "draft" as QaEntry["status"],
  });
  const [questionAttachments, setQuestionAttachments] = useState<QaAttachment[]>([]);
  const [answerAttachments, setAnswerAttachments] = useState<QaAttachment[]>([]);

useEffect(() => {
  let isMounted = true;
  if (!id) {
    setInitialLoading(false);
    return;
  }
  (async () => {
    try {
      const entry = await getQaById(id);
      if (!isMounted) return;
      if (entry) {
        setForm({
          title: entry.title,
          question: entry.question,
          answer: entry.answer,
          subject: entry.subject,
          paperType: entry.paperType,
          price: String(entry.price ?? ""),
          status: entry.status,
        });
        setQuestionAttachments(entry.questionAttachments || []);
        setAnswerAttachments(entry.answerAttachments || []);
      } else {
        setError("Q&A entry not found.");
      }
    } catch (err) {
      console.error(err);
      if (isMounted) setError("Failed to load Q&A entry.");
    } finally {
      if (isMounted) setInitialLoading(false);
    }
  })();
  return () => {
    isMounted = false;
  };
}, [id]);

  useEffect(() => {
    if (id) {
      draftIdRef.current = id;
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setError(null);
    setSuccess(null);
  };

  const handleAttachmentUpload = async (
    section: "question" | "answer",
    fileList: FileList | File[]
  ) => {
    const files = Array.from(fileList).filter(
      (file) => file.type.startsWith("image/") || file.type === "application/pdf"
    );
    if (!files.length) {
      setError("Only image or PDF files are supported.");
      return;
    }
    setUploading((prev) => ({ ...prev, [section]: true }));
    setError(null);
    try {
      const targetId = id || draftIdRef.current || `draft-${Date.now()}`;
      draftIdRef.current = targetId;
      const uploaded = await Promise.all(
        files.map(async (file) => {
          const storagePath = `qa_attachments/${targetId}/${Date.now()}-${file.name}`;
          const storageRef = ref(storage, storagePath);
          await uploadBytes(storageRef, file);
          const url = await getDownloadURL(storageRef);
          const type: QaAttachment["type"] = file.type.startsWith("image/") ? "image" : "pdf";
          return { name: file.name, url, type };
        })
      );
      if (section === "question") {
        setQuestionAttachments((prev) => [...prev, ...uploaded]);
      } else {
        setAnswerAttachments((prev) => [...prev, ...uploaded]);
      }
    } catch (uploadErr) {
      console.error(uploadErr);
      setError("Failed to upload attachment(s). Please try again.");
    } finally {
      setUploading((prev) => ({ ...prev, [section]: false }));
    }
  };

  const handleAttachmentRemove = (section: "question" | "answer", index: number) => {
    if (section === "question") {
      setQuestionAttachments((prev) => prev.filter((_, idx) => idx !== index));
    } else {
      setAnswerAttachments((prev) => prev.filter((_, idx) => idx !== index));
    }
  };

  const renderAttachmentSection = (section: "question" | "answer") => {
    const attachments = section === "question" ? questionAttachments : answerAttachments;
    const isUploading = uploading[section];

    return (
      <div className="space-y-3">
        <label className="block mb-1 font-semibold">
          {section === "question" ? "Question Attachments" : "Answer Attachments"}
        </label>
        <input
          type="file"
          accept="image/*,application/pdf"
          multiple
          onChange={(e) => {
            if (e.target.files) {
              handleAttachmentUpload(section, e.target.files);
              e.target.value = "";
            }
          }}
          className="w-full border rounded px-3 py-2"
        />
        {isUploading && <p className="text-sm text-gray-500">Uploading files...</p>}
        {attachments.length > 0 && (
          <ul className="space-y-2">
            {attachments.map((attachment, idx) => (
              <li
                key={`${attachment.url}-${idx}`}
                className="flex items-center justify-between bg-gray-50 rounded px-3 py-2 text-sm"
              >
                <span className="truncate pr-3">
                  {attachment.name} ({attachment.type.toUpperCase()})
                </span>
                <button
                  type="button"
                  className="text-red-600 text-xs font-semibold"
                  onClick={() => handleAttachmentRemove(section, idx)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  const handleRTChange = (name: string, html: string) => {
    setForm((f) => ({ ...f, [name]: html }));
    setError(null);
    setSuccess(null);
  };

  const validate = () => {
    if (
      isRichTextEmpty(form.title) ||
      isRichTextEmpty(form.question) ||
      !form.subject ||
      !form.paperType ||
      String(form.price).trim() === ""
    ) {
      setError("All fields are required.");
      return false;
    }
    if (isNaN(Number(form.price)) || Number(form.price) < 0) {
      setError("Price must be a valid non-negative number.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!validate()) return;
    setLoading(true);
    const publishingOnDemand = isRichTextEmpty(form.answer);
    if (publishingOnDemand) {
      console.info("Publishing as On-Demand Question (No Answer)");
    }
    try {
      const basePayload = {
        ...form,
        price: Number(form.price),
        slug: slugify(form.title),
        questionAttachments,
        answerAttachments,
      };
      let savedEntry: QaEntry;
      if (isEdit && id) {
        const overrides = updateOverrides || {};
        savedEntry = await updateQa(id, {
          ...basePayload,
          ...overrides,
        });
        setSuccess(
          publishingOnDemand
            ? "On-demand question saved (answer pending)."
            : "Q&A entry updated successfully."
        );
      } else {
        savedEntry = await upsertQa({
          ...basePayload,
          ...(createDefaults || {}),
        });
        setSuccess(
          publishingOnDemand
            ? "On-demand question created successfully."
            : "Q&A entry created successfully."
        );
        setForm({ title: "", question: "", answer: "", subject: "", paperType: "", price: "", status: "draft" });
        setQuestionAttachments([]);
        setAnswerAttachments([]);
      }
      draftIdRef.current = savedEntry.id;
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else if (redirectPath) {
          navigate(redirectPath);
        }
      }, 800);
    } catch (err) {
      setError("Failed to save Q&A entry.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-2 font-semibold">Question Title</label>
        <EnhancedRichTextEditor value={form.title} onChange={(v) => handleRTChange("title", v)} placeholder="Enter question title" />
      </div>

      <div>
        <label className="block mb-2 font-semibold">Question Text</label>
        <EnhancedRichTextEditor value={form.question} onChange={(v) => handleRTChange("question", v)} placeholder="Enter full question text" height={220} />
      </div>
      {renderAttachmentSection("question")}

      <div>
        <label className="block mb-2 font-semibold">Answer</label>
        <EnhancedRichTextEditor value={form.answer} onChange={(v) => handleRTChange("answer", v)} placeholder="Enter answer (rich text supported)" height={220} />
      </div>
      {renderAttachmentSection("answer")}

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block mb-2 font-semibold">Subject</label>
          <select name="subject" value={form.subject} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
            <option value="" disabled>
              Select subject
            </option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block mb-2 font-semibold">Paper Type</label>
          <select name="paperType" value={form.paperType} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
            <option value="" disabled>
              Select paper type
            </option>
            {PAPER_TYPES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block mb-2 font-semibold">Price (USD)</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          placeholder="Enter price in USD"
          min={0}
          step={0.01}
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">Status</label>
        <select name="status" value={form.status} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {error && <div className="text-red-600">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}

      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded font-semibold">
          {loading ? (isEdit ? "Saving..." : "Publishing...") : isEdit ? "Save Changes" : "Publish"}
        </button>
        <button
          type="button"
          disabled={loading}
          className="bg-gray-400 text-white px-6 py-2 rounded font-semibold"
          onClick={() => {
            if (onCancel) {
              onCancel();
            } else if (redirectPath) {
              navigate(redirectPath);
            }
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default QaForm;
