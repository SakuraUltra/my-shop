"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <p className="text-8xl font-bold text-neutral-200 dark:text-neutral-800">500</p>
      <h1 className="mt-4 text-2xl font-semibold">Something went wrong</h1>
      <p className="mt-2 max-w-md text-center text-neutral-500">
        An unexpected error occurred. Please try again later.
      </p>
      <div className="mt-8 flex gap-3">
        <button
          onClick={reset}
          className="cursor-pointer rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-lg border border-neutral-300 px-6 py-2.5 text-sm font-medium hover:border-black dark:border-neutral-600 dark:hover:border-white"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
