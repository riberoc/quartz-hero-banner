import { Fragment } from "preact";
import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types";
import type { HeroBannerOptions } from "../types";

const defaultOptions: Required<HeroBannerOptions> = {
  coverProperties: ["cover", "socialImage", "image"],
  showDate: true,
  dateLocale: "en-US",
  minHeight: "200px",
};

function coverUrl(value: unknown): string | undefined {
  if (Array.isArray(value)) return coverUrl(value[0]);
  if (typeof value !== "string" || value.length === 0) return undefined;
  const wikilink = value.match(/^!?\[\[([^|\]]+)(?:\|[^\]]+)?\]\]$/);
  return wikilink?.[1] ?? value;
}

function assetUrl(cover: string, slug: string | undefined): string {
  if (/^(?:[a-z]+:|\/\/|\/)/i.test(cover)) return cover;
  const path = cover
    .replace(/^\.\//, "")
    .split("/")
    .map((segment) => encodeURIComponent(segment.toLowerCase()))
    .join("/");
  const depth = slug?.split("/").filter(Boolean).length ?? 0;
  return `${"../".repeat(Math.max(0, depth - 1))}${path}`;
}

export const HeroBanner = (options: HeroBannerOptions = {}) => {
  const config = { ...defaultOptions, ...options };
  const Component: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
    const frontmatter = (fileData.frontmatter ?? {}) as Record<string, unknown>;
    const cover = config.coverProperties
      .map((property) => coverUrl(frontmatter[property]))
      .find((value): value is string => value !== undefined);
    const title = String(frontmatter.title ?? fileData.slug ?? "");
    const date = config.showDate
      ? (fileData.dates?.modified ?? fileData.dates?.created)
      : undefined;
    const formattedDate = date
      ? new Intl.DateTimeFormat(config.dateLocale, {
          year: "numeric",
          month: "short",
          day: "2-digit",
        }).format(new Date(date))
      : "";
    const titleBlock = <h1 class="article-title">{title}</h1>;
    const metaBlock = (
      <p class="content-meta">
        {formattedDate && (
          <time datetime={new Date(date!).toISOString()}>{formattedDate}</time>
        )}
      </p>
    );

    if (!cover) {
      return (
        <Fragment>
          {titleBlock}
          {metaBlock}
        </Fragment>
      );
    }
    return (
      <div class="hero-banner-container">
        <div
          class="hero-banner-image"
          style={{
            backgroundImage: `url("${assetUrl(cover, fileData.slug)}")`,
            minHeight: config.minHeight,
          }}
          role="img"
          aria-label={title}
        >
          <div class="hero-banner-overlay">
            {titleBlock}
            {metaBlock}
          </div>
        </div>
      </div>
    );
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

export default HeroBanner satisfies QuartzComponentConstructor<HeroBannerOptions>;
