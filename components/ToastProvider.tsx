'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (message: string, type: ToastType = 'success', duration = 4500) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Intercept window.alert calls globally
  useEffect(() => {
    const originalAlert = window.alert;
    window.alert = (message: any) => {
      if (!message) return;
      let type: ToastType = 'success';
      const lower = message.toString().toLowerCase();
      if (
        lower.includes('error') ||
        lower.includes('denied') ||
        lower.includes('failed') ||
        lower.includes('invalid') ||
        lower.includes('not have')
      ) {
        type = 'error';
      } else if (
        lower.includes('warning') ||
        lower.includes('attention') ||
        lower.includes('alert') ||
        lower.includes('limit')
      ) {
        type = 'warning';
      } else if (
        lower.includes('soon') ||
        lower.includes('development') ||
        lower.includes('redirecting') ||
        lower.includes('starting')
      ) {
        type = 'info';
      }
      addToast(message.toString(), type);
    };

    return () => {
      window.alert = originalAlert;
    };
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed top-6 right-6 z-[99999] flex flex-col space-y-3 pointer-events-none max-w-sm w-full px-4 sm:px-0">
        {toasts.map((toast) => {
          let borderClass = 'border-[#00C853]/30 shadow-[0_0_15px_rgba(0,200,83,0.12)] text-emerald-400';
          let icon = <CheckCircle className="w-5 h-5 text-[#00C853] flex-shrink-0" />;

          if (toast.type === 'error') {
            borderClass = 'border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.12)] text-red-400';
            icon = <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />;
          } else if (toast.type === 'warning') {
            borderClass = 'border-[#F3C132]/30 shadow-[0_0_15px_rgba(243,193,50,0.12)] text-[#F3C132]';
            icon = <AlertTriangle className="w-5 h-5 text-[#F3C132] flex-shrink-0" />;
          } else if (toast.type === 'info') {
            borderClass = 'border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.12)] text-blue-400';
            icon = <Info className="w-5 h-5 text-blue-400 flex-shrink-0" />;
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start space-x-3 p-4 rounded-2xl border bg-[#011126]/95 backdrop-blur-md transition-all animate-fadeIn ${borderClass}`}
            >
              {icon}
              <div className="flex-1 text-xs font-semibold leading-relaxed whitespace-pre-line text-white/95">
                {toast.message}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer p-0.5 rounded-lg hover:bg-white/5 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
