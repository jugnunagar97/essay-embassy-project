import React, { useEffect, useRef, useState } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
  height?: number;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  value, 
  onChange, 
  placeholder, 
  className = "", 
  height = 180 
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.innerHTML !== value) {
      el.innerHTML = value || "";
      setIsEmpty(!el.textContent || el.textContent.trim() === "");
    }
  }, [value]);

  const exec = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    const html = ref.current?.innerHTML || "";
    onChange(html);
    setIsEmpty(!ref.current?.textContent || ref.current?.textContent.trim() === "");
  };

  const insertHTMLAtCursor = (html: string) => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    range.deleteContents();
    const temp = document.createElement("div");
    temp.innerHTML = html;
    const frag = document.createDocumentFragment();
    let node: ChildNode | null;
    let lastNode: ChildNode | null = null;
    while ((node = temp.firstChild)) {
      lastNode = frag.appendChild(node);
    }
    range.insertNode(frag);
    if (lastNode) {
      const newRange = document.createRange();
      newRange.setStartAfter(lastNode);
      newRange.collapse(true);
      sel.removeAllRanges();
      sel.addRange(newRange);
    }
  };

  const renderLatex = (latex: string, displayMode = false) => {
    try {
      return katex.renderToString(latex, { throwOnError: false, displayMode });
    } catch {
      return latex; // fallback
    }
  };

  const insertFormula = (displayMode = false) => {
    const latex = prompt("Enter LaTeX (e.g., a^2 + b^2 = c^2)");
    if (!latex) return;
    const html = renderLatex(latex, displayMode);
    const wrapped = displayMode
      ? `<div class="my-2 overflow-x-auto">${html}</div>`
      : `<span>${html}</span>`;
    insertHTMLAtCursor(wrapped);
    const newHtml = ref.current?.innerHTML || "";
    onChange(newHtml);
    setIsEmpty(!ref.current?.textContent || ref.current?.textContent.trim() === "");
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const text = e.clipboardData.getData("text/plain");
    if (!text) return;

    // Detect LaTeX ($...$ or $$...$$). If none, let browser paste normally.
    const hasInline = /\$(.+?)\$/s.test(text);
    const hasBlock = /\$\$(.+?)\$\$/s.test(text);
    if (!hasInline && !hasBlock) return; // allow default paste

    e.preventDefault();

    // Convert text with LaTeX markers to HTML with KaTeX
    // Process block first, then inline
    let processed = text;

    processed = processed.replace(/\$\$([\s\S]+?)\$\$/g, (_m, p1) => {
      const html = renderLatex(p1.trim(), true);
      return `<div class="my-2 overflow-x-auto">${html}</div>`;
    });

    processed = processed.replace(/\$([^$\n]+?)\$/g, (_m, p1) => {
      const html = renderLatex(p1.trim(), false);
      return `<span>${html}</span>`;
    });

    // Preserve newlines into paragraphs
    const htmlToInsert = processed
      .split(/\n{2,}/)
      .map(p => `<p>${p.replace(/\n/g, "<br/>")}</p>`) // single newline -> <br>
      .join("");

    insertHTMLAtCursor(htmlToInsert);
    const newHtml = ref.current?.innerHTML || "";
    onChange(newHtml);
    setIsEmpty(!ref.current?.textContent || ref.current?.textContent.trim() === "");
  };

  const onInput = () => {
    onChange(ref.current?.innerHTML || "");
    setIsEmpty(!ref.current?.textContent || ref.current?.textContent.trim() === "");
  };

  return (
    <div className={"border rounded bg-card " + className}>
      <div className="flex flex-wrap gap-2 border-b p-2 text-sm">
        <button type="button" onClick={() => exec("bold")} className="px-2 py-1 rounded hover:bg-accent">B</button>
        <button type="button" onClick={() => exec("italic")} className="px-2 py-1 rounded hover:bg-accent italic">I</button>
        <button type="button" onClick={() => exec("underline")} className="px-2 py-1 rounded hover:bg-accent underline">U</button>
        <button type="button" onClick={() => exec("insertOrderedList")} className="px-2 py-1 rounded hover:bg-accent">OL</button>
        <button type="button" onClick={() => exec("insertUnorderedList")} className="px-2 py-1 rounded hover:bg-accent">UL</button>
        <button type="button" onClick={() => exec("formatBlock", "<blockquote>")} className="px-2 py-1 rounded hover:bg-accent">❝</button>
        <button type="button" onClick={() => exec("formatBlock", "<pre>")} className="px-2 py-1 rounded hover:bg-accent">Code</button>
        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter link URL");
            if (url) exec("createLink", url);
          }}
          className="px-2 py-1 rounded hover:bg-accent"
        >
          Link
        </button>
        <div className="mx-2 h-5 w-px bg-border" />
        <button type="button" onClick={() => insertFormula(false)} className="px-2 py-1 rounded hover:bg-accent">Inline Math</button>
        <button type="button" onClick={() => insertFormula(true)} className="px-2 py-1 rounded hover:bg-accent">Block Math</button>
      </div>
      <div className="relative">
        {!value && isEmpty && (
          <div className="pointer-events-none absolute inset-0 p-3 text-sm text-muted-foreground">
            {placeholder}
          </div>
        )}
        <div
          ref={ref}
          onPaste={handlePaste}
          onInput={onInput}
          contentEditable
          className="p-3 min-h-32 outline-none"
          style={{ minHeight: height }}
          suppressContentEditableWarning
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
