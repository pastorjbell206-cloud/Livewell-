/**
 * SEO Meta Tags Component
 * Manages all meta tags, Open Graph, Twitter Card, and structured data for each page
 */
interface SEOMetaProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'book';
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
  structuredData?: Record<string, unknown>;
}

export function SEOMeta({
  title,
  description,
  keywords,
  image = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/hero-study-YwtdpEbWhEmpeN5eiD8U69.webp',
  url = typeof window !== 'undefined' ? window.location.href : 'https://livewellbyjamesbell.com',
  type = 'website',
  author = 'James Bell',
  publishedDate,
  modifiedDate,
  structuredData,
}: SEOMetaProps) {
  // Build full title
  const fullTitle = title.includes('LiveWell by James Bell') ? title : title + ' | LiveWell by James Bell';

  // Update document title
  if (typeof document !== 'undefined') {
    document.title = fullTitle;
  }

  // Update meta tags
  const updateMeta = (name: string, content: string) => {
    if (typeof document === 'undefined') return;
    let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
    if (!element) {
      element = document.createElement('meta');
      element.name = name;
      document.head.appendChild(element);
    }
    element.content = content;
  };

  const updateProperty = (property: string, content: string) => {
    if (typeof document === 'undefined') return;
    let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute('property', property);
      document.head.appendChild(element);
    }
    element.content = content;
  };

  // Update canonical URL
  const updateCanonical = (href: string) => {
    if (typeof document === 'undefined') return;
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = href;
  };

  if (typeof document !== 'undefined') {
    // Standard meta tags
    updateMeta('description', description);
    if (keywords) updateMeta('keywords', keywords);
    updateMeta('author', author);
    if (publishedDate) updateMeta('article:published_time', publishedDate);
    if (modifiedDate) updateMeta('article:modified_time', modifiedDate);

    // Open Graph — use CURRENT page URL, not hardcoded homepage
    const currentUrl = typeof window !== 'undefined' ? window.location.href : url;
    updateProperty('og:title', title);
    updateProperty('og:description', description);
    updateProperty('og:image', image);
    updateProperty('og:url', currentUrl);
    updateProperty('og:type', type);
    updateProperty('og:site_name', 'LiveWell by James Bell');

    // Twitter Card
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);

    // Canonical URL
    updateCanonical(currentUrl);

    // Structured Data
    if (structuredData) {
      // Find existing or create new script for this page
      let scriptElement = document.querySelector('script[type="application/ld+json"][data-seo="page"]') as HTMLScriptElement;
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.type = 'application/ld+json';
        scriptElement.setAttribute('data-seo', 'page');
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(structuredData);
    }
  }

  return null;
}

// Helper: Person schema for James Bell
export function getPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'James Bell',
    url: 'https://livewellbyjamesbell.com',
    jobTitle: 'Lead Pastor, Author, Founder',
    description: 'Lead Teaching Pastor at First Baptist Church of Fenton, author of 25 books, and founder of the Pastors Connection Network.',
    sameAs: [
      'https://pastorsconnectionnetwork.com',
      'https://substack.com/@jamesbell333289',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'First Baptist Church of Fenton',
    },
  };
}

// Helper: WebSite schema
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'LiveWell by James Bell',
    url: 'https://livewellbyjamesbell.com',
    description: 'Theology that actually works. 880+ essays on faith, marriage, justice, pastoral ministry, and the Christian life.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://livewellbyjamesbell.com/writing?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}

// Helper: Article schema
export function getArticleSchema(
  title: string,
  description: string,
  publishedDate: string,
  modifiedDate?: string,
  image?: string,
  url?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image,
    url: url || (typeof window !== 'undefined' ? window.location.href : ''),
    datePublished: publishedDate,
    dateModified: modifiedDate || publishedDate,
    author: {
      '@type': 'Person',
      name: 'James Bell',
      url: 'https://livewellbyjamesbell.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'LiveWell by James Bell',
      logo: {
        '@type': 'ImageObject',
        url: 'https://livewellbyjamesbell.com/favicon.svg',
      },
    },
  };
}

// Helper: Book schema
export function getBookSchema(title: string, description: string, author: string = 'James Bell', image?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: title,
    description: description,
    author: {
      '@type': 'Person',
      name: author,
    },
    image: image,
  };
}

// Legacy alias
export function getOrganizationSchema() { return getWebSiteSchema(); }
export function getBlogPostingSchema(title: string, description: string, publishedDate: string, modifiedDate?: string, image?: string) {
  return getArticleSchema(title, description, publishedDate, modifiedDate, image);
}
