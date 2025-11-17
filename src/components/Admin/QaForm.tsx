import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EnhancedRichTextEditor from "../common/EnhancedRichTextEditor";
import LoadingSpinner from "../common/LoadingSpinner";
import { QaEntry, getQaById, slugify, updateQa, upsertQa } from "../../lib/qaStore";

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
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    question: "",
    answer: "",
    subject: "",
    paperType: "",
    price: "",
    status: "draft" as QaEntry["status"],
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setError(null);
    setSuccess(null);
  };
  const handleRTChange = (name: string, html: string) => {
    setForm((f) => ({ ...f, [name]: html }));
    setError(null);
    setSuccess(null);
  };

  const validate = () => {
    const isRichTextEmpty = (html: string) =>
      html
        .replace(/<[^>]*>/g, "") // strip tags
        .replace(/&nbsp;|&#160;/g, " ") // normalize spaces
        .trim().length === 0;

    if (
      isRichTextEmpty(form.title) ||
      isRichTextEmpty(form.question) ||
      isRichTextEmpty(form.answer) ||
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
    try {
      const basePayload = {
        ...form,
        price: Number(form.price),
        slug: slugify(form.title),
      };
      if (isEdit && id) {
        const overrides = updateOverrides || {};
        await updateQa(id, {
          ...basePayload,
          ...overrides,
        });
        setSuccess("Q&A entry updated successfully.");
      } else {
        await upsertQa({
          ...basePayload,
          ...(createDefaults || {}),
        });
        setSuccess("Q&A entry created successfully.");
        setForm({ title: "", question: "", answer: "", subject: "", paperType: "", price: "", status: "draft" });
      }
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

      <div>
        <label className="block mb-2 font-semibold">Answer</label>
        <EnhancedRichTextEditor value={form.answer} onChange={(v) => handleRTChange("answer", v)} placeholder="Enter answer (rich text supported)" height={220} />
      </div>

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
