import React from "react";
import Link from "next/link";

type LinkItemProps = {
  href: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  newTab?: boolean;
  iconPosition?: "left" | "right";
  ariaLabel?: string;
  fontSize?: number | string;
  anchorProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
};

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

function getFontSizeClass(fontSize?: number | string): string {
  if (!fontSize) return "";

  // If fontSize is a number → text-[12px]
  if (typeof fontSize === "number") {
    return `text-[${fontSize}px]`;
  }

  // If already a Tailwind text class like "text-sm" or "text-lg"
  if (/^text-/.test(fontSize)) {
    return fontSize;
  }

  // If it's a raw CSS unit like "12px", "1rem", "0.8em"
  if (/^\d+(\.\d+)?(px|rem|em|%)$/.test(fontSize)) {
    return `text-[${fontSize}]`;
  }

  // Fallback: assume it's a valid Tailwind class or custom string
  return fontSize;
}

function LinkItem({
  href,
  label,
  icon,
  className = "",
  newTab = false,
  iconPosition = "left",
  ariaLabel,
  fontSize = 14,
  anchorProps = {},
}: LinkItemProps) {
  const isExternal =
    typeof href === "string" &&
    /^(https?:|mailto:|tel:|\/\/)/.test(href);

  const fontSizeClass = getFontSizeClass(fontSize);

  const content = (
    <span className={cx("inline-flex items-center", className, fontSizeClass)}>
      {iconPosition === "left" && icon && (
        <span className={cx(label ? "mr-1 inline-flex" : "inline-flex")}>{icon}</span>
      )}
      {label && <span>{label}</span>}
      {iconPosition === "right" && icon && (
        <span className={cx(label ? "ml-1 inline-flex" : "inline-flex")}>{icon}</span>
      )}
    </span>
  );

  const rel = newTab ? "noopener noreferrer" : undefined;
  const target = newTab ? "_blank" : undefined;

  const wrapperClass = "flex justify-center items-center";

  // External link — use plain anchor
  if (isExternal) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={wrapperClass}
        aria-label={ariaLabel}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }

  // Internal Next.js link — render Link directly (no nested <a>)
  return (
    <Link
      href={href}
      // Link accepts these props and will forward them to the underlying <a>
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      className={wrapperClass}
      {...(anchorProps as any)}
    >
      {content}
    </Link>
  );
}

export default React.memo(LinkItem);
