import React from "react";
import Form from "@/components/contact/Form";

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

type Props = {
  button: Button;
  input: Input[];
};

export default function HomeContact({ button, input }: Props) {
  return (
    <div className="w-full max-w-[1140px] px-10 md:mx-auto pt-12 md:pt-20 pb-12">
      <h2 className="text-(--sand-text) text-4xl font-normal leading-14 uppercase mb-8 text-center md:text-left prata">
        Contact Us
      </h2>
      <Form input={input} button={button} />
    </div>
  );
}
