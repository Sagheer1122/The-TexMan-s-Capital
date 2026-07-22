'use client';

import { useEffect } from 'react';
import App from '@/src/App';

export default function ToolsRoute() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.hash = '#careertools';
    }
  }, []);

  return <App />;
}
