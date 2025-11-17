import { useMemo } from "react";
import { useParams } from "react-router-dom";
import PageSEO from "@/shared/components/PageSEO";

export default function BlogPost() {
  type BlogParams = { ["slug"]?: string };
  const params = useParams<BlogParams>();
  const slug = params["slug"];
  const humanTitle = useMemo(() => {
    if (!slug) return "RustCost Blog";
    return slug
      .split("-")
      .map((segment) =>
        segment.length > 0
          ? segment[0].toUpperCase() + segment.slice(1).toLowerCase()
          : segment
      )
      .join(" ");
  }, [slug]);

  const fallbackTitle = slug
    ? `RustCost Blog · ${humanTitle}`
    : "RustCost Blog";
  const fallbackDescription = slug
    ? `Read "${humanTitle}" from the RustCost engineering team.`
    : "RustCost engineering article.";

  return (
    <article className="prose mx-auto">
      <PageSEO
        titleKey="seo.blog.postTitle"
        titleDefault={fallbackTitle}
        descriptionKey="seo.blog.postDescription"
        descriptionDefault={fallbackDescription}
        titleParams={{ title: humanTitle }}
        descriptionParams={{ title: humanTitle }}
      />
      <h1>{humanTitle}</h1>
      <p>
        Blog post content for "<span>{slug}</span>".
      </p>
    </article>
  );
}
