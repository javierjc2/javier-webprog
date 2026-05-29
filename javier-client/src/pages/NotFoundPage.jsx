import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      
      <div className="w-full max-w-md rounded-2xl border-2 border-zinc-800 bg-zinc-900 p-8 text-center shadow-sm">
        
        <h1 className="text-6xl font-bold text-white">
          404
        </h1>

        <h2 className="mt-3 text-2xl font-semibold text-zinc-100">
          Page Not Found
        </h2>

        <p className="mt-4 text-sm leading-6 text-zinc-400">
          The page you are looking for may have been removed,
          renamed, or is temporarily unavailable.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-zinc-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-600"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;