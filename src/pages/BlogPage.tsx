import { Link } from "react-router-dom";

export default function BlogPage() {
  const posts = [
    { slug: "v1-launch", title: "RustCost v1 Launch" },
    { slug: "lightweight-finops", title: "How RustCost Optimizes FinOps" },
  ];

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">RustCost Blog</h2>
      <ul className="space-y-2">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              to={`/blog/${p.slug}`}
              className="text-blue-600 hover:underline"
            >
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
