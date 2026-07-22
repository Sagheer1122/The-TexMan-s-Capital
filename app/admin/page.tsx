'use client';

import { useEffect } from 'react';
import App from '@/src/App';

export default function AdminRoute() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.hash = '#admin';
    }
  }, []);

  return <App />;
}
