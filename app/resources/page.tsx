'use client';

import { useEffect } from 'react';
import App from '@/src/App';

export default function ResourcesRoute() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.hash = '#resources';
    }
  }, []);

  return <App />;
}
