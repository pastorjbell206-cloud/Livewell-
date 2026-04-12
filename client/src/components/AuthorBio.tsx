import { Mail, ExternalLink } from "lucide-react";

interface AuthorBioProps {
  author: string;
  bio?: string;
  image?: string;
  email?: string;
  website?: string;
}

export function AuthorBio({ author, bio, image, email, website }: AuthorBioProps) {
  const isJamesBell = author.toLowerCase().includes("james") && author.toLowerCase().includes("bell");
  
  const defaultBio = isJamesBell
    ? "James Bell is the founder of LiveWell and writes on faith, culture, and the Christian life. He leads from the conviction that behavior modification was never the point—heart transformation is."
    : "Contributed to the Pastors Connection Network";

  const defaultImage = isJamesBell
    ? "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/james-bell-profile.jpg"
    : undefined;

  return (
    <div className="bg-white rounded-lg border p-8 my-12" style={{ borderColor: "#D1C9BB" }}>
      <div className="flex gap-6 items-start">
        {/* Author image */}
        {(image || defaultImage) && (
          <img
            src={image || defaultImage}
            alt={author}
            className="w-20 h-20 rounded-full object-cover flex-shrink-0"
          />
        )}

        {/* Author info */}
        <div className="flex-1">
          <h3 className="font-display font-bold text-lg mb-2" style={{ color: "#1A1A1A" }}>
            {author}
          </h3>
          
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#6B7280" }}>
            {bio || defaultBio}
          </p>

          {/* Contact links */}
          <div className="flex flex-wrap gap-4 text-sm">
            {email && (
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 font-medium transition-colors hover:opacity-75"
                style={{ color: "#B8963E" }}
              >
                <Mail size={16} />
                Email
              </a>
            )}
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium transition-colors hover:opacity-75"
                style={{ color: "#B8963E" }}
              >
                <ExternalLink size={16} />
                Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
