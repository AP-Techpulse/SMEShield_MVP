"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react'

const INCIDENT_PROTOCOLS = [
  {
    image: '/assets/smeshield/scenarios/employee-learning-laptop.jpg',
    tag: 'Agency Banking Hub',
    title: 'Protecting Your Terminal & Customers',
    description: 'Never release cash or goods until the transaction appears on your personal merchant dashboard.',
    tipId: 'Tip #09 • SMS Validation',
    tipHighlight: 'Never accept screenshots'
  },
  {
    image: '/assets/smeshield/scenarios/carousel-phishing.jpg',
    tag: 'Mobile Security',
    title: 'Verify Urgent Bank Messages',
    description: 'Scammers send fake SMS alerts threatening to block your account to steal your BVN or PIN.',
    tipId: 'Tip #04 • Phishing Defense',
    tipHighlight: 'Don\'t click unknown links'
  },
  {
    image: '/assets/smeshield/scenarios/carousel-pos.jpg',
    tag: 'Retail Operations',
    title: 'Securing the Checkout Counter',
    description: 'Fraudsters distract cashiers during POS payments or use cloned cards to steal funds.',
    tipId: 'Tip #07 • POS Fraud',
    tipHighlight: 'Monitor the terminal'
  },
  {
    image: '/assets/smeshield/scenarios/carousel-ransomware.jpg',
    tag: 'Data Protection',
    title: 'Defending Against Ransomware',
    description: 'Malicious links can lock all your business files and demand payment to restore access.',
    tipId: 'Tip #03 • Malware Defense',
    tipHighlight: 'Backup files daily'
  }
]

export function IncidentCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    timerRef.current = setInterval(() => {
      setActiveIndex((current) => (current + 1) % INCIDENT_PROTOCOLS.length)
    }, 10000) // 10-second auto-advance
  }, [])

  useEffect(() => {
    resetTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [resetTimer])

  const handlePrev = () => {
    setActiveIndex((current) => (current - 1 + INCIDENT_PROTOCOLS.length) % INCIDENT_PROTOCOLS.length)
    resetTimer()
  }

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % INCIDENT_PROTOCOLS.length)
    resetTimer()
  }

  const handleDotClick = (idx: number) => {
    setActiveIndex(idx)
    resetTimer()
  }

  const activeIncident = INCIDENT_PROTOCOLS[activeIndex]

  return (
    <div className="bg-surface rounded-xl overflow-hidden shadow-sm flex flex-col justify-between h-full group relative border border-border-subtle/60">
      {/* Top Media Frame with Crossfade & Tag */}
      <div className="relative w-full h-48 sm:h-52 bg-primary-container overflow-hidden">
        {INCIDENT_PROTOCOLS.map((incident, idx) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            key={idx}
            alt={incident.title} 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${idx === activeIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
            src={incident.image} 
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent z-10 pointer-events-none"></div>
        
        {/* Top Badges & Manual Arrows */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous incident scenario"
            className="w-8 h-8 rounded-full bg-primary/70 hover:bg-primary text-on-primary backdrop-blur-md flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next incident scenario"
            className="w-8 h-8 rounded-full bg-primary/70 hover:bg-primary text-on-primary backdrop-blur-md flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-on-primary z-20 pointer-events-none">
          <span className="font-label-sm text-label-sm bg-primary/90 px-2.5 py-1 rounded-md backdrop-blur-sm transition-all duration-300">
            {activeIncident.tag}
          </span>
          <span className="font-label-sm text-label-sm text-primary-fixed flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-success-base">verified</span>
            Validated Scenario
          </span>
        </div>
      </div>
      
      {/* Educational Body */}
      <div className="p-space-md flex flex-col gap-2 flex-grow justify-between relative bg-surface">
        <div className="relative min-h-[92px]">
          {INCIDENT_PROTOCOLS.map((incident, idx) => (
            <div 
              key={idx}
              className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${idx === activeIndex ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
              <span className="font-label-sm text-label-sm text-warning-text uppercase tracking-wider font-semibold">Real-World Incident Protocol</span>
              <h3 className="font-headline-sm text-headline-sm text-primary mt-0.5 line-clamp-1">{incident.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                {incident.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Tip & Indicators */}
        <div className="pt-space-md flex flex-col gap-3">
          <div className="relative h-[24px]">
            {INCIDENT_PROTOCOLS.map((incident, idx) => (
              <div 
                key={idx} 
                className={`absolute inset-0 flex items-center justify-between transition-opacity duration-700 motion-reduce:transition-none ${idx === activeIndex ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
              >
                <span className="font-label-sm text-label-sm text-muted-text">{incident.tipId}</span>
                <span className="font-label-sm text-label-sm text-primary font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-warning-base">lightbulb</span>
                  {incident.tipHighlight}
                </span>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-border-subtle">
            <div className="flex items-center gap-1.5">
              {INCIDENT_PROTOCOLS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => handleDotClick(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-6 bg-secondary' : 'w-2 bg-surface-container-highest hover:bg-surface-container-high'}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-text">
              <span>{activeIndex + 1} of {INCIDENT_PROTOCOLS.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
