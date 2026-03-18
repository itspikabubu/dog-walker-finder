import data from "../data.json";
import { WalkerData } from "../types";
import WalkerGrid from "./WalkerGrid";

const walkerData = data as WalkerData;

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-warm-800 via-warm-700 to-paw text-white py-10 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-4xl">🐾</span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Dog Walker Finder
            </h1>
            <span className="text-4xl">🐾</span>
          </div>
          <p className="text-warm-200 text-lg">
            Top Dog Walkers near San Ramon, CA 94582
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <WalkerGrid walkers={walkerData.walkers} />
      </main>

      <footer className="bg-warm-800 text-warm-200 py-6 px-4">
        <div className="max-w-6xl mx-auto text-center text-sm space-y-1">
          <p>Last updated: March 17, 2026</p>
          <p className="text-warm-300">
            Data sourced from Yelp, Rover, Care.com, and Google Maps. Ratings
            and prices may have changed since last update.
          </p>
        </div>
      </footer>
    </div>
  );
}
