'use client';

import { useState, useEffect } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const onMouseEnter = () => setHidden(false);
    const onMouseLeave = () => setHidden(true);
    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const updateTrail = () => {
      setTrailPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animationFrameId = requestAnimationFrame(updateTrail);
    };

    animationFrameId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        (target.classList && target.classList.contains('cursor-pointer'));

      setLinkHovered(!!isInteractive);
    };

    document.addEventListener('mouseover', handleMouseOver);
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Custom Cursor Inner Dot */}
      <div
        className={`fixed pointer-events-none z-[9999] w-2 h-2 bg-[#00C853] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(0,200,83,0.8)] transition-transform duration-100 ease-out hidden md:block ${
          hidden ? 'opacity-0' : 'opacity-100'
        } ${clicked ? 'scale-75' : ''} ${linkHovered ? 'scale-150 bg-emerald-400' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />

      {/* Custom Cursor Outer Ring Tracker */}
      <div
        className={`fixed pointer-events-none z-[9999] w-8 h-8 border border-dashed border-[#00C853]/60 rounded-full -translate-x-1/2 -translate-y-1/2 hidden md:block transition-[transform,opacity,border-color,background-color] duration-300 ease-out ${
          hidden ? 'opacity-0 scale-50' : 'opacity-100'
        } ${
          clicked
            ? 'scale-75 border-solid border-[#009624] bg-[#00C853]/10 shadow-[0_0_15px_rgba(0,200,83,0.4)]'
            : ''
        } ${
          linkHovered
            ? 'scale-150 border-solid border-emerald-400 bg-[#00C853]/5 shadow-[0_0_20px_rgba(0,200,83,0.5)]'
            : ''
        }`}
        style={{
          left: `${trailPosition.x}px`,
          top: `${trailPosition.y}px`,
        }}
      />
    </>
  );
}
