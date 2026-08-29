# Quartz Hero Banner

[![npm version](https://img.shields.io/npm/v/quartz-hero-banner?color=cb3837&logo=npm)](https://www.npmjs.com/package/quartz-hero-banner)
[![CI](https://github.com/riberoc/quartz-hero-banner/actions/workflows/ci.yml/badge.svg)](https://github.com/riberoc/quartz-hero-banner/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A Quartz v5 component plugin that turns Obsidian cover images into responsive hero banners. It overlays the note title and modified/created date, supports wikilinks, and falls back to Quartz's normal title layout when no cover is present.

## Example

An example of how it looks is below:
![Quartz Hero Banner example](example.png)

## Features

- Uses `cover`, `socialImage`, or `image` frontmatter by default.
- Supports Obsidian wikilinks such as `[[cover.png]]` and external image URLs.
- Resolves relative image paths on nested Quartz routes.
- Shows the modified date, falling back to the created date.
- Safely renders a normal title and date when a cover image is unavailable.
- Ships as a small TypeScript/Preact package with generated declarations.

## Install

From a Quartz v5 site, install the plugin directly from GitHub:

```bash
npx quartz plugin add github:riberoc/quartz-hero-banner
```

Then add the plugin to `quartz.config.yaml` (the CLI may add this for you):

```yaml
plugins:
  - source: github:riberoc/quartz-hero-banner
    enabled: true
    options:
      coverProperties: [cover, socialImage, image]
      showDate: true
      dateLocale: en-US
      minHeight: 200px
    layout:
      position: beforeBody
      priority: 10
```

Restart your Quartz preview after changing the configuration. The plugin replaces the title component at the configured layout position.

The plugin can also be installed from npm after publishing:

```bash
npm install quartz-hero-banner
```

The npm package is useful when importing the component from TypeScript or when your workflow manages dependencies through npm. Quartz's plugin CLI installation is recommended for normal Quartz configuration.

## Frontmatter

The default configuration checks `cover`, `socialImage`, and `image` in that order. Obsidian wikilinks are supported:

```yaml
---
title: About me
cover: "[[Aboutme_2.png]]"
---
```

External URLs also work:

```yaml
---
title: About me
cover: https://images.example.com/about-me.jpg
---
```

Relative image paths are resolved for nested Quartz routes and external URLs are preserved.

## Options

| Option            | Default                             | Description                                                |
| ----------------- | ----------------------------------- | ---------------------------------------------------------- |
| `coverProperties` | `['cover', 'socialImage', 'image']` | Frontmatter keys checked for a cover image.                |
| `showDate`        | `true`                              | Shows the modified date, falling back to the created date. |
| `dateLocale`      | `'en-US'`                           | Locale used to format the date.                            |
| `minHeight`       | `'200px'`                           | Minimum height of the banner.                              |

If no cover is found, the component renders the title and date so it can safely replace Quartz's normal title component.

## Accessibility and styling

The cover image is rendered as a decorative background with an accessible image role and the note title as its label. The title remains readable through a dark gradient overlay. You can override the generated styles in your Quartz theme using the `.hero-banner-*` class names.

## Compatibility

| Package | Supported version |
| ------- | ----------------- |
| Quartz  | v5                |
| Node.js | 22+               |
| Preact  | 10+               |

## Troubleshooting

- **The banner is missing:** confirm the frontmatter key is listed in `coverProperties` and that the image path is relative to the content directory.
- **A wikilink does not resolve:** use the image file name, for example `cover: "[[images/cover.png]]"`.
- **The title appears twice:** remove Quartz's separate title component or configure this plugin at the intended title position.

## Development

```bash
npm install
npm run typecheck
npm run build
```

The generated `dist/` directory is included in the package and regenerated before publishing.

## Contributing

Bug reports and pull requests are welcome. Please include your Quartz version, Node.js version, frontmatter example, and a screenshot when reporting a rendering issue.
