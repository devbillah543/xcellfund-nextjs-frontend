"use client";

import { useHome } from "@/hooks/useHome";
import React, { useEffect, useRef, useState } from "react";

/* -----------------------------
   Types
   ----------------------------- */
type Field = {
  id: number;
  label?: string | null;
  name: string;
  type: string;
  placeholder?: string | null;
  iconify?: boolean;
  icon_position?: string;
  [key: string]: any;
};

type Values = Record<string, string>;
type Errors = Record<string, string>;

/* -----------------------------
   Main Form component
   ----------------------------- */
export default function Form() {
  const { homeData, loading } = useHome();
  const form = homeData?.form;
  const fields: Field[] = form?.fields ?? [];

  // -----------------------------
  // Hooks: unconditionally declared (Rules of Hooks)
  // -----------------------------
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const initializedKeysRef = useRef<string[] | null>(null);

  // Initialize form values when fields change *in shape* (not reference).
  useEffect(() => {
    const keys = fields.map((f) => f.name);
    const prev = initializedKeysRef.current;

    // if not initialized yet OR keys changed (length or any name differs), initialize
    const needInit =
      !prev || prev.length !== keys.length || keys.some((k, i) => prev[i] !== k);

    if (needInit) {
      const initial: Values = {};
      keys.forEach((k) => {
        initial[k] = "";
      });
      setValues(initial);
      setErrors({});
      setSubmitted(false);
      initializedKeysRef.current = keys;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields]);

  // treat as loading when hook reports loading or form isn't yet available
  const isLoading = Boolean(loading) || !form;

  // If there's no form and we're not loading, nothing to render
  if (!form && !loading) return null;

  // Loading skeleton (returned after hooks are declared)
  if (isLoading) {
    return (
      <div className="max-w-[1140px] mx-auto mt-20 mb-20 px-4" aria-busy="true">
        <div className="h-10 w-1/4 bg-gray-300 rounded mb-6 animate-pulse" />
        <form noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-10 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
          <div className="h-20 w-full bg-gray-300 rounded mb-6 animate-pulse mt-6" />
          <div className="mt-6 flex items-center gap-4">
            <div className="h-10 w-40 bg-gray-300 rounded animate-pulse" />
          </div>
        </form>
      </div>
    );
  }

  /* ---------- helpers ---------- */
  const isRequired = (f: Field) =>
    Boolean((f.placeholder || f.label || "").toString().trim().endsWith("*"));

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((err) => ({ ...err, [name]: "" }));
  }

  function validate() {
    const newErrors: Errors = {};
    fields.forEach((f) => {
      const val = (values[f.name] || "").trim();
      if (isRequired(f) && !val) {
        newErrors[f.name] = "This field is required";
      }
      if (f.type === "email" && val) {
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(val)) {
          newErrors[f.name] = "Please enter a valid email";
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    // TODO: replace with your API submit call
    console.log("form submit", values);
    setSubmitted(true);
  }

  return (
    <div className="max-w-[1140px] mx-auto mt-20 mb-20 px-4">
      <h2 className="text-[#c6ac83] text-4xl uppercase mb-8 text-center md:text-left">
        {form?.title}
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((f) => {
            const key = f.name;
            const value = values[key] ?? "";
            const required = isRequired(f);
            const placeholder = f.placeholder ?? "";
            const id = `field_${f.id}_${f.name}`;

            if (f.type === "textarea") {
              return (
                <div key={f.id} className="md:col-span-2">
                  <FieldWrapper label={f.label} required={required} htmlFor={id}>
                    <TextareaInput
                      id={id}
                      name={key}
                      value={value}
                      placeholder={placeholder.replace(/\*$/, "")}
                      onChange={handleChange}
                    />
                  </FieldWrapper>
                  {errors[key] && (
                    <p className="mt-1 text-sm text-rose-400">{errors[key]}</p>
                  )}
                </div>
              );
            }

            return (
              <div key={f.id}>
                <FieldWrapper label={f.label} required={required} htmlFor={id}>
                  <TextInput
                    id={id}
                    name={key}
                    type={f.type === "email" ? "email" : "text"}
                    value={value}
                    placeholder={placeholder}
                    onChange={handleChange}
                  />
                </FieldWrapper>
                {errors[key] && (
                  <p className="mt-1 text-sm text-rose-400">{errors[key]}</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center gap-4">
          <button
            type="submit"
            className="inline-block bg-black text-white px-6 py-3 rounded capitalize font-semibold tracking-[1px] hover:opacity-95 transition cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

/* -----------------------------
   Small presentational components
   Kept in the same file for cleanliness
   ----------------------------- */

function FieldWrapper({
  children,
  label,
  required,
  htmlFor,
}: {
  children: React.ReactNode;
  label?: string | null;
  required?: boolean;
  htmlFor?: string;
}) {
  return (
    <>
      {label && (
        <label
          htmlFor={htmlFor}
          className="block text-sm font-medium mb-1 text-white/80"
        >
          {label}
          {required && <span className="ml-1 text-[#c6ac83]">*</span>}
        </label>
      )}
      {children}
    </>
  );
}

function TextInput({
  id,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
}: {
  id?: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border bg-[#F5F6F7] border-white/10 rounded px-3 py-3 
                 text-black 
                 placeholder:text-gray-500 
                 focus:placeholder-transparent 
                 focus:outline-none focus:ring-0"
      aria-required={placeholder?.trim().endsWith("*") ?? false}
    />
  );
}

function TextareaInput({
  id,
  name,
  value,
  placeholder,
  rows = 6,
  onChange,
}: {
  id?: string;
  name: string;
  value: string;
  placeholder?: string;
  rows?: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-[#F5F6F7] border border-white/10 rounded px-3 py-3 
                 text-black 
                 placeholder:text-gray-500 
                 focus:placeholder-transparent 
                 focus:outline-none focus:ring-0"
      aria-required={placeholder?.trim().endsWith("*") ?? false}
    />
  );
}
