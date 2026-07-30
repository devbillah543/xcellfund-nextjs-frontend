"use client";

import React, { useEffect, useRef, useState } from "react";
import SubscriptionSkeleton from "@/components/placeholder/SubscriptionSkeleton";

type Props = {
  input: unknown;
  button: unknown;
  socials: unknown;
};

export default function DeferredSubscription(props: Props) {
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
        import("@/components/common/Subscription").then((m) => {
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
      {Comp ? <Comp {...props} /> : <SubscriptionSkeleton socialsCount={3} />}
    </div>
  );
}
