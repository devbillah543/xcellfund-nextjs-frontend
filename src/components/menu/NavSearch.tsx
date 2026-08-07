"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/common/Icon";

type SearchLink = {
  id: number | string;
  label: string;
  url: string;
};

type Props = {
  links: SearchLink[];
  className?: string;
};

export default function NavSearch({ links, className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return links
      .filter((link) => link.label.toLowerCase().includes(q))
      .slice(0, 8);
  }, [links, query]);

  const closeSearch = () => {
    setOpen(false);
    setQuery("");
    setShowResults(false);
  };

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 10);
    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    };
    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        closeSearch();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  const goTo = (url: string) => {
    closeSearch();
    router.push(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results[0]) {
      goTo(results[0].url);
      return;
    }
    setShowResults(true);
  };

  return (
    <div ref={rootRef} className={`relative flex items-center ${className}`}>
      <button
        type="button"
        onClick={() => (open ? closeSearch() : setOpen(true))}
        aria-label={open ? "Close search" : "Open search"}
        aria-expanded={open}
        className="text-white font-bold hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-end w-11 h-11 min-h-11 min-w-11"
      >
        {open ? (
          <Icon name="faXmark" className="text-sm font-bold text-white" />
        ) : (
          <Icon name="faMagnifyingGlass" className="text-sm font-bold text-white" />
        )}
      </button>

      {open && (
        <div
          className="absolute top-full right-0 z-[100] mt-1"
          style={{ width: 280, maxWidth: "calc(100vw - 2rem)" }}
        >
          <form
            onSubmit={handleSubmit}
            className="relative"
            style={{ width: "100%" }}
          >
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              placeholder="Search..."
              aria-label="Search the site"
              autoComplete="off"
              style={{
                display: "block",
                width: "100%",
                height: 40,
                boxSizing: "border-box",
                padding: "0 40px 0 14px",
                margin: 0,
                border: 0,
                borderRadius: 0,
                background: "#fff",
                color: "#111",
                fontSize: 14,
                lineHeight: "40px",
                outline: "none",
                WebkitAppearance: "none",
                appearance: "none",
              }}
            />
            <button
              type="submit"
              aria-label="Submit search"
              className="cursor-pointer"
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                width: 22,
                height: 22,
                padding: 0,
                border: 0,
                background: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="faMagnifyingGlass" className="w-4 h-4 text-[#111]" />
            </button>
          </form>

          {showResults && query.trim() && (
            <div
              className="bg-white shadow-lg max-h-64 overflow-y-auto"
              style={{ width: "100%" }}
            >
              {results.length > 0 ? (
                <ul className="py-1 m-0 list-none">
                  {results.map((item) => (
                    <li key={`${item.id}-${item.url}`}>
                      <button
                        type="button"
                        onClick={() => goTo(item.url)}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-100 montserrat uppercase tracking-wide cursor-pointer border-0 bg-transparent"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-4 py-3 text-sm text-gray-500 lato m-0">
                  No results found
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
