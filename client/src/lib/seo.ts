/**
 * SEO utilities for generating meta tags and structured data
 */

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "article" | "website" | "profile";
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
}

/**
 * Generate meta tags for a page
 */
export function generateMetaTags(meta: SEOMetadata): Record<string, string> {
  return {
    "og:title": meta.title,
    "og:description": meta.description,
    "og:type": meta.type || "website",
    ...(meta.image && { "og:image": meta.image }),
    ...(meta.url && { "og:url": meta.url }),
    "twitter:title": meta.title,
    "twitter:description": meta.description,
    ...(meta.image && { "twitter:image": meta.image }),
    "twitter:card": "summary_large_image",
  };
}

/**
 * Generate structured data (JSON-LD) for articles
 */
export function generateArticleSchema(meta: SEOMetadata & { articleBody?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: meta.title,
    description: meta.description,
    image: meta.image,
    datePublished: meta.publishedDate,
    dateModified: meta.modifiedDate,
    author: {
      "@type": "Person",
      name: meta.author || "James Bell",
    },
    publisher: {
      "@type": "Organization",
      name: "Livewell by James Bell",
      logo: {
        "@type": "ImageObject",
        url: "https://livewell.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": meta.url,
    },
  };
}

/**
 * Generate structured data for organization
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Livewell by James Bell",
    url: "https://livewell.com",
    logo: "https://livewell.com/logo.png",
    description: "Essays on faith, culture, and the Christian life",
    sameAs: [
      "https://twitter.com/jamesbell",
      "https://www.facebook.com/jamesbell",
      "https://www.instagram.com/jamesbell",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "contact@livewell.com",
    },
  };
}

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Update page title and meta tags
 */
export function updatePageMeta(meta: SEOMetadata) {
  // Update title
  document.title = meta.title;

  // Update or create meta tags
  const metaTags = generateMetaTags(meta);
  Object.entries(metaTags).forEach(([name, content]) => {
    let element = document.querySelector(`meta[property="${name}"]`);
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute("property", name);
      document.head.appendChild(element);
    }
    element.setAttribute("content", content);
  });

  // Update canonical URL
  let canonical = document.querySelector("link[rel='canonical']");
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", meta.url || window.location.href);
}

/**
 * Add structured data to page
 */
export function addStructuredData(schema: any) {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}
