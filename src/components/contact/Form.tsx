"use client";
import React, { useState } from "react";
import TextInput from "@/components/common/TextInput";
import Recaptcha from "@/components/common/Recaptcha";
import appConfig from "@/config/app.config";

type Icon = { name: string };

type Button = { label: string; icon: Icon };

type Input = {
  icon: Icon;
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "tel" | "number" | "textarea" | "password";
  required?: boolean;
  name?: string;
};

type Props = {
  button: Button;
  input: Input[];
  /** Defaults to contact-messages endpoint */
  endpoint?: string;
  /** Include API bearer token (default true for contact) */
  withAuth?: boolean;
  /** "login" maps username/email + password to Strapi auth/local body */
  variant?: "contact" | "login";
  errorMessage?: string;
  successMessage?: string;
  loadingLabel?: string;
  /** Show Google reCAPTCHA (default: on for contact forms) */
  showCaptcha?: boolean;
};

export default function Form({
  button,
  input,
  endpoint,
  withAuth = true,
  variant = "contact",
  errorMessage = "Something went wrong!",
  successMessage = "Message sent successfully!",
  loadingLabel = "Sending...",
  showCaptcha,
}: Props) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [captchaResetKey, setCaptchaResetKey] = useState(0);

  const captchaEnabled =
    showCaptcha ?? (variant === "contact" && Boolean(appConfig.recaptchaSiteKey));

  const isOdd = input.length % 2 !== 0;

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitError) setSubmitError(null);
  };

  const formatFieldName = (name: string = "") => {
    return name
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    input.forEach((field) => {
      const key = field.name || "";
      const label = field.label || formatFieldName(key);

      if (field.required && !formData[key]?.trim()) {
        newErrors[key] = `${label} is required`;
      }

      if (field.type === "email" && formData[key]) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!pattern.test(formData[key])) {
          newErrors[key] = "Invalid email format";
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    if (captchaEnabled && !captchaToken) {
      setCaptchaError("Please complete the captcha before submitting.");
      return;
    }

    setLoading(true);
    setSuccess(false);
    setSubmitError(null);
    setCaptchaError(null);

    try {
      const url = endpoint || `${appConfig.apiUrl}/api/contact-messages`;

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (withAuth && appConfig.apiKey) {
        headers.Authorization = `Bearer ${appConfig.apiKey}`;
      }

      const payload =
        variant === "login"
          ? {
              identifier:
                formData.username ||
                formData.email ||
                formData.identifier ||
                formData.user ||
                "",
              password: formData.password || "",
            }
          : {
              data: {
                ...formData,
                ...(captchaToken ? { recaptchaToken: captchaToken } : {}),
              },
            };

      const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      // Investor login requires exact 200; other forms accept any 2xx
      const succeeded = variant === "login" ? res.status === 200 : res.ok;

      if (!succeeded) {
        setSubmitError(errorMessage);
        setCaptchaToken(null);
        setCaptchaResetKey((k) => k + 1);
        return;
      }

      setSuccess(true);
      setFormData({});
      setCaptchaToken(null);
      setCaptchaResetKey((k) => k + 1);

      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch {
      setSubmitError(errorMessage);
      setCaptchaToken(null);
      setCaptchaResetKey((k) => k + 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={handleSubmit}
      >
        {input.map((field, index) => {
          const isLastOdd = isOdd && index === input.length - 1;

          return (
            <div key={index} className={isLastOdd ? "md:col-span-2" : ""}>
              {field.label && (
                <label
                  className="block lato text-lg font-light leading-[15px] text-[#333743] mb-2"
                  htmlFor={field.name}
                >
                  {field.label}
                  <span>{field.required ? " *" : ""}</span>
                </label>
              )}

              <TextInput
                name={field.name}
                type={field.type}
                value={formData[field.name || ""] || ""}
                onChange={(e) => handleChange(field.name || "", e.target.value)}
                placeholder={field.placeholder}
              />

              {errors[field.name || ""] && (
                <p className="text-red-600 text-sm mt-1">
                  {errors[field.name || ""]}
                </p>
              )}
            </div>
          );
        })}

        <div className="md:col-span-2 mt-4 flex flex-col items-start gap-4">
          {captchaEnabled && (
            <div>
              <Recaptcha
                key={captchaResetKey}
                siteKey={appConfig.recaptchaSiteKey}
                onChange={(token) => {
                  setCaptchaToken(token);
                  if (token) setCaptchaError(null);
                }}
              />
              {captchaError && (
                <p className="text-red-600 text-sm mt-2" role="alert">
                  {captchaError}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || (captchaEnabled && !captchaToken)}
            className="lato text-[15px] inline-block bg-[#333743] text-white px-6 py-3 rounded capitalize font-normal hover:opacity-95 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? loadingLabel : button.label}
          </button>

          {success && (
            <p className="text-green-600 text-sm" role="status">
              {successMessage}
            </p>
          )}

          {submitError && (
            <p className="text-red-600 text-sm" role="alert">
              {submitError}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
