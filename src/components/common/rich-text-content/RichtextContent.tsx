"use client";
import React from "react";
import "./style.css";

interface RichtextContentProps {
  content?: string;
  loading?: boolean;
}

export default function RichtextContent({
  content,
  loading,
}: RichtextContentProps) {
  if (loading || !content) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-2/3" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-4/6" />
        <div className="h-4 bg-gray-200 rounded w-3/6" />
      </div>
    );
  }

  return (
    <div
      className="page-content prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
