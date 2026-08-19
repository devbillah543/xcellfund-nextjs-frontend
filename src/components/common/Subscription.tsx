/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import AppLink from "@/components/common/AppLink";
import Container from "@/components/common/Container";
import Icon from "@/components/common/Icon";
import appConfig from "@/config/app.config";

type Icon = {
  name: string;
};

type Button = {
  label: string;
  icon: Icon;
};

type Input = {
  icon: Icon;
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "tel" | "number" | "textarea";
  required?: boolean;
  name?: string;
};

type Social = {
  id: number;
  label: string | null;
  url: string;
  type: "text" | "email" | "phone" | string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  aria_label?: string;
  external?: boolean;
  icon: Icon;
};

type Props = {
  button: Button;
  input: Input;
  socials: Social[];
};

export default function Subscription({ button, input, socials }: Props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    // Required validation
    if (input.required && !value.trim()) {
      setError(`${input.name || "Field"} is required`);
      return;
    }

    // Email validation
    if (input.type === "email" && !validateEmail(value.trim())) {
      setError("Please enter a valid email address");
      return;
    }
    
    const url = appConfig.apiUrl + "/api/subscribers";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${appConfig.apiKey}`,
      },
      body: JSON.stringify({
        data: {
          [input.name || "email"]: value.trim(),
        },
      }),
    });

    if (!res.ok) throw new Error("Failed to send message");
    // Simulate success
    setSuccess("Subscription successful!");
    // Auto-hide success message
    setTimeout(() => setSuccess(""), 2000);

    setValue("");
  };

  return (
    <div className="w-full bg-[#2b3034] py-5">
      <Container className="flex flex-col md:flex-row justify-between items-center gap-4 py-4">
          {/* Email Subscription */}
          <div className="w-full md:w-1/3">
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              <div className="flex items-center gap-2 w-full bg-white rounded">
                <input
                  type={input.type}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={input.placeholder}
                  className="p-3 rounded-l text-base w-full text-black placeholder-gray-300 focus:outline-none flex-1"
                  aria-label={input.label || "Subscription Input"}
                />
                <button
                  type="submit"
                  className="bg-(--sand-500) text-white px-4 py-3 rounded-r transition-colors duration-200 shrink-0 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >
                  {button.label}
                </button>
              </div>

              {/* Error message */}
              {error && (
                <p className="text-red-500 text-sm capitalize">{error}</p>
              )}

              {/* Success message */}
              {success && <p className="text-green-400 text-sm">{success}</p>}
            </form>
          </div>

          {/* Social Icons */}
          <nav className="flex gap-4">
            {socials &&
              socials.map((social: any) => (
                <div key={social.id} className="flex items-center">
                  <AppLink
                    aria_label={social.aria_label}
                    external={social.external}
                    label={social.label}
                    target={social.target}
                    type={social.type}
                    url={social.url}
                  >
                    {social.icon && (
                      <Icon
                        name={social.icon.name}
                        className="w-4 h-4 text-white"
                      />
                    )}
                  </AppLink>
                </div>
              ))}
          </nav>
      </Container>
    </div>
  );
}
