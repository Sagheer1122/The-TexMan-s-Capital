'use client';

import { useEffect } from 'react';
import App from '@/src/App';

export default function LoginRoute() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.hash = '#login';
    }
  }, []);

  return <App />;
}
