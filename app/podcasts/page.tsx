'use client';

import { useEffect } from 'react';
import App from '@/src/App';

export default function PodcastsRoute() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.hash = '#podcasts';
    }
  }, []);

  return <App />;
}
