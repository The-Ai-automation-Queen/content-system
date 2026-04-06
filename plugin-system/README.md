# HTML Plugin System — Plug & Play Guide

Turn any local HTML tool into a sellable, embeddable plugin that customers drop into their site with one line of code.

## Architecture

```
plugin-system/
├── src/
│   ├── plugin.js          # Your core logic (the actual tool)
│   ├── plugin.css          # Scoped styles
│   └── embed-loader.js     # Lightweight loader customers paste into their site
├── demo/
│   ├── index.html          # Demo page showing the plugin in action
│   └── standalone.html     # The original local HTML (before conversion)
├── dist/                   # Built/minified files for distribution
├── build.sh                # Build script
├── LICENSE
└── README.md
```

## How It Works

1. **Customer purchases** your plugin (via Gumroad, LemonSqueezy, Shopify, etc.)
2. **Customer receives** a license key + embed snippet
3. **Customer pastes** one `<script>` tag into their site
4. **Plugin loads**, validates the license, and renders itself

## Quick Start

```bash
# Build the distributable files
chmod +x plugin-system/build.sh
./plugin-system/build.sh

# Open the demo
open plugin-system/demo/index.html
```

## Customer Embed Code (what buyers paste)

```html
<div id="my-plugin"></div>
<script
  src="https://cdn.yoursite.com/plugin.min.js"
  data-license="CUSTOMER-LICENSE-KEY"
  data-container="#my-plugin"
  data-theme="light"
></script>
```

## Selling Platforms

| Platform       | Best For               | Fee         |
|----------------|------------------------|-------------|
| Gumroad        | Digital products       | 10%         |
| LemonSqueezy   | SaaS + digital         | 5% + 50¢   |
| Shopify        | Broader storefront     | varies      |
| CodeCanyon      | Code-specific audience | 37.5%       |
| Your own site  | Full control           | Stripe ~3%  |

## License Validation Options

- **Simple**: Hardcoded list of allowed domains
- **Medium**: API call to your server on load
- **Advanced**: JWT-based license keys (no server needed)
