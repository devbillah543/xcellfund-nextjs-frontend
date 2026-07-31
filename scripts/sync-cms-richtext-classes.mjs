/**
 * Fetch all RichtextContent page APIs, extract Tailwind classes, write:
 * - src/components/rich-text-content/cms-safelist.ts
 * - src/components/rich-text-content/cms-source-inline.css
 * - src/components/rich-text-content/cms-utilities.generated.css
 *
 * Usage: node scripts/sync-cms-richtext-classes.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "src/components/rich-text-content");

const ENDPOINTS = [
  "investment",
  "private-placement",
  "debt-restructuring",
  "convertible-debenture",
  "seed-investment",
  "collateralized-funding",
  "reg-a-funding",
  "equity-line-funding",
  "stock-loan",
  "series-d-funding",
  "partnership",
  "partnership-process",
  "partnership-strategy",
  "partnership-vs-investment",
  "web-technology",
  "web-publication",
  "web-property",
  "saas-solution",
  "niche",
  "mobile-application",
  "internet-advertising",
  "desktop-software",
  "corporate-accountability",
  "corporate-focus",
  "corporate-responsibility",
  "corporate-sustainability",
  "employee-pride",
  "executive-viewpoint",
  "international-impact",
  "investment-strategy",
  "our-strategy",
  "philanthropy",
  "vision-and-goal",
  "terms-of-service",
  "privacy-policy",
];

const SKIP_CSS = new Set(["list-dash", "list-icon", "list-tick", "prata", "lato", "leading", "pd-2"]);

const SPACING = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  10: "2.5rem",
  16: "4rem",
  18: "4.5rem",
  32: "8rem",
};

const FONT_WEIGHT = { light: "300", normal: "400", medium: "500", bold: "700" };
const FONT_SIZE = {
  base: ["1rem", "1.5rem"],
  lg: ["1.125rem", "1.75rem"],
  "2xl": ["1.5rem", "2rem"],
};
const LEADING = { 10: "2.5rem" };
const BREAKPOINTS = { md: "768px", lg: "1024px" };

function loadEnv() {
  const envPath = path.join(root, ".env");
  const env = {};
  if (!fs.existsSync(envPath)) return env;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (!m) continue;
    env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return env;
}

function extractClasses(html) {
  const set = new Set();
  if (!html) return set;
  for (const re of [/class\s*=\s*"([^"]+)"/g, /class\s*=\s*'([^']+)'/g]) {
    let m;
    while ((m = re.exec(html))) {
      for (const c of m[1].split(/\s+/)) if (c) set.add(c);
    }
  }
  return set;
}

async function fetchAll() {
  const env = loadEnv();
  const apiUrl = (env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
  const token = env.NEXT_PUBLIC_API_KEY;
  if (!apiUrl || !token) throw new Error("Missing NEXT_PUBLIC_API_URL / NEXT_PUBLIC_API_KEY");

  const all = new Set();
  const byPage = {};
  for (const ep of ENDPOINTS) {
    try {
      const res = await fetch(`${apiUrl}/api/${ep}`, {
        headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        console.warn(`FAIL ${ep}: ${res.status}`);
        continue;
      }
      const json = await res.json();
      const classes = extractClasses(json?.data?.content);
      byPage[ep] = [...classes].sort();
      for (const c of classes) all.add(c);
      console.log(`OK ${ep}: ${classes.size} classes`);
    } catch (e) {
      console.warn(`FAIL ${ep}:`, e.message);
    }
  }
  return { all: [...all].sort(), byPage };
}

function escClass(cls) {
  return cls
    .replace(/:/g, "\\:")
    .replace(/\//g, "\\/")
    .replace(/\[/g, "\\[")
    .replace(/\]/g, "\\]")
    .replace(/\./g, "\\.")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/#/g, "\\#");
}

function parseClass(raw) {
  const m = raw.match(/^(sm|md|lg|xl|2xl):(.+)$/);
  if (m) return { variant: m[1], name: m[2], raw };
  return { variant: null, name: raw, raw };
}

function declarationsFor(name) {
  if (name === "flex") return ["display: flex"];
  if (name === "flex-1") return ["flex: 1 1 0%", "min-width: 0"];
  if (name === "flex-col") return ["flex-direction: column"];
  if (name === "flex-row") return ["flex-direction: row"];
  if (name === "grid") return ["display: grid"];
  if (name === "grid-cols-1") return ["grid-template-columns: repeat(1, minmax(0, 1fr))"];
  if (name === "grid-cols-2") return ["grid-template-columns: repeat(2, minmax(0, 1fr))"];
  if (name === "grid-cols-3") return ["grid-template-columns: repeat(3, minmax(0, 1fr))"];
  if (name === "items-center") return ["align-items: center"];
  if (name === "items-start") return ["align-items: flex-start"];
  if (name === "justify-center") return ["justify-content: center"];
  if (name === "justify-end") return ["justify-content: flex-end"];
  if (name === "justify-start") return ["justify-content: flex-start"];
  if (name === "object-cover") return ["object-fit: cover"];
  if (name === "w-full" || name === "full") return ["width: 100%"];
  if (name === "h-full") return ["height: 100%"];
  if (name === "h-auto") return ["height: auto"];
  if (name === "w-1/2") return ["width: 50%"];
  if (name === "w-md") return ["width: 28rem"];
  if (name === "italic") return ["font-style: italic"];
  if (name === "text-left") return ["text-align: left"];
  if (name === "text-center") return ["text-align: center"];
  if (name === "text-justify") return ["text-align: justify"];
  if (name === "border-2") return ["border-width: 2px", "border-style: solid"];

  let m;
  if ((m = name.match(/^font-(light|normal|medium|bold)$/)))
    return [`font-weight: ${FONT_WEIGHT[m[1]]}`];
  if ((m = name.match(/^text-(base|lg|2xl)$/))) {
    const [size, lh] = FONT_SIZE[m[1]];
    return [`font-size: ${size}`, `line-height: ${lh}`];
  }
  if ((m = name.match(/^leading-(\d+)$/))) {
    const v = LEADING[m[1]];
    return v ? [`line-height: ${v}`] : null;
  }
  if ((m = name.match(/^leading-\[(.+)\]$/))) return [`line-height: ${m[1]}`];
  if ((m = name.match(/^text-\[(.+)\]$/))) {
    const v = m[1];
    if (v.startsWith("#") || v.startsWith("rgb") || v.startsWith("hsl")) return [`color: ${v}`];
    return [`font-size: ${v}`];
  }
  if ((m = name.match(/^text-\(--(.+)\)$/))) return [`color: var(--${m[1]})`];
  if ((m = name.match(/^border-\(--(.+)\)$/))) return [`border-color: var(--${m[1]})`];
  if ((m = name.match(/^tracking-\[(.+)\]$/))) return [`letter-spacing: ${m[1]}`];
  if ((m = name.match(/^gap-([\d.]+)$/))) {
    const v = SPACING[m[1]];
    return v ? [`gap: ${v}`] : null;
  }
  if ((m = name.match(/^max-w-\[(.+)\]$/))) return [`max-width: ${m[1]}`];
  if ((m = name.match(/^w-\[(.+)\]$/))) return [`width: ${m[1]}`];
  if ((m = name.match(/^h-\[(.+)\]$/))) return [`height: ${m[1]}`];

  const space = (prop) => {
    const mm = name.match(new RegExp(`^${prop}-([\\d.]+)$`));
    if (!mm) return null;
    return SPACING[mm[1]] || null;
  };
  for (const [prefix, prop] of [
    ["m", "margin"],
    ["mx", "margin-inline"],
    ["my", "margin-block"],
    ["mt", "margin-top"],
    ["mb", "margin-bottom"],
    ["ms", "margin-inline-start"],
    ["me", "margin-inline-end"],
    ["p", "padding"],
    ["px", "padding-inline"],
    ["py", "padding-block"],
    ["pt", "padding-top"],
    ["pb", "padding-bottom"],
    ["ps", "padding-inline-start"],
    ["pe", "padding-inline-end"],
  ]) {
    const v = space(prefix);
    if (v) return [`${prop}: ${v}`];
  }
  return null;
}

function buildUtilityCss(classes) {
  const base = [];
  const byBp = { md: [], lg: [] };

  for (const raw of classes) {
    if (SKIP_CSS.has(raw)) continue;
    const { variant, name } = parseClass(raw);
    // Fixed pixel widths belong only on flex side-columns (see helpers below).
    // Emitting them globally crushes CSS grid cards (web-properties).
    if (variant === "md" && /^w-\[\d+px\]$/.test(name)) continue;
    const decls = declarationsFor(name);
    if (!decls) {
      console.warn(`skip unknown: ${raw}`);
      continue;
    }
    const body = decls.map((d) => `  ${d} !important;`).join("\n");
    const rule = `.page-content .${escClass(raw)} {\n${body}\n}`;
    if (!variant) base.push(rule);
    else if (byBp[variant]) byBp[variant].push(rule);
    else console.warn(`skip variant: ${raw}`);
  }

  // Stable helpers (used by RichtextContent enhanceCmsHtml)
  base.push(`
.page-content .full,
.page-content .cms-w-full { width: 100% !important; }
.page-content .cms-flex-1 { flex: 1 1 0% !important; min-width: 0 !important; }
.page-content .cms-grid-cols-2,
.page-content .cms-grid-cols-3 {
  display: grid !important;
  gap: 1rem !important; /* gap-4 */
  grid-template-columns: 1fr !important;
  align-items: start !important;
}
.page-content .cms-grid-cols-2 > *,
.page-content .cms-grid-cols-3 > * {
  min-width: 0 !important;
  width: 100% !important;
  max-width: none !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
.page-content .cms-md-flex-row {
  display: flex !important;
  flex-direction: column !important;
  align-items: stretch !important;
  gap: 1.25rem !important;
}
.page-content .lato { font-family: var(--font-lato) !important; }
.page-content .prata { font-family: var(--font-prata) !important; }
`);

  let css = `/* Auto-generated by scripts/sync-cms-richtext-classes.mjs — do not edit by hand */\n\n`;
  css += base.join("\n");

  css += `

@media (min-width: ${BREAKPOINTS.md}) {
${byBp.md.join("\n")}
  .page-content .cms-md-flex-row {
    flex-direction: row !important;
    align-items: center !important;
  }
  .page-content .cms-md-gap-10 { gap: 2.5rem !important; }
  .page-content .cms-md-gap-16 { gap: 4rem !important; }
  .page-content .cms-md-gap-32 { gap: 8rem !important; }
  .page-content .cms-md-flex-row > .cms-md-w-md,
  .page-content .cms-md-flex-row .cms-md-w-md {
    width: 28rem !important;
    max-width: 48% !important;
    flex: 0 0 28rem !important;
  }
  .page-content .cms-md-flex-row > .cms-md-w-1-2,
  .page-content .cms-md-flex-row .cms-md-w-1-2 {
    width: 50% !important;
    max-width: 50% !important;
    flex: 0 0 50% !important;
  }
  .page-content .cms-md-flex-row > .cms-md-w-428,
  .page-content .cms-md-flex-row .cms-md-w-428 {
    width: 428px !important;
    max-width: 48% !important;
    flex: 0 0 auto !important;
  }
  .page-content .cms-md-flex-row .cms-flex-1 {
    flex: 1 1 0% !important;
    min-width: 0 !important;
    width: auto !important;
  }
  .page-content .cms-md-flex-row .cms-md-w-md img,
  .page-content .cms-md-flex-row .cms-md-w-428 img,
  .page-content .cms-md-flex-row [class*="cms-md-w-"] img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
  }
  .page-content .cms-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
  .page-content .cms-grid-cols-2,
  .page-content .cms-grid-cols-3 {
    gap: 1.5rem !important; /* md:gap-6 */
  }
  .page-content .md\\:w-\\[1140px\\],
  .page-content .md\\:w-\\[1092px\\] {
    width: 100% !important;
    max-width: 100% !important;
  }
}
`;

  css += `
@media (min-width: ${BREAKPOINTS.lg}) {
${byBp.lg.join("\n")}
  .page-content .cms-grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  }
}
`;

  // Dynamic helpers for side-column md:w-[Npx] / md:h-[Npx] (skip full-bleed wrappers)
  const FULL_BLEED = new Set(["1092", "1140"]);
  const widthHelpers = [];
  const heightHelpers = [];
  for (const raw of classes) {
    let m;
    if ((m = raw.match(/^md:w-\[(\d+)px\]$/)) && !FULL_BLEED.has(m[1])) {
      // Only for flex image/text rows — never crush grid columns (e.g. web-properties)
      widthHelpers.push(
        `  .page-content .cms-md-flex-row .cms-md-w-${m[1]} { width: ${m[1]}px !important; max-width: 48% !important; flex: 0 0 auto !important; }`,
      );
    }
    if ((m = raw.match(/^md:h-\[(\d+)px\]$/))) {
      heightHelpers.push(
        `  .page-content .cms-md-h-${m[1]} { height: ${m[1]}px !important; }`,
      );
    }
  }
  if (widthHelpers.length || heightHelpers.length) {
    css += `\n@media (min-width: ${BREAKPOINTS.md}) {\n${[...new Set(widthHelpers)].join("\n")}\n${[...new Set(heightHelpers)].join("\n")}\n}\n`;
  }

  // Grid cards (e.g. web-properties Finance/Health/Legal): fill tracks; ignore fixed md:w-[Npx]
  css += `
@media (min-width: ${BREAKPOINTS.md}) {
  .page-content .cms-grid-cols-2 > [class*="md:w-"],
  .page-content .cms-grid-cols-3 > [class*="md:w-"],
  .page-content .cms-grid-cols-2 > *,
  .page-content .cms-grid-cols-3 > * {
    width: 100% !important;
    max-width: none !important;
  }
}
`;

  return css;
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function writeOutputs(all, byPage) {
  fs.mkdirSync(path.join(root, "scripts"), { recursive: true });
  fs.writeFileSync(path.join(root, "scripts/cms-classes-extracted.txt"), all.join("\n") + "\n");
  fs.writeFileSync(
    path.join(root, "scripts/cms-classes-by-page.json"),
    JSON.stringify(byPage, null, 2) + "\n",
  );

  const utilityClasses = all.filter((c) => !SKIP_CSS.has(c) || c === "full");

  const safelist = `/**
 * Auto-generated from all RichtextContent CMS APIs.
 * Re-run: npm run sync:cms-classes
 */
export const CMS_RICHTEXT_CLASSES = ${JSON.stringify(utilityClasses.join(" "))};

export default CMS_RICHTEXT_CLASSES;
`;
  fs.writeFileSync(path.join(outDir, "cms-safelist.ts"), safelist);

  const inlineChunks = chunk(utilityClasses, 35)
    .map((slice) => `@source inline(${JSON.stringify(slice.join(" "))});`)
    .join("\n");
  fs.writeFileSync(
    path.join(outDir, "cms-source-inline.css"),
    `/* Auto-generated CMS class safelist for Tailwind v4 */\n${inlineChunks}\n`,
  );

  const utilities = buildUtilityCss(all);
  fs.writeFileSync(path.join(outDir, "cms-utilities.generated.css"), utilities);

  console.log(`\nWrote ${all.length} unique classes from ${Object.keys(byPage).length} pages`);
  console.log("- cms-safelist.ts");
  console.log("- cms-source-inline.css");
  console.log("- cms-utilities.generated.css");
}

const { all, byPage } = await fetchAll();
writeOutputs(all, byPage);
