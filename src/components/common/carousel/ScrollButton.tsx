"use client";

import React from "react";
import "./ScrollButton.css";

const ScrollButton = ({ type = "next", onClick }) => {
  const isNext = type === "next";

  return (
    <div className="scroll-icon-container" onClick={onClick}>
      {isNext ? <div className="up-arrow"></div> : <div className="top-line"></div>}
      <div className={isNext ? "next-text" : "prev-text"}>
        {isNext ? "NEXT" : "PREV"}
      </div>
      {isNext ? <div className="bottom-line"></div> : <div className="down-arrow"></div>}
    </div>
  );
};

export default ScrollButton;
