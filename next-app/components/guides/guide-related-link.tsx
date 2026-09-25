"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

function publishedHref(slug: string) {
  return `/guides/${slug}.html`;
}

export function GuideRelatedLink({ slug, children, className }: { slug: string; children: ReactNode; className?: string }) {
  const [href, setHref] = useState(() => publishedHref(slug));

  useEffect(() => {
    const { hostname, search } = window.location;
    const reviewHost = hostname === "localhost" || hostname === "127.0.0.1" || hostname.endsWith(".vercel.app");
    const review = reviewHost && new URLSearchParams(search).get("review") === "1";
    setHref(review ? `/guides/${slug}/?review=1` : publishedHref(slug));
  }, [slug]);

  return <Link href={href} className={className}>{children}</Link>;
}
