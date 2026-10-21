// Component ported and enhanced from https://codepen.io/JuanFuentes/pen/eYEeoyE

import { useEffect, useRef } from 'react';
import { CanvAscii } from './ascii-text-engine';
import { ASCII_TEXT_INLINE_STYLES } from './ascii-text-styles';

interface ASCIITextProps {
  text?: string;
  asciiFontSize?: number;
  textFontSize?: number;
  textColor?: string;
  planeBaseHeight?: number;
  enableWaves?: boolean;
}

export default function ASCIIText({
  text = 'David!',
  asciiFontSize = 8,
  textFontSize = 200,
  textColor = '#fdf9f3',
  planeBaseHeight = 8,
  enableWaves = true,
}: ASCIITextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const asciiRef = useRef<CanvAscii | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();

    if (width === 0 || height === 0) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (
            entry.isIntersecting &&
            entry.boundingClientRect.width > 0 &&
            entry.boundingClientRect.height > 0
          ) {
            const { width: w, height: h } = entry.boundingClientRect;

            asciiRef.current = new CanvAscii(
              {
                text,
                asciiFontSize,
                textFontSize,
                textColor,
                planeBaseHeight,
                enableWaves,
              },
              containerRef.current!,
              w,
              h
            );
            asciiRef.current.load();

            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(containerRef.current);

      return () => {
        observer.disconnect();
        if (asciiRef.current) {
          asciiRef.current.dispose();
        }
      };
    }

    asciiRef.current = new CanvAscii(
      {
        text,
        asciiFontSize,
        textFontSize,
        textColor,
        planeBaseHeight,
        enableWaves,
      },
      containerRef.current,
      width,
      height
    );
    asciiRef.current.load();

    const ro = new ResizeObserver((entries) => {
      if (!entries[0] || !asciiRef.current) return;
      const { width: w, height: h } = entries[0].contentRect;
      if (w > 0 && h > 0) {
        asciiRef.current.setSize(w, h);
      }
    });
    ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
      if (asciiRef.current) {
        asciiRef.current.dispose();
      }
    };
  }, [
    text,
    asciiFontSize,
    textFontSize,
    textColor,
    planeBaseHeight,
    enableWaves,
  ]);

  return (
    <div
      ref={containerRef}
      className='ascii-text-container'
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
    >
      <style>{ASCII_TEXT_INLINE_STYLES}</style>
    </div>
  );
}
