import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "The TaxMan's Capital | CA, ACCA & Finance Career Platform",
  description: "Pakistan's premier platform for CA & ACCA students. Verified Big 4 & corporate articleship inductions, free 1-on-1 mentorship, past papers, and AI career tools.",
  openGraph: {
    title: "The TaxMan's Capital | CA & ACCA Career & Learning Platform",
    description: "Verified articleship jobs, past paper resources, free career counseling, and AI interview simulators.",
    url: 'https://taxmancapital.com',
    siteName: "The TaxMan's Capital",
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F8FAFC] text-[#111827] min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
