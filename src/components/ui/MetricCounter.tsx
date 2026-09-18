'use client'

import React, { useEffect, useState, useRef } from 'react'

interface MetricCounterProps {
  endValue: number
  suffix?: string
  prefix?: string
  duration?: number
  isCurrency?: boolean
}

export function MetricCounter({ endValue, suffix = '', prefix = '', duration = 2000, isCurrency = false }: MetricCounterProps) {
  const [count, setCount] = useState(0)
  const counterRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setCount(endValue)
            return
          }
          let startTimestamp: number | null = null
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp
            const progress = Math.min((timestamp - startTimestamp) / duration, 1)
            // easeOutExpo
            const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
            setCount(Math.floor(easeOut * endValue))
            if (progress < 1) {
              window.requestAnimationFrame(step)
            }
          }
          window.requestAnimationFrame(step)
        }
      },
      { threshold: 0.1 }
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => {
      if (counterRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(counterRef.current)
      }
    }
  }, [endValue, duration, hasAnimated])

  const formattedCount = isCurrency 
    ? (count / 10).toFixed(1) // Assuming we pass 48 for 4.8
    : count

  return (
    <span ref={counterRef}>
      {prefix}{formattedCount}{suffix}
    </span>
  )
}

export function FadeInText({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <span 
      ref={ref} 
      className={`transition-opacity duration-1000 ease-in-out motion-reduce:opacity-100 motion-reduce:transition-none ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {children}
    </span>
  )
}
