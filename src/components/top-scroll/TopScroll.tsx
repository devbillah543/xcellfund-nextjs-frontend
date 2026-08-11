"use client";

import React, { useEffect, useRef, useState } from "react";
import Icon from "@/components/common/Icon";

export default function TopScroll() {
  const [show, setShow] = useState(false);
  const wheelScrollAmountRef = useRef(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Only count downward scrolls
      if (e.deltaY > 0) {
        wheelScrollAmountRef.current += e.deltaY;
      }

      if (wheelScrollAmountRef.current > 200) {
        setShow(true);
      }
    };

    const handleScroll = () => {
      if (window.scrollY < 10) {
        wheelScrollAmountRef.current = 0;
        setShow(false);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    wheelScrollAmountRef.current = 0;
    setShow(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {show && (
        <button
          className="bg-(--sand-500) text-white p-3 fixed bottom-5 right-5 z-50 hover:bg-(--sand-800) transition-opacity duration-300 cursor-pointer"
          onClick={handleClick}
          aria-label="Scroll to top"
        >
          <Icon name="faArrowUp" />
        </button>
      )}
    </>
  );
}
