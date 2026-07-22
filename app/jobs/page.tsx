'use client';

import { useEffect } from 'react';
import App from '@/src/App';

export default function JobsRoute() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.hash = '#jobs';
    }
  }, []);

  return <App />;
}
