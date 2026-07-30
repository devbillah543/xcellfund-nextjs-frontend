import { Lato, Montserrat, Prata } from "next/font/google";

// Only weights used in the UI (light/normal/bold)
export const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal"],
  display: "swap",
  variable: "--font-lato",
  preload: true,
});

// Nav uses medium/normal
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal"],
  display: "swap",
  variable: "--font-montserrat",
  preload: true,
});

export const prata = Prata({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-prata",
  preload: true,
});
