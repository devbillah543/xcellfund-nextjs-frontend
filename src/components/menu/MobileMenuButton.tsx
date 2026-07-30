"use client";
import Icon from "@/components/common/Icon";

type Props = {
  open: boolean;
  toggle: () => void;
};

export function MobileMenuButton({ open, toggle }: Props) {
  return (
    <button
      onClick={toggle}
      className="md:hidden p-2 text-white min-h-11 min-w-11 inline-flex items-center justify-center"
      aria-label={open ? "Close menu" : "Open menu"}
    >
      {open ? <Icon name="faXmark" /> : <Icon name="faBars" />}
    </button>
  );
}
