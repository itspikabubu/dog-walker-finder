"use client";

import { useState, useMemo } from "react";
import { Walker } from "../types";

type SortKey = "rating" | "reviews" | "price";

const PLATFORM_COLORS: Record<string, string> = {
  Yelp: "bg-red-500",
  Rover: "bg-green-600",
  "Care.com": "bg-blue-500",
  "Google Maps": "bg-yellow-500 text-black",
};

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-500">
      {Array.from({ length: fullStars }, (_, i) => (
        <span key={i}>&#9733;</span>
      ))}
      {hasHalf && <span>&#9734;</span>}
      <span className="ml-1 text-warm-700 font-semibold text-sm">
        {rating.toFixed(1)}
      </span>
    </span>
  );
}

function meetsAllCriteria(w: Walker): boolean {
  return (
    w.rating >= 4.8 &&
    (w.reviewCount ?? 0) > 50 &&
    w.pricePerWalk !== null &&
    w.pricePerWalk < 60
  );
}

function WalkerCard({ walker }: { walker: Walker }) {
  const isTop = meetsAllCriteria(walker);
  return (
    <div
      className={`relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow border ${
        isTop ? "border-accent ring-2 ring-accent/30" : "border-warm-200"
      } overflow-hidden flex flex-col`}
    >
      {isTop && (
        <div className="bg-accent text-white text-xs font-bold px-3 py-1 text-center tracking-wide uppercase">
          Top Pick
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-bold text-lg text-warm-900 leading-tight">
            {walker.name}
          </h3>
          <span
            className={`shrink-0 text-xs font-semibold px-2 py-1 rounded-full text-white ${
              PLATFORM_COLORS[walker.platform] || "bg-gray-500"
            }`}
          >
            {walker.platform}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <StarRating rating={walker.rating} />
          {walker.reviewCount !== null && (
            <span className="text-sm text-warm-500">
              ({walker.reviewCount} reviews)
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-accent-dark font-bold text-lg">
            {walker.priceDisplay}
          </span>
        </div>

        <p className="text-warm-500 text-sm mb-3 flex items-center gap-1">
          <svg
            className="w-4 h-4 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {walker.location}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {walker.services.slice(0, 4).map((s) => (
            <span
              key={s}
              className="bg-warm-100 text-warm-700 text-xs px-2 py-0.5 rounded-full"
            >
              {s}
            </span>
          ))}
          {walker.services.length > 4 && (
            <span className="text-warm-400 text-xs px-2 py-0.5">
              +{walker.services.length - 4} more
            </span>
          )}
        </div>

        <blockquote className="text-sm text-warm-600 italic border-l-2 border-accent-light pl-3 mb-4 flex-1">
          {walker.highlight}
        </blockquote>

        <a
          href={walker.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto block text-center bg-warm-700 hover:bg-warm-800 text-white font-semibold py-2.5 px-4 rounded-xl transition-colors"
        >
          View Profile
        </a>
      </div>
    </div>
  );
}

export default function WalkerGrid({ walkers }: { walkers: Walker[] }) {
  const [sortBy, setSortBy] = useState<SortKey>("rating");
  const [filterRating, setFilterRating] = useState(false);
  const [filterReviews, setFilterReviews] = useState(false);
  const [filterPrice, setFilterPrice] = useState(false);

  const filtered = useMemo(() => {
    let result = [...walkers];

    if (filterRating) result = result.filter((w) => w.rating > 4.8);
    if (filterReviews)
      result = result.filter((w) => (w.reviewCount ?? 0) > 50);
    if (filterPrice)
      result = result.filter(
        (w) => w.pricePerWalk !== null && w.pricePerWalk < 60
      );

    result.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating || (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
        case "reviews":
          return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
        case "price":
          return (a.pricePerWalk ?? 999) - (b.pricePerWalk ?? 999);
      }
    });

    return result;
  }, [walkers, sortBy, filterRating, filterReviews, filterPrice]);

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-sm border border-warm-200 p-4 sm:p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-warm-700">
              Filters:
            </span>
            <button
              onClick={() => setFilterRating(!filterRating)}
              className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                filterRating
                  ? "bg-accent text-white border-accent"
                  : "bg-warm-50 text-warm-600 border-warm-200 hover:border-warm-400"
              }`}
            >
              Rating &gt;4.8
            </button>
            <button
              onClick={() => setFilterReviews(!filterReviews)}
              className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                filterReviews
                  ? "bg-accent text-white border-accent"
                  : "bg-warm-50 text-warm-600 border-warm-200 hover:border-warm-400"
              }`}
            >
              Reviews &gt;50
            </button>
            <button
              onClick={() => setFilterPrice(!filterPrice)}
              className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                filterPrice
                  ? "bg-accent text-white border-accent"
                  : "bg-warm-50 text-warm-600 border-warm-200 hover:border-warm-400"
              }`}
            >
              Price &lt;$60
            </button>
          </div>

          <div className="flex items-center gap-2 sm:ml-auto">
            <span className="text-sm font-semibold text-warm-700">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="text-sm bg-warm-50 border border-warm-200 rounded-lg px-3 py-1.5 text-warm-700 focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              <option value="rating">Rating</option>
              <option value="reviews">Reviews</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-warm-400">
          <p className="text-xl mb-2">No walkers match your filters</p>
          <p className="text-sm">Try adjusting your filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((walker) => (
            <WalkerCard key={walker.id} walker={walker} />
          ))}
        </div>
      )}

      <p className="text-center text-warm-400 text-sm mt-6">
        Showing {filtered.length} of {walkers.length} walkers
      </p>
    </div>
  );
}
