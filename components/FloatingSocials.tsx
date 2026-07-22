'use client';

import { useState } from 'react';
import { Phone, Mail, MessageSquare, Globe, ChevronLeft, ChevronRight, Send } from 'lucide-react';

export default function FloatingSocials() {
  const [collapsed, setCollapsed] = useState(false);

  const socials = [
    {
      name: 'WhatsApp Community',
      icon: <MessageSquare className="w-5 h-5 text-emerald-400" />,
      href: 'https://chat.whatsapp.com/sample-taxman-group',
      bg: 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30 text-emerald-300',
    },
    {
      name: 'Discord Peer Channel',
      icon: <Globe className="w-5 h-5 text-indigo-400" />,
      href: 'https://discord.gg/taxmancapital',
      bg: 'bg-indigo-500/10 hover:bg-indigo-500/20 border-indigo-500/30 text-indigo-300',
    },
    {
      name: 'Mentorship Helpline',
      icon: <Phone className="w-5 h-5 text-amber-400" />,
      href: 'tel:+923001234567',
      bg: 'bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30 text-amber-300',
    },
    {
      name: 'Official Email',
      icon: <Mail className="w-5 h-5 text-cyan-400" />,
      href: 'mailto:contact@taxmancapital.com',
      bg: 'bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/30 text-cyan-300',
    },
  ];

  return (
    <div
      className={`fixed top-1/2 -translate-y-1/2 left-4 z-40 transition-all duration-300 ${
        collapsed ? '-translate-x-14' : 'translate-x-0'
      }`}
    >
      <div className="flex items-center">
        <div className="flex flex-col space-y-2 bg-[#011126]/90 backdrop-blur-md p-2.5 rounded-2xl border border-emerald-500/20 shadow-[0_0_25px_rgba(0,200,83,0.15)]">
          {socials.map((s, idx) => (
            <a
              key={idx}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              title={s.name}
              className={`p-2.5 rounded-xl border transition-all duration-200 hover:scale-110 flex items-center justify-center ${s.bg}`}
            >
              {s.icon}
            </a>
          ))}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-1.5 p-1 bg-[#011126]/80 hover:bg-[#011126] text-emerald-400 rounded-r-lg border border-l-0 border-emerald-500/20 shadow-md cursor-pointer transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
