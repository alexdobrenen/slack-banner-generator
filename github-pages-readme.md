# GitHub Pages Deployment Guide

This project is configured for deployment on GitHub Pages.

## Deployment Configuration

- Base URL is set to `/slack-banner-generator/` in `vite.config.ts`
- GitHub Actions workflow is configured in `.github/workflows/deploy.yml`
- Jekyll processing is disabled with `.nojekyll` file in the public directory

## Deployment Steps

1. Push changes to the main branch
2. GitHub Actions will build and deploy the site
3. Site will be available at `https://[your-github-username].github.io/slack-banner-generator/`