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

  const hasVisibleLabel = Boolean(label?.trim());
  const hasChildren = children != null && children !== false;

  // Only set aria-label for icon-only / unlabeled links so it doesn't
  // override visible text (fixes label-content-name-mismatch).
  const accessibleName =
    hasVisibleLabel || hasChildren ? undefined : aria_label;

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
