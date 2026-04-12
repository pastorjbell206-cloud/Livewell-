import { useEffect } from "react";
import { updatePageMeta, addStructuredData, generateArticleSchema } from "@/lib/seo";

interface ArticleSEOHeadProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
  content?: string;
}

export function ArticleSEOHead({
  title,
  description,
  image,
  url,
  author = "James Bell",
  publishedDate,
  modifiedDate,
  content,
}: ArticleSEOHeadProps) {
  useEffect(() => {
    // Update meta tags
    updatePageMeta({
      title: `${title} | Livewell by James Bell`,
      description,
      image,
      url,
      type: "article",
      author,
      publishedDate,
      modifiedDate,
    });

    // Add structured data
    const schema = generateArticleSchema({
      title,
      description,
      image,
      url,
      author,
      publishedDate,
      modifiedDate,
      articleBody: content,
    });

    addStructuredData(schema);
  }, [title, description, image, url, author, publishedDate, modifiedDate, content]);

  return null;
}
