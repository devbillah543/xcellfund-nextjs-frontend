import React from "react";
import "@/components/rich-text-content/style.css";
import "@/components/rich-text-content/cms-utilities.generated.css";
import { CMS_RICHTEXT_CLASSES } from "@/components/rich-text-content/cms-safelist";

interface RichtextContentProps {
  content?: string;
  loading?: boolean;
}

/** Keep API class strings in this module for Tailwind detection (not on the DOM node). */
const CMS_TW_CLASSES = CMS_RICHTEXT_CLASSES;

/** Full-bleed CMS wrappers — do not treat as side-column image widths. */
const FULL_BLEED_WIDTHS = new Set(["1092", "1140"]);

function enhanceClassValue(classValue: string): string {
  const parts = classValue.split(/\s+/).filter(Boolean);
  const set = new Set(parts);

  if (set.has("grid") && set.has("lg:grid-cols-3")) {
    set.add("cms-grid-cols-3");
    set.delete("grid-cols-1");
  }
  if (set.has("grid") && set.has("lg:grid-cols-2")) {
    set.add("cms-grid-cols-2");
    set.delete("grid-cols-1");
  }
  if (set.has("flex") && set.has("md:flex-row")) {
    set.add("cms-md-flex-row");
  }
  if (set.has("md:w-[1140px]") || set.has("md:w-[1092px]")) {
    set.delete("md:px-6");
    set.delete("md:px-4");
    set.delete("md:px-2.5");
    set.delete("md:px-1");
    set.delete("md:px-0");
  }
  if (set.has("md:w-1/2")) {
    set.add("cms-md-w-1-2");
  }
  // CMS typo on partnership-vs-investment: class="full" means w-full
  if (set.has("full")) {
    set.add("cms-w-full");
  }
  if (set.has("flex-1")) {
    set.add("cms-flex-1");
  }
  if (set.has("md:gap-32")) {
    set.add("cms-md-gap-32");
  } else if (set.has("md:gap-16")) {
    set.add("cms-md-gap-16");
  } else if (set.has("md:gap-10")) {
    set.add("cms-md-gap-10");
  } else if (set.has("gap-4") && set.has("md:flex-row")) {
    set.add("cms-md-gap-16");
  }

  for (const cls of parts) {
    const w = cls.match(/^md:w-\[(\d+)px\]$/);
    if (w && !FULL_BLEED_WIDTHS.has(w[1])) {
      set.add(`cms-md-w-${w[1]}`);
    }
    const h = cls.match(/^md:h-\[(\d+)px\]$/);
    if (h) {
      set.add(`cms-md-h-${h[1]}`);
    }
  }

  return [...set].join(" ");
}

/** Grid cards (e.g. web-properties) must fill tracks — drop fixed md:w-[Npx]. */
function stripFixedWidthsInsideGrids(html: string): string {
  return html.replace(
    /(<div\b[^>]*\bclass="[^"]*\bcms-grid-cols-[23]\b[^"]*"[^>]*>)([\s\S]*?)(<\/div>)/g,
    (_full, open: string, inner: string, close: string) => {
      const cleaned = inner.replace(/\sclass="([^"]*)"/g, (_m, cls: string) => {
        const next = cls
          .split(/\s+/)
          .filter(
            (c) => !/^md:w-\[\d+px\]$/.test(c) && !/^cms-md-w-\d+$/.test(c),
          )
          .join(" ");
        return ` class="${next}"`;
      });
      return `${open}${cleaned}${close}`;
    },
  );
}

/**
 * Add stable helper classes so CMS Tailwind layouts render reliably
 * (escaped md:/lg: utilities often fail in plain CSS).
 */
function enhanceCmsHtml(html: string): string {
  const withHelpers = html.replace(/\sclass="([^"]*)"/g, (_full, classValue: string) => {
    return ` class="${enhanceClassValue(classValue)}"`;
  });
  return stripFixedWidthsInsideGrids(withHelpers);
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
    <>
      {/* Pass CMS API Tailwind classes for detection — not on the content root */}
      <span className={`hidden ${CMS_TW_CLASSES}`} aria-hidden="true" />
      <div
        className="page-content content max-w-none"
        dangerouslySetInnerHTML={{ __html: enhanceCmsHtml(content) }}
      />
    </>
  );
}
