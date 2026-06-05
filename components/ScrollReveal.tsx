"use client";

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-in-up' | 'fade-in-left' | 'fade-in-right' | 'fade-in' | 'scale-in';
  delay?: number;
  duration?: number;
  once?: boolean;
}

export default function ScrollReveal({ 
  children, 
  className = '', 
  animation = 'fade-in-up', 
  delay = 0,
  duration = 800,
  once = true
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [once]);

  const baseClasses: Record<string, string> = {
    'fade-in-up': 'opacity-0 translate-y-12',
    'fade-in-left': 'opacity-0 -translate-x-12',
    'fade-in-right': 'opacity-0 translate-x-12',
    'fade-in': 'opacity-0',
    'scale-in': 'opacity-0 scale-95',
  };

  const visibleClasses: Record<string, string> = {
    'fade-in-up': 'opacity-100 translate-y-0',
    'fade-in-left': 'opacity-100 translate-x-0',
    'fade-in-right': 'opacity-100 translate-x-0',
    'fade-in': 'opacity-100',
    'scale-in': 'opacity-100 scale-100',
  };

  const baseClass = baseClasses[animation] || baseClasses['fade-in-up'];
  const visibleClass = visibleClasses[animation] || visibleClasses['fade-in-up'];

  return (
    <div
      ref={ref}
      className={`transition-all ${className} ${isVisible ? visibleClass : baseClass}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
}
