'use client'

import React from 'react'

interface LogoProps {
  className?: string
  variant?: 'horizontal' | 'mark' | 'stacked'
  theme?: 'dark' | 'light' | 'auto' // light = for dark backgrounds; dark = for light backgrounds
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Logo({
  className = '',
  variant = 'horizontal',
  theme = 'auto',
  size = 'md'
}: LogoProps) {
  const sizeMap = {
    sm: { height: 28, markSize: 24, fontSize: 18, subSize: 7 },
    md: { height: 36, markSize: 32, fontSize: 22, subSize: 8 },
    lg: { height: 44, markSize: 40, fontSize: 26, subSize: 9.5 },
    xl: { height: 56, markSize: 50, fontSize: 32, subSize: 11 }
  }

  const currentSize = sizeMap[size]

  // Color configurations based on theme
  const textColor = theme === 'light' ? '#FFFFFF' : 'var(--color-primary, #1A2B48)'
  const accentColor = theme === 'light' ? '#60A5FA' : 'var(--color-secondary, #0060AC)'
  const subtextColor = theme === 'light' ? '#94A3B8' : 'var(--color-muted-text, #64748B)'
  const shieldLeft = theme === 'light' ? '#3B82F6' : '#1A2B48'
  const shieldRight = theme === 'light' ? '#60A5FA' : '#0060AC'
  const coreNode = '#F59E0B' // Golden amber human awareness facet

  if (variant === 'mark') {
    return (
      <svg
        viewBox="0 0 44 48"
        width={currentSize.markSize}
        height={currentSize.markSize * (48 / 44)}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block shrink-0 ${className}`}
        aria-label="SMEShield Mark"
      >
        <defs>
          <linearGradient id="facetLeft" x1="4" y1="4" x2="22" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={shieldLeft} />
            <stop offset="100%" stopColor="#0B132B" />
          </linearGradient>
          <linearGradient id="facetRight" x1="22" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={shieldRight} />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
          <linearGradient id="coreGlow" x1="18" y1="18" x2="26" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor={coreNode} />
          </linearGradient>
        </defs>
        {/* Left Protective Wing (Human Firewall / Organisation) */}
        <path
          d="M22 2L6 8.5V23C6 33.5 13 41.5 22 45V2Z"
          fill="url(#facetLeft)"
        />
        {/* Right Protective Wing (Digital Shield / Practical Protocols) */}
        <path
          d="M22 2L38 8.5V23C38 33.5 31 41.5 22 45V2Z"
          fill="url(#facetRight)"
        />
        {/* Central Interlocking Facet Line */}
        <path
          d="M22 2V45"
          stroke="#FFFFFF"
          strokeOpacity="0.3"
          strokeWidth="1.2"
        />
        {/* Core Awareness Check Mark / Verification Node */}
        <path
          d="M17 23.5L20.5 27L27 20"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Human Firewall Accent Dot */}
        <circle cx="22" cy="13.5" r="2.2" fill="url(#coreGlow)" />
      </svg>
    )
  }

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Shield Vector Mark */}
      <svg
        viewBox="0 0 44 48"
        width={currentSize.markSize}
        height={currentSize.markSize * (48 / 44)}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logoFacetLeft" x1="4" y1="4" x2="22" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={shieldLeft} />
            <stop offset="100%" stopColor="#0B132B" />
          </linearGradient>
          <linearGradient id="logoFacetRight" x1="22" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={shieldRight} />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
        </defs>
        <path
          d="M22 2L6 8.5V23C6 33.5 13 41.5 22 45V2Z"
          fill="url(#logoFacetLeft)"
        />
        <path
          d="M22 2L38 8.5V23C38 33.5 31 41.5 22 45V2Z"
          fill="url(#logoFacetRight)"
        />
        <path
          d="M22 2V45"
          stroke="#FFFFFF"
          strokeOpacity="0.3"
          strokeWidth="1.2"
        />
        <path
          d="M17 23.5L20.5 27L27 20"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="22" cy="13.5" r="2.2" fill={coreNode} />
      </svg>

      {/* Typography Wordmark */}
      <div className="flex flex-col justify-center leading-none">
        <div
          className="font-bold tracking-tight flex items-baseline"
          style={{ fontSize: `${currentSize.fontSize}px`, letterSpacing: '-0.03em' }}
        >
          <span style={{ color: textColor }}>SME</span>
          <span style={{ color: accentColor }}>Shield</span>
        </div>
        <span
          className="font-semibold uppercase tracking-wider"
          style={{
            fontSize: `${currentSize.subSize}px`,
            letterSpacing: '0.18em',
            color: subtextColor,
            marginTop: '2px'
          }}
        >
          Cybersecurity Awareness
        </span>
      </div>
    </div>
  )
}
