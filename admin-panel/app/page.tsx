'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
          Welcome to Resort Admin Panel
        </h1>
        <p className="text-xl text-white mb-12">
          Manage your resort members and subscriptions with ease
        </p>
        <Link
          href="/dashboard"
          className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition duration-300"
        >
          Access Admin Dashboard
        </Link>
      </div>
    </div>
  );
}
