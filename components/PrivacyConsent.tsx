'use client';

import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

const STORAGE_KEY = 'lumina-privacy-accepted';

export default function PrivacyConsent() {
  const [accepted, setAccepted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setAccepted(!!localStorage.getItem(STORAGE_KEY));
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    setAccepted(true);
  };

  if (!mounted) return null;

  return (
    <div className="mt-10 flex justify-center">
      {accepted ? (
        <div className="flex items-center gap-3 bg-green-50 text-green-700 border border-green-200 rounded-2xl px-6 py-4 text-sm font-medium">
          <CheckCircle className="w-5 h-5 shrink-0" />
          Políticas aceitas. Obrigada pela confiança!
        </div>
      ) : (
        <button
          onClick={handleAccept}
          className="bg-primary hover:bg-primary-dark text-white font-bold text-sm tracking-wide uppercase px-10 py-4 rounded-xl shadow-ambient hover:shadow-ambient-hover transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
        >
          Aceito as Políticas de Privacidade
        </button>
      )}
    </div>
  );
}
