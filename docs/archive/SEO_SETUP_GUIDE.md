# LiveWell SEO Setup Guide

## Overview
This guide walks you through setting up SEO infrastructure for LiveWell to ensure maximum visibility in search engines.

## ✅ Already Configured

### 1. Sitemap
- **Location**: `/client/public/sitemap.xml`
- **Status**: ✅ Generated automatically
- **Contains**: 22 articles, 26 books, 7 reading paths, 7 static pages
- **Update**: Run `node generate-sitemap.mjs` after publishing new content

### 2. Robots.txt
- **Location**: `/client/public/robots.txt`
- **Status**: ✅ Configured
- **Features**: Allows all crawlers, blocks admin/API routes, includes sitemap reference

### 3. Meta Tags
- **Location**: `client/src/components/SEOMeta.tsx`
- **Status**: ✅ Implemented
- **Includes**: Open Graph, Twitter Card, JSON-LD structured data

---

## 🔧 Next Steps: Google Search Console Setup

### Step 1: Verify Domain Ownership
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add property"
3. Enter your domain: `thelivewell.manus.space`
4. Choose "URL prefix" method
5. Follow verification steps (typically DNS or HTML file)

### Step 2: Submit Sitemap
1. In Search Console, go to "Sitemaps"
2. Click "Add/test sitemap"
3. Enter: `https://thelivewell.manus.space/sitemap.xml`
4. Click "Submit"

### Step 3: Monitor Indexing
- Check "Coverage" report to see which pages are indexed
- Fix any errors or warnings
- Monitor "Core Web Vitals" for performance

---

## 📊 Google Analytics Setup

### Step 1: Create Analytics Property
1. Go to [Google Analytics](https://analytics.google.com)
2. Create new property for `thelivewell.manus.space`
3. Get your Measurement ID (looks like `G-XXXXXXXXXX`)

### Step 2: Add to Website
The analytics tracking is already configured in your environment:
- **Variable**: `VITE_ANALYTICS_WEBSITE_ID`
- **Location**: `client/src/main.tsx` (via Manus platform)

---

## 🎯 SEO Best Practices

### Article Optimization
Each article should have:
- ✅ **Title**: Clear, keyword-rich (50-60 characters)
- ✅ **Meta Description**: 150-160 characters, includes main keyword
- ✅ **Excerpt**: 150-200 words, compelling
- ✅ **Cover Image**: 1200x630px for social sharing
- ✅ **Internal Links**: 2-3 links to related articles
- ✅ **Reading Time**: Automatically calculated

### Keywords to Target
Based on your content analysis, focus on:
- "Pastor burnout"
- "Church leadership"
- "Pastoral ministry"
- "Spiritual formation"
- "Church conflict resolution"
- "Pastoral care"
- "Ministry challenges"

### Content Strategy
1. **Cornerstone Articles** (22 published): Comprehensive, 2000+ words
2. **Pillar Pages**: Topic clusters around main themes
3. **Internal Linking**: Connect related articles
4. **Fresh Content**: Publish 2-3 new articles monthly

---

## 📋 Monthly SEO Checklist

- [ ] Run `node generate-sitemap.mjs` after new publications
- [ ] Check Google Search Console for errors
- [ ] Monitor top performing articles in Analytics
- [ ] Update meta descriptions if needed
- [ ] Check for broken internal links
- [ ] Verify all images have alt text
- [ ] Review Core Web Vitals score

---

## 🔗 Important Links

- **Google Search Console**: https://search.google.com/search-console
- **Google Analytics**: https://analytics.google.com
- **Manus Platform Settings**: Check your project settings for analytics configuration

---

## 📞 Support

For questions about SEO setup or implementation, refer to:
- Google Search Console Help: https://support.google.com/webmasters
- Google Analytics Help: https://support.google.com/analytics
- Manus Documentation: Check your project dashboard
