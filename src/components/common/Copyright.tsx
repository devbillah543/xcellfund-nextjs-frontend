import AppLink from "@/components/common/AppLink";
import Container from "@/components/common/Container";
import React from "react";

type Icon = {
  name: string;
};

type LinkItem = {
  id: number;
  label: string | null;
  url: string;
  type: "text" | "email" | "phone";
  target?: "_blank" | "_self";
  aria_label?: string;
  external?: boolean;
  icon: Icon | null;
};

type Props = {
  copyright_text: string;
  links: LinkItem[];
};

export default function Copyright(data: Props) {
  return (
    <div className="w-full bg-white">
      <Container className="flex flex-col md:flex-row justify-between items-center gap-3 py-4">
          {/* Nav Links */}
          <nav className="flex flex-wrap justify-center md:justify-start items-center gap-3">
            {data?.links?.map((item, index) => (
              <React.Fragment key={item.id}>
                <AppLink
                  aria_label={item.aria_label}
                  external={item.external}
                  label={item.label ?? ""}
                  target={item.target}
                  type={item.type}
                  url={item.url}
                  className="inline-flex items-center text-(--muted-text) hover:text-(--sand-text) transition-colors duration-200 text-[14px]"
                />

                {/* Separator except last item */}
                {index !== data.links.length - 1 && (
                  <span className="h-4 border-l border-(--sand-500) opacity-50 mx-2"></span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-[14px] font-light text-(--muted-text) text-center md:text-right">
            {data?.copyright_text}
          </p>
      </Container>
    </div>
  );
}
