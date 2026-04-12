import { useEffect, useState } from "react";

interface ArticleReadingProgressProps {
  articleId: string;
}

export function ArticleReadingProgress({ articleId }: ArticleReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector("article");
      if (!article) return;

      const articleRect = article.getBoundingClientRect();
      const articleHeight = article.scrollHeight;
      const windowHeight = window.innerHeight;

      // Calculate progress as percentage of article scrolled
      const scrolled = Math.max(0, -articleRect.top);
      const totalScroll = articleHeight - windowHeight;
      const progressPercent = Math.min(100, (scrolled / totalScroll) * 100);

      setProgress(progressPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [articleId]);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50" style={{ backgroundColor: "#D1C9BB" }}>
      <div
        className="h-full transition-all duration-300"
        style={{
          backgroundColor: "#B8963E",
          width: `${progress}%`,
        }}
      />
    </div>
  );
}
