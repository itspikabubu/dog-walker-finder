import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dog Walker Finder | Top Dog Walkers near San Ramon, CA 94582",
  description:
    "Find the best dog walkers near San Ramon, CA 94582. Compare ratings, reviews, prices, and services from Yelp, Rover, Care.com, and Google Maps.",
  keywords: "dog walker, San Ramon, CA, pet care, dog walking, pet sitting",
  openGraph: {
    title: "Dog Walker Finder | San Ramon, CA",
    description:
      "Find the best dog walkers near San Ramon, CA 94582. Compare ratings, reviews, and prices.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
