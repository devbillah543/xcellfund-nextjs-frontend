/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

// Solid
import {
  faEnvelope,
  faPhone,
  faWarehouse,
  faScaleBalanced,
  faChevronRight,
  faArrowUp,
  faXmark,
  faBars,
  faPlus,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

// Brands
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faRedRiver,
  faBlackberry,
} from "@fortawesome/free-brands-svg-icons";

const allowedIcons = {
  faEnvelope,
  faPhone,
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faWarehouse,
  faScaleBalanced,
  faRedRiver,
  faBlackberry,
  faChevronRight,
  faArrowUp,
  faXmark,
  faBars,
  faPlus,
  faMagnifyingGlass,
};

type AllowedIconName = keyof typeof allowedIcons;

interface Props {
  name: AllowedIconName | string;
  className?: string;
}

export default function Icon({ name, className = "" }: Props) {
  const icon = (allowedIcons as Record<string, any>)[name];

  if (!icon) {
    return null;
  }

  return <FontAwesomeIcon icon={icon as any} className={className} />;
}
