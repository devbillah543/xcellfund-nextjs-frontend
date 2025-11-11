// src/components/common/carousel/ScrollButton.tsx
"use client";

import React from "react";
import "./ScrollButton.css";

interface ScrollButtonProps {
  type?: "next" | "prev";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ type = "next", onClick }) => {
  const isNext = type === "next";

  return (
    <button
      type="button"
      className="scroll-icon-container"
      onClick={onClick}
      aria-label={isNext ? "Next slide" : "Previous slide"}
    >
      {isNext ? <div className="up-arrow" /> : <div className="top-line" />}
      <div className={isNext ? "next-text" : "prev-text"}>
        {isNext ? "NEXT" : "PREV"}
      </div>
      {isNext ? <div className="bottom-line" /> : <div className="down-arrow" />}
    </button>
  );
};

export default ScrollButton;
