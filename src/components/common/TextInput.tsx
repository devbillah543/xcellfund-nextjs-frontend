import React from "react";

type InputType = "text" | "email" | "password" | "number" | "tel" | "textarea";

type Props = {
  id?: string;
  name?: string;
  type?: InputType;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  className?: string;
};

export default function TextInput({
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  className = "w-full border bg-[#F5F6F7] text-base font-light border-white/10 rounded px-3 py-3 text-black placeholder:text-gray-700 focus:placeholder-transparent focus:outline-none focus:ring-0",
}: Props) {
  const isRequired = placeholder?.trim().endsWith("*") ?? false;

  // Render textarea if type is textarea
  if (type === "textarea") {
    return (
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        aria-label={name || placeholder}
        aria-required={isRequired}
        rows={4}
      />
    );
  }

  // Otherwise render normal input
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      aria-label={name || placeholder}
      aria-required={isRequired}
    />
  );
}
