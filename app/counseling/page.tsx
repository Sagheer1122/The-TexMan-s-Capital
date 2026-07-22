'use client';

import { useEffect } from 'react';
import App from '@/src/App';

export default function CounselingRoute() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.hash = '#guidance';
    }
  }, []);

  return <App />;
}
