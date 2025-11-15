import React, { useEffect, useRef, useState } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface EnhancedRichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
  height?: number;
}

const EnhancedRichTextEditor: React.FC<EnhancedRichTextEditorProps> = ({ 
  value, 
  onChange, 
  placeholder, 
  className = "", 
  height = 180 
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [showMathModal, setShowMathModal] = useState(false);
  const [mathInput, setMathInput] = useState("");
  const [isInline, setIsInline] = useState(true);

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
      return katex.renderToString(latex, { 
        throwOnError: false, 
        displayMode,
        strict: false,
        trust: true
      });
    } catch (error) {
      console.error("LaTeX rendering error:", error);
      return `<span class="latex-error" style="color: red; background: #ffe6e6; padding: 2px 4px; border-radius: 3px;">LaTeX Error: ${latex}</span>`;
    }
  };

  const insertFormula = (displayMode = false) => {
    setMathInput("");
    setIsInline(!displayMode);
    setShowMathModal(true);
  };

  const handleMathSubmit = () => {
    if (!mathInput.trim()) return;
    
    const html = renderLatex(mathInput.trim(), !isInline);
    const wrapped = !isInline
      ? `<div class="math-block" style="margin: 16px 0; text-align: center; overflow-x: auto;">${html}</div>`
      : `<span class="math-inline" style="display: inline-block;">${html}</span>`;
    
    insertHTMLAtCursor(wrapped);
    const newHtml = ref.current?.innerHTML || "";
    onChange(newHtml);
    setIsEmpty(!ref.current?.textContent || ref.current?.textContent.trim() === "");
    setShowMathModal(false);
    setMathInput("");
  };

  // ✅ FIXED: Improved paste handler
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const html = e.clipboardData.getData('text/html');
    const text = e.clipboardData.getData('text/plain');
    
    // Check if pasted content contains math equations
    if (html && (html.includes('katex') || html.includes('math-tex') || html.includes('mml:'))) {
      // Extract and clean math content
      const processedHTML = cleanMathHTML(html);
      insertHTMLAtCursor(processedHTML);
    } else if (html) {
      // Process regular HTML content
      const processedHTML = processPastedHTML(html);
      insertHTMLAtCursor(processedHTML);
    } else if (text) {
      // Process plain text for LaTeX
      const processedText = processPastedText(text);
      insertHTMLAtCursor(processedText);
    }
    
    const newHtml = ref.current?.innerHTML || "";
    onChange(newHtml);
    setIsEmpty(!ref.current?.textContent || ref.current?.textContent.trim() === "");
  };

  // ✅ NEW: Clean math HTML from other editors
  const cleanMathHTML = (html: string): string => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    
    // Find all math-related elements
    const mathElements = temp.querySelectorAll('.katex, .katex-display, .katex-html, [class*="math"], [class*="katex"]');
    
    if (mathElements.length === 0) {
      // No math found, process as regular HTML
      return processPastedHTML(html);
    }
    
    // Extract text content and try to find LaTeX source
    let result = '';
    
    mathElements.forEach(el => {
      // Try to find annotation elements (MathML annotations often contain LaTeX)
      const annotation = el.querySelector('annotation[encoding="application/x-tex"]');
      if (annotation && annotation.textContent) {
        const latex = annotation.textContent.trim();
        const isBlock = el.classList.contains('katex-display') || el.closest('.katex-display');
        const rendered = renderLatex(latex, !!isBlock);
        const wrapped = isBlock
          ? `<div class="math-block" style="margin: 16px 0; text-align: center; overflow-x: auto;">${rendered}</div>`
          : `<span class="math-inline" style="display: inline-block;">${rendered}</span>`;
        result += wrapped;
        return;
      }
      
      // If no annotation found, extract just the text content (fallback)
      const textContent = el.textContent || '';
      if (textContent.trim()) {
        result += `<p>${textContent}</p>`;
      }
    });
    
    return result || processPastedHTML(html);
  };

  // ✅ IMPROVED: Simplified HTML processor
  const processPastedHTML = (html: string): string => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    
    // Remove scripts and styles
    temp.querySelectorAll('script, style').forEach(el => el.remove());
    
    // Clean up elements but preserve basic formatting
    const allowedTags = ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'a', 'table', 'tr', 'td', 'th'];
    
    const cleanElement = (el: Element) => {
      // Remove all attributes except href for links
      if (el.tagName.toLowerCase() === 'a') {
        const href = el.getAttribute('href');
        Array.from(el.attributes).forEach(attr => el.removeAttribute(attr.name));
        if (href) el.setAttribute('href', href);
      } else {
        Array.from(el.attributes).forEach(attr => el.removeAttribute(attr.name));
      }
      
      // Process children
      Array.from(el.children).forEach(child => {
        if (!allowedTags.includes(child.tagName.toLowerCase())) {
          // Replace disallowed tag with its content
          const span = document.createElement('span');
          span.innerHTML = child.innerHTML;
          child.replaceWith(span);
        } else {
          cleanElement(child);
        }
      });
    };
    
    cleanElement(temp);
    
    return temp.innerHTML;
  };

  // ✅ UNCHANGED: Text processor
  const processPastedText = (text: string): string => {
    // Check for LaTeX patterns
    const hasInline = /\$(.+?)\$/s.test(text);
    const hasBlock = /\$\$(.+?)\$\$/s.test(text);
    
    if (!hasInline && !hasBlock) {
      // Convert plain text to HTML with line breaks
      return text
        .split('\n')
        .map(line => line.trim() ? `<p>${line}</p>` : '<p><br></p>')
        .join('');
    }
    
    let processed = text;
    
    // Process block math first
    processed = processed.replace(/\$\$([\s\S]+?)\$\$/g, (_match, p1) => {
      const html = renderLatex(p1.trim(), true);
      return `<div class="math-block" style="margin: 16px 0; text-align: center; overflow-x: auto;">${html}</div>`;
    });
    
    // Process inline math
    processed = processed.replace(/\$([^$\n]+?)\$/g, (_match, p1) => {
      const html = renderLatex(p1.trim(), false);
      return `<span class="math-inline" style="display: inline-block;">${html}</span>`;
    });
    
    // Convert remaining text to HTML
    return processed
      .split(/\n{2,}/)
      .map(p => `<p>${p.replace(/\n/g, "<br/>")}</p>`)
      .join("");
  };

  const onInput = () => {
    onChange(ref.current?.innerHTML || "");
    setIsEmpty(!ref.current?.textContent || ref.current?.textContent.trim() === "");
  };

  const insertLink = () => {
    const url = prompt("Enter link URL:");
    if (url) {
      exec("createLink", url);
    }
  };

  const insertTable = () => {
    const tableHTML = `
      <table style="border-collapse: collapse; width: 100%; margin: 16px 0;">
        <tr>
          <td style="border: 1px solid #ccc; padding: 8px;">Cell 1</td>
          <td style="border: 1px solid #ccc; padding: 8px;">Cell 2</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 8px;">Cell 3</td>
          <td style="border: 1px solid #ccc; padding: 8px;">Cell 4</td>
        </tr>
      </table>
    `;
    insertHTMLAtCursor(tableHTML);
    const newHtml = ref.current?.innerHTML || "";
    onChange(newHtml);
    setIsEmpty(!ref.current?.textContent || ref.current?.textContent.trim() === "");
  };

  return (
    <div className={`border rounded-lg bg-card ${className}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 border-b p-2 text-sm bg-gray-50 dark:bg-gray-800">
        {/* Text Formatting */}
        <button 
          type="button" 
          onClick={() => exec("bold")} 
          className="px-2 py-1 rounded hover:bg-accent font-bold"
          title="Bold"
        >
          B
        </button>
        <button 
          type="button" 
          onClick={() => exec("italic")} 
          className="px-2 py-1 rounded hover:bg-accent italic"
          title="Italic"
        >
          I
        </button>
        <button 
          type="button" 
          onClick={() => exec("underline")} 
          className="px-2 py-1 rounded hover:bg-accent underline"
          title="Underline"
        >
          U
        </button>
        
        <div className="w-px h-6 bg-border mx-1" />
        
        {/* Lists */}
        <button 
          type="button" 
          onClick={() => exec("insertOrderedList")} 
          className="px-2 py-1 rounded hover:bg-accent"
          title="Numbered List"
        >
          1.
        </button>
        <button 
          type="button" 
          onClick={() => exec("insertUnorderedList")} 
          className="px-2 py-1 rounded hover:bg-accent"
          title="Bullet List"
        >
          •
        </button>
        
        <div className="w-px h-6 bg-border mx-1" />
        
        {/* Blocks */}
        <button 
          type="button" 
          onClick={() => exec("formatBlock", "<blockquote>")} 
          className="px-2 py-1 rounded hover:bg-accent"
          title="Quote"
        >
          ❝
        </button>
        <button 
          type="button" 
          onClick={() => exec("formatBlock", "<pre>")} 
          className="px-2 py-1 rounded hover:bg-accent"
          title="Code Block"
        >
          &lt;/&gt;
        </button>
        
        <div className="w-px h-6 bg-border mx-1" />
        
        {/* Links and Tables */}
        <button 
          type="button" 
          onClick={insertLink} 
          className="px-2 py-1 rounded hover:bg-accent"
          title="Insert Link"
        >
          🔗
        </button>
        <button 
          type="button" 
          onClick={insertTable} 
          className="px-2 py-1 rounded hover:bg-accent"
          title="Insert Table"
        >
          ⊞
        </button>
        
        <div className="w-px h-6 bg-border mx-1" />
        
        {/* Math */}
        <button 
          type="button" 
          onClick={() => insertFormula(false)} 
          className="px-2 py-1 rounded hover:bg-accent bg-blue-50 text-blue-600 dark:bg-blue-900/20"
          title="Inline Math (Type LaTeX manually or use this button)"
        >
          ∑
        </button>
        <button 
          type="button" 
          onClick={() => insertFormula(true)} 
          className="px-2 py-1 rounded hover:bg-accent bg-blue-50 text-blue-600 dark:bg-blue-900/20"
          title="Block Math (Type LaTeX manually or use this button)"
        >
          ∫
        </button>
      </div>

      {/* Editor */}
      <div className="relative">
        {!value && isEmpty && (
          <div className="pointer-events-none absolute inset-0 p-3 text-sm text-muted-foreground">
            {placeholder || "Type here... Use ∑ or ∫ buttons to add math equations"}
          </div>
        )}
        <div
          ref={ref}
          onPaste={handlePaste}
          onInput={onInput}
          contentEditable
          className="p-3 min-h-32 outline-none focus:ring-2 focus:ring-primary/20 rounded-b-lg overflow-auto"
          style={{ minHeight: height }}
          suppressContentEditableWarning
        />
      </div>

      {/* Math Modal */}
      {showMathModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 max-w-[90vw]">
            <h3 className="text-lg font-semibold mb-4">
              Insert {isInline ? 'Inline' : 'Block'} Math
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  LaTeX Expression:
                </label>
                <textarea
                  value={mathInput}
                  onChange={(e) => setMathInput(e.target.value)}
                  className="w-full p-2 border rounded-md font-mono text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="e.g., \int_{0}^{2} (x^2 + 1) dx"
                  rows={3}
                  autoFocus
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Example: <code>\frac{"{a}{b}"}</code> or <code>x^2 + y^2 = z^2</code>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleMathSubmit}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 bg-blue-600 text-white"
                >
                  Insert
                </button>
                <button
                  onClick={() => setShowMathModal(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:opacity-90"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedRichTextEditor;
