# Quartz Hero Banner

A Quartz v5 community plugin that renders a note's cover image as a hero banner, with the note title and modified/created date overlaid on top.

## Install

From a Quartz v5 site:

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

The plugin can also be installed from npm after publishing:

```bash
npm install quartz-hero-banner
```

## Frontmatter

The default configuration checks `cover`, `socialImage`, and `image` in that order. Obsidian wikilinks are supported:

```yaml
---
title: About me
cover: "[[Aboutme_2.png]]"
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

## Development

```bash
npm install
npm run typecheck
npm run build
```

The generated `dist/` directory is included in the package and regenerated before publishing.
