"use client";

import React, { useEffect, useRef, useState } from "react";
import HomeContactSkeleton from "@/components/placeholder/HomeContactSkeleton";

type Props = {
  input: unknown;
  button: unknown;
};

export default function DeferredHomeContact(props: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [Comp, setComp] = useState<React.ComponentType<Props> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        import("@/components/home/Contact").then((m) => {
          if (!cancelled) setComp(() => m.default as React.ComponentType<Props>);
        });
      },
      { rootMargin: "300px 0px", threshold: 0.01 }
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, []);

  return (
    <div ref={ref}>
      {Comp ? <Comp {...props} /> : <HomeContactSkeleton inputCount={5} />}
    </div>
  );
}
