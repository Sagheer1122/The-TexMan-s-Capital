'use client';

import { useEffect } from 'react';
import App from '@/src/App';

export default function JobDetailRoute() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.hash = '#inductions';
    }
  }, []);

  return <App />;
}
