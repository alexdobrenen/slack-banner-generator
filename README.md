# Slackmoji Banner Generator

A React web application for creating custom Slack emoji banners and copying them to the clipboard.

<img width="600" height="600" alt="slackmoji-banner-generator" src="https://github.com/user-attachments/assets/f4d2814e-0b8b-4dcc-a800-a23161bf2368" />

## Live Demo

Try it out: [Slackmoji Banner Generator](https://alexdobrenen.github.io/slack-banner-generator/)

## Features

- Generate ASCII art banners with custom text
- Use any Slack emoji for text characters
- Use any Slack emoji for banner background
- Live preview of how the banner will look
- Copy the generated banner to clipboard with one click
- Responsive design that works on desktop and mobile

## How to Use

1. Enter the text you want to convert to a banner
2. Enter the emoji name (without colons) to use for text characters (e.g., `party_parrot`)
3. Enter the emoji name (without colons) to use for background (e.g., `black_large_square`)
4. Click "Generate Banner"
5. Copy the generated banner to clipboard using the "Copy to Clipboard" button
6. Paste the banner into Slack

## Technology Stack

This project is built with:
- React 19
- TypeScript
- Vite
- Figlet (for ASCII art generation)
- Styled Components (for styling)

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/alexdobrenen/slack-banner-generator.git
cd slack-banner-generator

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Deployment

This project is deployed using GitHub Pages with an automated GitHub Actions workflow:

- The site is automatically deployed when changes are pushed to the `main` branch
- GitHub Actions builds the project and publishes it to GitHub Pages
- The live site is available at [https://alexdobrenen.github.io/slack-banner-generator/](https://alexdobrenen.github.io/slack-banner-generator/)

### Deployment Configuration

- Base URL is set to `/slack-banner-generator/` in `vite.config.ts`
- GitHub Actions workflow is configured in `.github/workflows/deploy.yml`
- Jekyll processing is disabled with `.nojekyll` file in the public directory

## Origin

This project is a web implementation of a shell script that generated Slack emoji banners using figlet.

## License

MIT