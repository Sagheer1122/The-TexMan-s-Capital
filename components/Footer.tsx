import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#010814] border-t border-emerald-500/20 text-gray-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-[#00C853] flex items-center justify-center text-slate-950 font-black text-lg">
                T
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                The TaxMan&apos;s <span className="text-[#00C853]">Capital</span>
              </span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Pakistan&apos;s premier platform dedicated exclusively to Chartered Accountancy (CA), ACCA, and Finance career growth.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Portals & Hubs</h4>
            <ul className="space-y-2">
              <li><Link href="/jobs" className="hover:text-emerald-400 transition-colors">Articleship Vacancies</Link></li>
              <li><Link href="/jobs/overseas" className="hover:text-emerald-400 transition-colors">Overseas Opportunities</Link></li>
              <li><Link href="/resources" className="hover:text-emerald-400 transition-colors">CAF & ACCA Notes</Link></li>
              <li><Link href="/counseling" className="hover:text-emerald-400 transition-colors">1-on-1 Mentorship</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">AI & Community</h4>
            <ul className="space-y-2">
              <li><Link href="/tools" className="hover:text-emerald-400 transition-colors">AI Interview Simulator</Link></li>
              <li><Link href="/community" className="hover:text-emerald-400 transition-colors">WhatsApp Groups</Link></li>
              <li><Link href="/events" className="hover:text-emerald-400 transition-colors">Webinars & Events</Link></li>
              <li><Link href="/podcasts" className="hover:text-emerald-400 transition-colors">Career Podcasts</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Platform Mentors</h4>
            <p className="text-gray-400 text-xs leading-relaxed mb-2">
              Led by Saboor Ahmad CA, Usman Saleem CA/CFA, Hassan Raza CA/ACCA & Ali Iqbal ACCA.
            </p>
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold text-[11px]">
              100% Free Career Support
            </span>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-gray-500">
          <p>© {new Date().getFullYear()} The TaxMan&apos;s Capital. All rights reserved.</p>
          <div className="flex space-x-4 mt-3 sm:mt-0">
            <span className="text-emerald-400">Enterprise Security Enabled</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
