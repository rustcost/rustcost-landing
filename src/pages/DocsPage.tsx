import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";

export default function DocsPage() {
  const { lng, topic } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    const files = import.meta.glob("./topics/*/*.md", { as: "raw" });

    // ✅ default to "index.md" when no topic given
    const fileKey = `./topics/${lng}/${topic ?? "index"}.md`;

    if (files[fileKey]) {
      files[fileKey]().then(setContent);
    } else {
      setContent(`# 404\nNot found for ${lng}/${topic ?? "index"}`);
    }
  }, [lng, topic]);

  return (
    <article className="prose max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
}
