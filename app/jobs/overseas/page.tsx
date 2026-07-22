'use client';

import { useEffect } from 'react';
import App from '@/src/App';

export default function OverseasJobsRoute() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.hash = '#overseas';
    }
  }, []);

  return <App />;
}
