"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none"
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
