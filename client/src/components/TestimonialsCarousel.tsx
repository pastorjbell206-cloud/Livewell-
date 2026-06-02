import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: testimonialsData } = trpc.community.testimonials.getFeatured.useQuery();

  const testimonials = testimonialsData?.testimonials || [];

  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (testimonials.length === 0) {
    return null;
  }

  const current = testimonials[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: "#2C3E50" }}>
      <div className="container max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className="font-display text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "var(--bone)" }}
          >
            What Readers Say
          </h2>
          <div
            className="w-16 h-1 mx-auto"
            style={{ backgroundColor: "var(--mustard)" }}
          />
        </div>

        {/* Testimonial Card */}
        <div
          className="relative p-8 md:p-12 rounded-lg"
          style={{ backgroundColor: "var(--charcoal)" }}
        >
          {/* Quote Icon */}
          <Quote
            size={48}
            style={{ color: "var(--mustard)", opacity: 0.3 }}
            className="mb-4"
          />

          {/* Testimonial Content */}
          <p
            className="font-body text-lg md:text-xl leading-relaxed mb-8"
            style={{ color: "var(--bone)" }}
          >
            "{current.content}"
          </p>

          {/* Author */}
          <div className="flex items-center gap-4">
            {current.imageUrl && (
              <img
                src={current.imageUrl}
                alt={current.authorName}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            <div>
              <div
                className="font-semibold"
                style={{ color: "var(--bone)" }}
              >
                {current.authorName}
              </div>
              {current.authorRole && (
                <div
                  className="text-sm"
                  style={{ color: "var(--mustard)" }}
                >
                  {current.authorRole}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8">
            <button
              onClick={goToPrevious}
              className="p-2 rounded-full transition-colors"
              style={{
                backgroundColor: "var(--mustard)",
                color: "var(--ink)",
              }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goToNext}
              className="p-2 rounded-full transition-colors"
              style={{
                backgroundColor: "var(--mustard)",
                color: "var(--ink)",
              }}
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="w-2 h-2 rounded-full transition-all"
                style={{
                  backgroundColor: index === currentIndex ? "var(--mustard)" : "var(--ink-muted)",
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Counter */}
        <div
          className="text-center mt-8 text-sm"
          style={{ color: "var(--mustard)" }}
        >
          {currentIndex + 1} / {testimonials.length}
        </div>
      </div>
    </section>
  );
}
