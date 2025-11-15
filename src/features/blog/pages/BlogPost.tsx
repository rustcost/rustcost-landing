import { useParams } from "react-router-dom";

export default function BlogPost() {
  type BlogParams = { ["slug"]?: string };
  const params = useParams<BlogParams>();
  const slug = params["slug"];
  return (
    <article className="prose mx-auto">
      <h1>{slug?.replace("-", " ")}</h1>
      <p>Blog post content for "{slug}".</p>
    </article>
  );
}
