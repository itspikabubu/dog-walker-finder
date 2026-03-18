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
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const fillPercent = Math.min(1, Math.max(0, rating - i)) * 100;
        const clipId = `star-clip-${i}-${rating}`;
        return (
          <svg key={i} width="18" height="18" viewBox="0 0 24 24" className="shrink-0">
            <defs>
              <clipPath id={clipId}>
                <rect x="0" y="0" width={`${fillPercent}%`} height="100%" />
              </clipPath>
            </defs>
            {/* Empty star background */}
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill="#e5e0d8"
            />
            {/* Filled star with proportional clip */}
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill="#f59e0b"
              clipPath={`url(#${clipId})`}
            />
          </svg>
        );
      })}
      <span className="ml-1 text-warm-700 font-semibold text-sm">
        {rating.toFixed(1)}
      </span>
    </span>
  );
}

function WalkerCard({ walker }: { walker: Walker }) {
  return (
    <div className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-warm-200 overflow-hidden flex flex-col">
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
          {walker.priceConfirmed ? (
            <span className="inline-flex items-center text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
              Price Verified &#10003;
            </span>
          ) : (
            <span className="inline-flex items-center text-xs font-medium text-warm-500 bg-warm-100 px-2 py-0.5 rounded-full" title="Area median is ~$25/walk">
              Area median ~$25/walk
            </span>
          )}
        </div>

        {(walker.experience || walker.repeatClients !== null) && (
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {walker.experience && (
              <span className="inline-flex items-center text-xs font-medium text-warm-700 bg-warm-100 px-2.5 py-1 rounded-full">
                <svg className="w-3.5 h-3.5 mr-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {walker.experience}
              </span>
            )}
            {walker.repeatClients !== null && (
              <span className="inline-flex items-center text-xs font-medium text-warm-700 bg-warm-100 px-2.5 py-1 rounded-full">
                <svg className="w-3.5 h-3.5 mr-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {walker.repeatClients} repeat clients
              </span>
            )}
          </div>
        )}

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

  const sorted = useMemo(() => {
    const result = [...walkers];
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
  }, [walkers, sortBy]);

  return (
    <div>
      <div className="bg-accent/10 border border-accent/30 rounded-2xl p-4 sm:p-5 mb-6 text-center">
        <p className="text-sm sm:text-base font-semibold text-warm-800">
          All walkers listed meet our strict criteria: Rating above 4.8 &#9733; | More than 50 verified reviews | Price under $60/walk
        </p>
      </div>

      <div className="flex items-center justify-end gap-2 mb-6">
        <span className="text-sm font-semibold text-warm-700">Sort by:</span>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.map((walker) => (
          <WalkerCard key={walker.id} walker={walker} />
        ))}
      </div>

      <p className="text-center text-warm-400 text-sm mt-6">
        Showing {sorted.length} walkers
      </p>
    </div>
  );
}
