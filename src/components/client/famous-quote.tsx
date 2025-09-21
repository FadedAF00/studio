'use client';
import { useEffect, useState } from 'react';
import { getRandomQuote, type RandomQuoteOutput } from '@/ai/flows/famous-quote';
import { Skeleton } from '@/components/ui/skeleton';

export function FamousQuote() {
  const [quote, setQuote] = useState<RandomQuoteOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRandomQuote()
      .then(setQuote)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex w-full flex-col items-center space-y-2 p-4 text-center">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-5 w-1/4" />
      </div>
    );
  }

  if (!quote) return null;

  return (
    <figure className="max-w-prose p-4 text-center">
      <blockquote className="text-lg italic text-foreground">
        <p>&ldquo;{quote.quote}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-2 text-sm text-accent">
        &mdash; {quote.author}
      </figcaption>
    </figure>
  );
}
