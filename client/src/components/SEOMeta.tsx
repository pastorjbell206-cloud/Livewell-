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
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = 'website',
  author = 'James Bell',
  publishedDate,
  modifiedDate,
  structuredData,
}: SEOMetaProps) {
  // Update document title
  if (typeof document !== 'undefined') {
    document.title = `${title} | Livewell by James Bell`;
  }

  // Update meta tags
  const updateMeta = (name: string, content: string) => {
    let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
    if (!element) {
      element = document.createElement('meta');
      element.name = name;
      document.head.appendChild(element);
    }
    element.content = content;
  };

  const updateProperty = (property: string, content: string) => {
    let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute('property', property);
      document.head.appendChild(element);
    }
    element.content = content;
  };

  if (typeof document !== 'undefined') {
    // Standard meta tags
    updateMeta('description', description);
    if (keywords) updateMeta('keywords', keywords);
    updateMeta('author', author);

    // Open Graph
    updateProperty('og:title', title);
    updateProperty('og:description', description);
    updateProperty('og:image', image);
    updateProperty('og:url', url);
    updateProperty('og:type', type);

    // Twitter Card
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);

    // Structured Data
    if (structuredData) {
      let scriptElement = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.type = 'application/ld+json';
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(structuredData);
    }
  }

  return null;
}

// Helper function to generate Organization structured data
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Livewell by James Bell',
    description: 'Prophetic disruption, theological depth, and integrated faith for American Christianity',
    url: 'https://livewell.manus.space',
    logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/hero-study-YwtdpEbWhEmpeN5eiD8U69.webp',
    sameAs: ['https://substack.com/@jamesbell333289', 'https://pastorsconnectionnetwork.com/'],
    author: {
      '@type': 'Person',
      name: 'James Bell',
    },
  };
}

// Helper function to generate BlogPosting structured data
export function getBlogPostingSchema(
  title: string,
  description: string,
  publishedDate: string,
  modifiedDate?: string,
  image?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: image,
    datePublished: publishedDate,
    dateModified: modifiedDate || publishedDate,
    author: {
      '@type': 'Person',
      name: 'James Bell',
    },
  };
}

// Helper function to generate Book structured data
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
