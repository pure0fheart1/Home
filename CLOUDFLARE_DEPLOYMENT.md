# Cloudflare Pages Deployment Guide

This guide will help you deploy your personal homepage to Cloudflare Pages.

## Prerequisites

1. A Cloudflare account
2. Your site connected to a GitHub repository
3. Cloudflare API Token and Account ID

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Local Development with Cloudflare

```bash
# Run local development server
npm run dev

# Preview with Cloudflare Pages locally
npm run preview

# Development with Cloudflare Workers
npm run cf:dev
```

### 3. Manual Deployment

```bash
# Build and deploy manually
npm run deploy
```

### 4. Automated Deployment via GitHub Actions

#### Required GitHub Secrets

Add these secrets to your GitHub repository settings:

- `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

#### Getting Cloudflare Credentials

1. **API Token**: 
   - Go to Cloudflare Dashboard → My Profile → API Tokens
   - Create a custom token with these permissions:
     - Zone:Zone:Read
     - Zone:Page Rule:Edit
     - Zone:Zone Settings:Edit
     - Page:Edit

2. **Account ID**:
   - Go to Cloudflare Dashboard → Right sidebar shows your Account ID

### 5. Cloudflare Pages Configuration

#### Build Settings (if setting up manually in Cloudflare Dashboard):

- **Framework preset**: Next.js (Static HTML Export)
- **Build command**: `npm run build`
- **Build output directory**: `out`
- **Root directory**: `/` (leave empty if repository root)
- **Environment variables**: None required (unless you add custom ones)

#### Domain Setup

1. In Cloudflare Pages, go to your project
2. Click "Custom domains" tab
3. Add your custom domain
4. Update your domain's nameservers to Cloudflare (if not already done)

## Available Scripts

- `npm run dev` - Local development
- `npm run build` - Build for production
- `npm run preview` - Preview Cloudflare Pages build locally
- `npm run deploy` - Manual deploy to Cloudflare Pages
- `npm run cf:dev` - Development with Cloudflare Workers
- `npm run cf:deploy` - Deploy static build to Cloudflare

## Features Enabled

✅ Static HTML Export  
✅ Optimized for Cloudflare Pages  
✅ Security headers via `_headers` file  
✅ Automatic deployments via GitHub Actions  
✅ Performance optimizations  
✅ Image optimization compatibility  

## Troubleshooting

### Build Issues

If you encounter build issues:

1. Ensure all dependencies are installed: `npm install`
2. Check that TypeScript compilation passes: `npm run type-check`
3. Verify ESLint passes: `npm run lint`

### Deployment Issues

1. Verify your Cloudflare API token has correct permissions
2. Check that your Account ID is correct
3. Ensure the project name in `wrangler.toml` matches your Cloudflare Pages project

### Performance

- Images are optimized for static export
- Security headers are configured via `_headers` file
- Caching is optimized for Cloudflare's CDN

## Custom Domain

To use a custom domain:

1. Add the domain in Cloudflare Pages dashboard
2. Update DNS records to point to Cloudflare
3. SSL certificates are automatically provisioned

Your site will be available at:
- `https://personal-homepage.pages.dev` (default)
- `https://your-custom-domain.com` (if configured)

## Next Steps

1. Push your code to GitHub
2. The GitHub Action will automatically deploy to Cloudflare Pages
3. Your site will be live within minutes!

For more advanced configurations, refer to the [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/). 