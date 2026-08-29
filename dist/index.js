// src/components/HeroBanner.tsx
import { Fragment } from "preact";
import { jsx, jsxs } from "preact/jsx-runtime";
var defaultOptions = {
  coverProperties: ["cover", "socialImage", "image"],
  showDate: true,
  dateLocale: "en-US",
  minHeight: "200px"
};
function coverUrl(value) {
  if (Array.isArray(value)) return coverUrl(value[0]);
  if (typeof value !== "string" || value.length === 0) return void 0;
  const wikilink = value.match(/^!?\[\[([^|\]]+)(?:\|[^\]]+)?\]\]$/);
  return wikilink?.[1] ?? value;
}
function assetUrl(cover, slug) {
  if (/^(?:[a-z]+:|\/\/|\/)/i.test(cover)) return cover;
  const path = cover.replace(/^\.\//, "").split("/").map((segment) => encodeURIComponent(segment.toLowerCase())).join("/");
  const depth = slug?.split("/").filter(Boolean).length ?? 0;
  return `${"../".repeat(Math.max(0, depth - 1))}${path}`;
}
var HeroBanner = (options = {}) => {
  const config = { ...defaultOptions, ...options };
  const Component = ({ fileData }) => {
    const frontmatter = fileData.frontmatter ?? {};
    const cover = config.coverProperties.map((property) => coverUrl(frontmatter[property])).find((value) => value !== void 0);
    const title = String(frontmatter.title ?? fileData.slug ?? "");
    const date = config.showDate ? fileData.dates?.modified ?? fileData.dates?.created : void 0;
    const formattedDate = date ? new Intl.DateTimeFormat(config.dateLocale, {
      year: "numeric",
      month: "short",
      day: "2-digit"
    }).format(new Date(date)) : "";
    const titleBlock = /* @__PURE__ */ jsx("h1", { class: "article-title", children: title });
    const metaBlock = /* @__PURE__ */ jsx("p", { class: "content-meta", children: formattedDate && /* @__PURE__ */ jsx("time", { datetime: new Date(date).toISOString(), children: formattedDate }) });
    if (!cover) {
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        titleBlock,
        metaBlock
      ] });
    }
    return /* @__PURE__ */ jsx("div", { class: "hero-banner-container", children: /* @__PURE__ */ jsx(
      "div",
      {
        class: "hero-banner-image",
        style: {
          backgroundImage: `url("${assetUrl(cover, fileData.slug)}")`,
          minHeight: config.minHeight
        },
        role: "img",
        "aria-label": title,
        children: /* @__PURE__ */ jsxs("div", { class: "hero-banner-overlay", children: [
          titleBlock,
          metaBlock
        ] })
      }
    ) });
  };
  Component.css = `
.hero-banner-container { width: 100%; margin-bottom: 2rem; }
.hero-banner-image { width: 100%; background-size: cover; background-position: center; border-radius: 12px; overflow: hidden; position: relative; display: flex; flex-direction: column; justify-content: flex-end; }
.hero-banner-overlay { padding: 1.5rem 1.2rem 1rem; background: linear-gradient(to top, rgba(0,0,0,.75), transparent); }
.hero-banner-overlay .article-title { color: #fff !important; margin: 0 0 .2rem !important; text-shadow: 0 2px 4px rgba(0,0,0,.4); }
.hero-banner-overlay .content-meta { margin: 0 !important; }
.hero-banner-overlay .content-meta, .hero-banner-overlay .content-meta time, .hero-banner-overlay .content-meta span { color: rgba(255,255,255,.9) !important; font-weight: 500; text-shadow: 0 1px 3px rgba(0,0,0,.5); }
`;
  return Component;
};
var HeroBanner_default = HeroBanner;
export {
  HeroBanner_default as HeroBanner
};
//# sourceMappingURL=index.js.map