import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

export function ReaderTestimonials() {
  const testimonials: Testimonial[] = [
    {
      name: "Pastor David Chen",
      role: "Senior Pastor, Grace Community Church",
      text: "James Bell's writing has transformed how I think about pastoral leadership. His theological depth combined with practical wisdom is rare.",
      rating: 5,
    },
    {
      name: "Dr. Sarah Martinez",
      role: "Ministry Director",
      text: "The reading paths have been invaluable for our leadership development program. Highly recommended for anyone serious about Christian formation.",
      rating: 5,
    },
    {
      name: "Rev. Michael Thompson",
      role: "Church Planter",
      text: "Finally, someone addressing the real issues facing American Christianity. This site is a breath of fresh air.",
      rating: 5,
    },
  ];

  return (
    <section className="py-12">
      <h3 className="font-display font-bold text-2xl mb-8 text-center" style={{ color: "#1A1A1A" }}>
        What Readers Are Saying
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="p-6 rounded-lg border bg-white hover:shadow-lg transition-shadow"
            style={{ borderColor: "#D1C9BB" }}
          >
            {/* Rating */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} size={16} fill="#B8963E" style={{ color: "#B8963E" }} />
              ))}
            </div>

            {/* Testimonial text */}
            <p className="mb-4 italic" style={{ color: "#6B7280" }}>
              "{testimonial.text}"
            </p>

            {/* Author */}
            <div>
              <p className="font-bold" style={{ color: "#1A1A1A" }}>
                {testimonial.name}
              </p>
              <p className="text-sm" style={{ color: "#6B7280" }}>
                {testimonial.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
