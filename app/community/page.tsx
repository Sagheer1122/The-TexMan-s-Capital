'use client';

import { useEffect } from 'react';
import App from '@/src/App';

export default function CommunityRoute() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.hash = '#communities';
    }
  }, []);

  return <App />;
}
