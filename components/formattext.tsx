import React from "react";
import ReactMarkdown from "react-markdown";

interface FormattedTextProps {
  text: string;
}

export const FormattedText: React.FC<FormattedTextProps> = ({ text }) => {
  return (
    <div className="text-sm leading-relaxed">
      <ReactMarkdown
        components={{
          // Links: clickable and open in new tab
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-2 transition-colors"
            >
              {children}
            </a>
          ),

          // Paragraphs: preserve whitespace/newlines
          p: ({ children }) => (
            <p className="mb-2 last:mb-0 whitespace-pre-wrap">{children}</p>
          ),

          // Bold & Italic
          strong: ({ children }) => (
            <strong className="font-bold">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic opacity-75">{children}</em>
          ),

          // Lists
          ul: ({ children }) => (
            <ul className="list-disc list-outside ml-4 my-2 space-y-1">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside ml-4 my-2 space-y-1">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <ul className="mb-2 last:mb-0 whitespace-pre-wrap">{children}</ul>
          ),

          // Code Blocks (pre)
          pre: ({ children }) => (
            <div className="my-2 overflow-hidden rounded-lg bg-slate-950 border border-slate-800">
              <pre className="overflow-x-auto p-3 text-slate-50 font-mono text-xs">
                {children}
              </pre>
            </div>
          ),

          // Inline Code
          code({ className, children, ...props }) {
            const isBlock = className?.includes("language-");
            if (isBlock) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }

            return (
              <code
                className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded font-mono text-xs mx-0.5"
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};
