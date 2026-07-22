import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="p-8 rounded-3xl bg-[#011126] border border-emerald-500/20 text-center max-w-md w-full space-y-4 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
        <div className="text-6xl font-black text-[#00C853]">404</div>
        <h2 className="text-xl font-bold text-white">Page Not Found</h2>
        <p className="text-xs text-gray-300">
          The page or resource you are looking for does not exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#00C853] hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors mt-2"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
