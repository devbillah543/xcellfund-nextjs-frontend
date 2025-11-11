import React, { ReactElement } from "react";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";

type SocialPlatform =
  | "linkedin"
  | "facebook"
  | "twitter"
  | "instagram"
  | "youtube"
  | "whatsapp"
  | "phone"
  | "email"
  | "website"
  | string;

interface SocialItem {
  social_media_platform?: SocialPlatform;
  size?: number;
}

export function getSocialIcon(item: SocialItem): ReactElement {
  const size = item.size ?? 16;
  const key = String(item.social_media_platform ?? "website").trim().toLowerCase();

  const icons: Record<string, ReactElement> = {
    linkedin: <FaLinkedinIn size={size} />,
    facebook: <FaFacebookF size={size} />,
    twitter: <FaTwitter size={size} />,
    instagram: <FaInstagram size={size} />,
    youtube: <FaYoutube size={size} />,
    whatsapp: <FaWhatsapp size={size} />,
    phone: <FaPhone size={size} />,
    email: <FaEnvelope size={size} />,
    website: <FaGlobe size={size} />,
  };

  return icons[key] ?? <FaGlobe size={size} />;
}
