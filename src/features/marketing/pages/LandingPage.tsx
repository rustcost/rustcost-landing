export default function LandingPage() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-24">
      {/* Logo */}
      <img
        src="/logo.webp"
        alt="RustCost Logo"
        className="w-40 h-40 mb-8 drop-shadow-md rounded-full"
      />

      {/* Title */}
      <h1 className="text-5xl font-extrabold mb-4 text-gray-900 dark:text-white tracking-tight">
        RustCost
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 dark:text-gray-300 text-lg mb-10 max-w-xl">
        Lightweight open-source FinOps &amp; cost monitoring for Kubernetes.
      </p>

      {/* Coming Soon */}
      <div className="px-6 py-3 bg-yellow-400/90 text-gray-900 font-semibold rounded-full shadow-md dark:bg-yellow-500/80 dark:text-gray-900 animate-pulse">
        ?? Coming Soon 21st Dec 2025
      </div>

      {/* GitHub Link */}
      <a
        href="https://github.com/rustcost"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-white dark:text-gray-900 font-semibold px-6 py-3 rounded-full transition-colors shadow-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M12 0C5.37 0 0 5.373 0 12a12 12 0 008.207 11.385c.6.112.82-.258.82-.577v-2.024c-3.338.728-4.042-1.61-4.042-1.61-.547-1.387-1.335-1.755-1.335-1.755-1.09-.745.083-.73.083-.73 1.205.086 1.84 1.26 1.84 1.26 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.306.762-1.607-2.664-.306-5.467-1.335-5.467-5.933 0-1.311.468-2.383 1.235-3.223-.124-.305-.536-1.534.117-3.197 0 0 1.008-.323 3.3 1.23a11.5 11.5 0 016.005 0c2.29-1.553 3.296-1.23 3.296-1.23.655 1.663.243 2.892.12 3.197.77.84 1.233 1.912 1.233 3.223 0 4.61-2.807 5.624-5.479 5.924.43.372.815 1.103.815 2.222v3.293c0 .321.218.694.825.576A12 12 0 0024 12c0-6.627-5.373-12-12-12z"
            clipRule="evenodd"
          />
        </svg>
        View on GitHub
      </a>
    </section>
  );
}

