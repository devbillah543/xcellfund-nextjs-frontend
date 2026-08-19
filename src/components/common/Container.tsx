import React, { ElementType, ReactNode } from "react";

type ContainerProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  [key: string]: unknown;
};

/**
 * Global content container. Caps content at the site’s shared max-width and
 * applies the shared responsive gutter so every section (header, hero, main
 * content, CTA, newsletter, footer) aligns on the same left/right edges.
 * Sections can stay full-width for backgrounds; nest their content in this.
 */
export default function Container({
  as: Tag = "div",
  className = "",
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag className={`site-container ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
