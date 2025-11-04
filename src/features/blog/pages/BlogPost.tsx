import { useParams } from "react-router-dom";

export default function BlogPost() {
  const { slug } = useParams();
  return (
    <article className="prose mx-auto">
      <h1>{slug?.replace("-", " ")}</h1>
      <p>Blog post content for "{slug}".</p>
    </article>
  );
}

