'use client';

import { useRef, useState, ReactNode } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className = '',
  spotlightColor,
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: '50%', y: '50%' });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x: `${x}px`, y: `${y}px` });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative isolate overflow-hidden rounded-[var(--glass-radius)] ${className}`}
    >
      <div className='relative z-[1] h-full [&>*]:h-full'>{children}</div>
      {/* Spotlight overlay */}
      <div
        className='pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 rounded-[inherit]'
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(600px circle at ${position.x} ${position.y}, ${spotlightColor || 'var(--spotlight-color, rgba(120, 100, 200, 0.15))'}, transparent 40%)`,
        }}
      />
    </div>
  );
}
