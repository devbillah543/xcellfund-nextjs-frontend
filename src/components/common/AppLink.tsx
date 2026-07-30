import Link from "next/link";
import React from "react";

type Props = {
  aria_label?: string;
  external?: boolean;
  label?: string;
  target?: string;
  type?: "text" | "email" | "phone";
  url?: string;
  className?: string;
  children?: React.ReactNode;
};

function fallbackNameFromUrl(url: string, type?: Props["type"]) {
  if (type === "email") return "Email";
  if (type === "phone") return "Phone";
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (host.includes("linkedin")) return "LinkedIn";
    if (host.includes("facebook")) return "Facebook";
    if (host.includes("instagram")) return "Instagram";
    if (host === "x.com" || host.includes("twitter")) return "X";
    return host || undefined;
  } catch {
    return undefined;
  }
}

export default function AppLink({
  aria_label,
  external,
  label,
  target,
  type,
  url = "#",
  className,
  children,
}: Props) {
  const finalUrl =
    type === "email" ? `mailto:${url}` : type === "phone" ? `tel:${url}` : url;

  // Text-only links: do not set aria-label (avoids label-content-name-mismatch).
  // Icon/children links: always provide an accessible name.
  const showsTextOnly = !children && Boolean(label?.trim());
  const accessibleName = showsTextOnly
    ? undefined
    : aria_label?.trim() ||
      label?.trim() ||
      fallbackNameFromUrl(url, type);

  return (
    <Link
      href={finalUrl}
      aria-label={accessibleName}
      target={target}
      className={className}
      prefetch={!external}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children ? children : label}
    </Link>
  );
}
