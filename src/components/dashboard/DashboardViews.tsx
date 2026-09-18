"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { IncidentCarousel } from './IncidentCarousel'

interface ModuleData {
  id: string;
  title_en: string;
  order_index: number;
  threat_category: string | null;
  estimated_duration?: number | null;
  is_weak_area?: boolean;
  is_business_relevant?: boolean;
}

interface ProfileData {
  full_name?: string;
  business_type?: string;
  business_name?: string;
  location?: string;
  business_join_code?: string;
  [key: string]: unknown;
}

// ----------------------------------------------------------------------
// 1. EMPLOYEE DASHBOARD VIEW
// ----------------------------------------------------------------------
export function LearnerDashboardView({ 
  profile, 
  recommended, 
  completed,
  baselineScore,
  avgQuizScore,
  humanFirewallScore,
  awarenessImprovement,
  completionPercentage,
  awarenessLevel,
  strongestArea,
  weakestArea,
}: { 
  profile: ProfileData, 
  recommended: ModuleData[], 
  allOthers?: ModuleData[], 
  completed: ModuleData[],
  baselineScore?: number | null,
  avgQuizScore?: number,
  humanFirewallScore?: number,
  awarenessImprovement?: number | null,
  completionPercentage?: number,
  readinessScore?: number,
  awarenessLevel?: 'Developing' | 'Aware' | 'Strong' | 'Highly Aware' | null,
  strongestArea?: string | null,
  weakestArea?: string | null,
}) {
  const primaryModule = recommended.length > 0 ? recommended[0] : null;
  const remainingRecommended = recommended.length > 0 ? recommended.slice(1, 4) : [];

  const totalModules = 15;
  const completionPct = completionPercentage ?? Math.round((completed.length / totalModules) * 100);
  const hasCompletedModules = completed.length > 0;
  const hasBaseline = typeof baselineScore === 'number';
  const effectiveBaseline = hasBaseline ? baselineScore : null;
  const effectiveQuizScore = avgQuizScore ?? (completed.length > 0 ? 100 : 0);
  // Approved Formula: HFS = (completion_percentage × 0.35) + (average_completed_module_quiz_score × 0.65)
  // Represents current cybersecurity awareness and training performance
  const effectiveHFS = humanFirewallScore ?? Math.round((completionPct * 0.35) + (effectiveQuizScore * 0.65));
  const effectiveImprovement = typeof awarenessImprovement === 'number'
    ? awarenessImprovement
    : ((hasBaseline && hasCompletedModules) ? effectiveHFS - effectiveBaseline! : null);
  const effectiveLevel = awarenessLevel || (
    effectiveHFS >= 85 ? 'Highly Aware' :
    effectiveHFS >= 70 ? 'Strong' :
    effectiveHFS >= 50 ? 'Aware' : 'Developing'
  );
  const dashOffset = 314.16 * (1 - (effectiveHFS / 100));

  const greetingHour = new Date().getHours();
  const greetingTime = greetingHour < 12 ? 'morning' : greetingHour < 17 ? 'afternoon' : 'evening';
  const firstName = profile.full_name?.split(' ')[0] || 'Learner';

  return (
    <div className="flex flex-col w-full gap-space-xl">
      {/* Top Greeting & Role Context */}
      <section className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pb-space-xs">
        <div className="flex flex-col gap-1">
          <div className="inline-flex items-center gap-2">
            <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight">
              Good {greetingTime}, {firstName}
            </h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-info-bg text-info-text font-label-sm text-label-sm font-semibold">
              Employee Track
            </span>
          </div>
          <p className="font-body-md text-body-md text-muted-text">
            {profile.business_name || profile.business_type || 'Workplace'} • Frontline Security Training
          </p>
        </div>

        <Link 
          href="/training" 
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface hover:bg-surface-container-low text-primary font-label-md text-label-md border border-border-subtle shadow-sm transition-colors"
        >
          <span className="material-symbols-outlined text-[18px] text-secondary">menu_book</span>
          <span>Training Library</span>
        </Link>
      </section>

      {/* Hero Section: Human Firewall Score Dial + Incident Protocol Carousel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
        {/* Left Column: Human Firewall Score Dial */}
        <div className="lg:col-span-7 bg-surface rounded-xl p-space-lg shadow-sm flex flex-col justify-between relative overflow-hidden border border-border-subtle/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-muted-text font-semibold">Cybersecurity Awareness & Performance</span>
              <h2 className="font-headline-md text-headline-md text-primary mt-0.5">Human Firewall Score</h2>
            </div>
            {effectiveImprovement !== null ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success-bg text-success-text font-label-sm text-label-sm self-start sm:self-auto font-medium">
                <span className="material-symbols-outlined text-[16px]">
                  {effectiveImprovement >= 0 ? 'trending_up' : 'trending_down'}
                </span>
                <span>
                  {effectiveImprovement >= 0 ? `+${effectiveImprovement}% Improvement` : `${effectiveImprovement}% Improvement`}
                </span>
              </div>
            ) : !hasCompletedModules ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-muted-text font-label-sm text-label-sm self-start sm:self-auto font-medium">
                <span className="material-symbols-outlined text-[16px]">school</span>
                <span>Complete your first training module to measure improvement.</span>
              </div>
            ) : (
              <Link href="/assessment" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-muted-text hover:text-primary font-label-sm text-label-sm self-start sm:self-auto font-medium transition-colors">
                <span className="material-symbols-outlined text-[16px]">assignment</span>
                <span>Baseline not completed.</span>
              </Link>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-space-md my-space-sm items-center">
            {/* Radial Dial */}
            <div className="sm:col-span-5 flex flex-col items-center justify-center py-space-xs">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle className="stroke-surface-container" cx="60" cy="60" fill="none" r="50" strokeWidth="10"></circle>
                  <circle 
                    className="stroke-secondary transition-all duration-1000 ease-out" 
                    cx="60" cy="60" fill="none" r="50" 
                    strokeDasharray="314.16" 
                    strokeDashoffset={dashOffset} 
                    strokeLinecap="round" 
                    strokeWidth="10"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-display-hero text-display-hero text-primary leading-none tracking-tight">{effectiveHFS}%</span>
                  <span className="font-label-sm text-label-sm text-muted-text mt-1">Firewall Score</span>
                  <span className={`inline-flex items-center px-2 py-0.5 mt-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    effectiveLevel === 'Highly Aware' ? 'bg-success-bg text-success-text border border-success-base/30' :
                    effectiveLevel === 'Strong' ? 'bg-secondary-fixed/50 text-secondary border border-secondary/30' :
                    effectiveLevel === 'Aware' ? 'bg-info-bg text-info-text border border-info-base/30' :
                    'bg-surface-container-high text-muted-text border border-border-subtle'
                  }`}>
                    {effectiveLevel}
                  </span>
                </div>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="sm:col-span-7 flex flex-col justify-center gap-space-sm">
              <p className="font-body-md text-body-md text-on-surface">
                Formula: <span className="font-semibold text-primary">Completion (35%)</span> + <span className="font-semibold text-primary">Quiz Mastery (65%)</span>
              </p>
              
              <div className="grid grid-cols-3 gap-space-xs pt-1">
                <div className="p-space-sm rounded-lg bg-surface-container-low text-center">
                  <span className="font-headline-sm text-headline-sm text-primary font-bold block">
                    {effectiveBaseline !== null ? `${effectiveBaseline}%` : '---'}
                  </span>
                  <span className="font-label-sm text-label-sm text-muted-text block text-[11px]">
                    {effectiveBaseline !== null ? 'Baseline Diagnostic' : 'Baseline Pending'}
                  </span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low text-center">
                  <span className="font-headline-sm text-headline-sm text-primary font-bold block">{completed.length}/15</span>
                  <span className="font-label-sm text-label-sm text-muted-text block text-[11px]">Modules ({completionPct}%)</span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low text-center">
                  <span className="font-headline-sm text-headline-sm text-primary font-bold block">{effectiveQuizScore > 0 ? `${effectiveQuizScore}%` : '---'}</span>
                  <span className="font-label-sm text-label-sm text-muted-text block text-[11px]">Quiz Avg</span>
                </div>
              </div>

              {/* Strongest & Priority Focus Areas */}
              <div className="grid grid-cols-2 gap-space-xs pt-1">
                <div className="p-2 rounded-lg bg-surface-container-low border border-border-subtle/40 flex flex-col">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-success-text">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    <span>Strongest Area</span>
                  </div>
                  <span className="font-body-sm text-xs text-primary font-medium mt-0.5 truncate">
                    {strongestArea || (completed.length > 0 ? 'Core Defense' : 'Pending Quizzes')}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-surface-container-low border border-border-subtle/40 flex flex-col">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-warning-text">
                    <span className="material-symbols-outlined text-[14px]">crisis_alert</span>
                    <span>Priority Focus</span>
                  </div>
                  <span className="font-body-sm text-xs text-primary font-medium mt-0.5 truncate">
                    {weakestArea || 'Phishing & Fake Alerts'}
                  </span>
                </div>
              </div>

              {/* Begin your first module CTA if no data yet */}
              {!hasCompletedModules && !hasBaseline && (
                <div className="mt-1 flex items-center justify-between p-2 rounded-lg bg-primary/5 border border-primary/20">
                  <span className="text-xs text-primary font-medium">Begin your first module</span>
                  <Link
                    href={primaryModule ? `/training/${primaryModule.id}` : '/training'}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors"
                  >
                    <span>Begin your first module</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="pt-space-sm border-t border-border-subtle/60 flex items-center justify-between text-xs text-muted-text">
            <span>
              {effectiveImprovement !== null ? (
                <>Awareness Improvement: <strong className={effectiveImprovement >= 0 ? 'text-success-text' : 'text-warning-text'}>{effectiveImprovement >= 0 ? `+${effectiveImprovement}%` : `${effectiveImprovement}%`}</strong></>
              ) : !hasCompletedModules ? (
                <span>Complete your first training module to measure improvement.</span>
              ) : (
                <span className="text-muted-text">Baseline not completed. • <Link href="/assessment" className="text-secondary hover:underline font-semibold">Take diagnostic</Link></span>
              )}
            </span>
            <Link href="/dashboard/progress" className="text-secondary hover:text-primary font-semibold flex items-center gap-1">
              <span>View Full Progress</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Real-World Incident Protocol Carousel */}
        <div className="lg:col-span-5 h-full">
          <IncidentCarousel />
        </div>
      </div>

      {/* Current / Priority Training Section */}
      <section className="w-full flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-primary">Priority Training for You</h2>
            <p className="font-body-sm text-body-sm text-muted-text mt-0.5">
              Recommended learning track based on your assessment results.
            </p>
          </div>
          <Link href="/training" className="font-label-sm text-label-sm text-secondary hover:text-primary font-semibold inline-flex items-center gap-1">
            <span>Browse All (15)</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </Link>
        </div>

        {/* Primary In-Progress or Up-Next Card */}
        {primaryModule && (
          <div className="bg-surface rounded-xl p-space-lg shadow-sm border border-secondary/20 flex flex-col md:flex-row md:items-center justify-between gap-space-md">
            <div className="flex flex-col gap-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-label-sm font-semibold text-secondary uppercase tracking-wider">
                  Module {String(primaryModule.order_index).padStart(2, '0')}
                </span>
                {primaryModule.is_weak_area && (
                  <span className="px-2 py-0.5 rounded-full bg-warning-bg text-warning-text font-label-sm text-label-sm font-semibold">
                    Priority Focus
                  </span>
                )}
              </div>
              <h3 className="font-headline-md text-headline-md text-primary">
                {primaryModule.title_en}
              </h3>
              <p className="font-body-sm text-body-sm text-muted-text">
                {primaryModule.threat_category ? `Practical steps to spot and handle ${primaryModule.threat_category.replace(/_/g, ' ')} threats.` : 'Core cybersecurity awareness module.'}
              </p>
            </div>

            <div className="flex items-center gap-space-md shrink-0">
              <div className="flex items-center gap-1 text-muted-text font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                <span>{primaryModule.estimated_duration || 10} mins</span>
              </div>
              <Link 
                href={`/training/${primaryModule.id}`} 
                className="h-11 px-space-lg rounded-lg bg-primary hover:bg-primary-container text-on-primary font-body-md-semibold text-body-sm inline-flex items-center gap-1.5 transition-all shadow-sm"
              >
                <span>Start Module</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        )}

        {/* Secondary Recommended Cards */}
        {remainingRecommended.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {remainingRecommended.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        )}
      </section>

      {/* Completed Modules Strip (if any) */}
      {completed.length > 0 && (
        <section className="w-full flex flex-col gap-space-sm pt-space-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-headline-sm text-headline-sm text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-success-base text-[20px]">check_circle</span>
              <span>Completed Training ({completed.length})</span>
            </h3>
            <Link href="/dashboard/progress" className="font-label-sm text-label-sm text-muted-text hover:text-primary">
              View details →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-sm">
            {completed.slice(0, 4).map(module => (
              <Link 
                href={`/training/${module.id}`} 
                key={module.id} 
                className="p-space-sm bg-surface rounded-lg border border-border-subtle hover:border-success-base/40 transition-colors flex items-center justify-between gap-2"
              >
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-semibold text-muted-text uppercase">Module {String(module.order_index).padStart(2, '0')}</span>
                  <span className="text-sm font-semibold text-primary truncate">{module.title_en}</span>
                </div>
                <span className="material-symbols-outlined text-success-base text-[18px] shrink-0">check</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

// ----------------------------------------------------------------------
// 2. SOLE ENTREPRENEUR DASHBOARD VIEW
// ----------------------------------------------------------------------
export function SoleEntrepreneurDashboardView({ 
  profile, 
  recommended, 
  completed,
  baselineScore,
  avgQuizScore,
  humanFirewallScore,
  awarenessImprovement,
  completionPercentage,
  awarenessLevel,
  strongestArea,
  weakestArea,
}: { 
  profile: ProfileData, 
  recommended: ModuleData[], 
  allOthers?: ModuleData[], 
  completed: ModuleData[],
  baselineScore?: number | null,
  avgQuizScore?: number,
  humanFirewallScore?: number,
  awarenessImprovement?: number | null,
  completionPercentage?: number,
  readinessScore?: number,
  awarenessLevel?: 'Developing' | 'Aware' | 'Strong' | 'Highly Aware',
  strongestArea?: string | null,
  weakestArea?: string | null,
}) {
  const primaryModule = recommended.length > 0 ? recommended[0] : null;
  const remainingRecommended = recommended.length > 0 ? recommended.slice(1, 4) : [];

  const totalModules = 15;
  const completionPct = completionPercentage ?? Math.round((completed.length / totalModules) * 100);
  const hasCompletedModules = completed.length > 0;
  const hasBaseline = typeof baselineScore === 'number';
  const effectiveBaseline = hasBaseline ? baselineScore : null;
  const effectiveQuizScore = avgQuizScore ?? (completed.length > 0 ? 100 : 0);
  // Approved Formula: HFS = (completion_percentage × 0.35) + (average_completed_module_quiz_score × 0.65)
  // Represents current cybersecurity awareness and training performance
  const effectiveHFS = humanFirewallScore ?? Math.round((completionPct * 0.35) + (effectiveQuizScore * 0.65));
  const effectiveImprovement = typeof awarenessImprovement === 'number'
    ? awarenessImprovement
    : ((hasBaseline && hasCompletedModules) ? effectiveHFS - effectiveBaseline! : null);
  const effectiveLevel: 'Developing' | 'Aware' | 'Strong' | 'Highly Aware' = awarenessLevel ?? (
    effectiveHFS >= 85 ? 'Highly Aware' :
    effectiveHFS >= 70 ? 'Strong' :
    effectiveHFS >= 50 ? 'Aware' : 'Developing'
  );
  const dashOffset = 314.16 * (1 - (effectiveHFS / 100));

  const firstName = profile.full_name?.split(' ')[0] || 'Merchant';

  return (
    <div className="flex flex-col w-full gap-space-xl">
      {/* Top Greeting Bar */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pb-space-xs">
        <div className="flex flex-col gap-1">
          <div className="inline-flex items-center gap-2">
            <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight">
              Welcome back, {firstName}
            </h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-info-bg text-info-text font-label-sm text-label-sm font-semibold">
              Sole Entrepreneur
            </span>
          </div>
          <p className="font-body-md text-body-md text-muted-text">
            Independent Business Protection • {profile.business_type || 'Retail & Merchant Operations'}
          </p>
        </div>

        <Link 
          href="/training" 
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface hover:bg-surface-container-low text-primary font-label-md text-label-md border border-border-subtle shadow-sm transition-colors"
        >
          <span className="material-symbols-outlined text-[18px] text-secondary">menu_book</span>
          <span>Training Library</span>
        </Link>
      </section>

      {/* Hero Section: Personal Human Firewall Score Dial + Incident Protocol Carousel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
        {/* Left Column: Personal Human Firewall Score */}
        <div className="lg:col-span-7 bg-surface rounded-xl p-space-lg shadow-sm flex flex-col justify-between relative overflow-hidden border border-border-subtle/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-muted-text font-semibold">Cybersecurity Awareness & Performance</span>
              <h2 className="font-headline-md text-headline-md text-primary mt-0.5">Human Firewall Score</h2>
            </div>
            {effectiveImprovement !== null ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success-bg text-success-text font-label-sm text-label-sm self-start sm:self-auto font-medium">
                <span className="material-symbols-outlined text-[16px]">
                  {effectiveImprovement >= 0 ? 'trending_up' : 'trending_down'}
                </span>
                <span>
                  {effectiveImprovement >= 0 ? `+${effectiveImprovement}% Improvement` : `${effectiveImprovement}% Improvement`}
                </span>
              </div>
            ) : !hasCompletedModules ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-muted-text font-label-sm text-label-sm self-start sm:self-auto font-medium">
                <span className="material-symbols-outlined text-[16px]">school</span>
                <span>Complete your first training module to measure improvement.</span>
              </div>
            ) : (
              <Link href="/assessment" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-muted-text hover:text-primary font-label-sm text-label-sm self-start sm:self-auto font-medium transition-colors">
                <span className="material-symbols-outlined text-[16px]">assignment</span>
                <span>Baseline not completed.</span>
              </Link>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-space-md my-space-sm items-center">
            {/* Radial Dial */}
            <div className="sm:col-span-5 flex flex-col items-center justify-center py-space-xs">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle className="stroke-surface-container" cx="60" cy="60" fill="none" r="50" strokeWidth="10"></circle>
                  <circle 
                    className="stroke-secondary transition-all duration-1000 ease-out" 
                    cx="60" cy="60" fill="none" r="50" 
                    strokeDasharray="314.16" 
                    strokeDashoffset={dashOffset} 
                    strokeLinecap="round" 
                    strokeWidth="10"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-display-hero text-display-hero text-primary leading-none tracking-tight">{effectiveHFS}%</span>
                  <span className="font-label-sm text-label-sm text-muted-text mt-1">Firewall Score</span>
                  <span className={`inline-flex items-center px-2 py-0.5 mt-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    effectiveLevel === 'Highly Aware' ? 'bg-success-bg text-success-text border border-success-base/30' :
                    effectiveLevel === 'Strong' ? 'bg-secondary-fixed/50 text-secondary border border-secondary/30' :
                    effectiveLevel === 'Aware' ? 'bg-info-bg text-info-text border border-info-base/30' :
                    'bg-surface-container-high text-muted-text border border-border-subtle'
                  }`}>
                    {effectiveLevel}
                  </span>
                </div>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="sm:col-span-7 flex flex-col justify-center gap-space-sm">
              <p className="font-body-md text-body-md text-on-surface">
                Formula: <span className="font-semibold text-primary">Completion (35%)</span> + <span className="font-semibold text-primary">Quiz Mastery (65%)</span>
              </p>
              
              <div className="grid grid-cols-3 gap-space-xs pt-1">
                <div className="p-space-sm rounded-lg bg-surface-container-low text-center">
                  <span className="font-headline-sm text-headline-sm text-primary font-bold block">{effectiveBaseline !== null ? `${effectiveBaseline}%` : '---'}</span>
                  <span className="font-label-sm text-label-sm text-muted-text block text-[11px]">Baseline</span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low text-center">
                  <span className="font-headline-sm text-headline-sm text-primary font-bold block">{completed.length}/15</span>
                  <span className="font-label-sm text-label-sm text-muted-text block text-[11px]">Modules ({completionPct}%)</span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low text-center">
                  <span className="font-headline-sm text-headline-sm text-primary font-bold block">{effectiveQuizScore > 0 ? `${effectiveQuizScore}%` : '---'}</span>
                  <span className="font-label-sm text-label-sm text-muted-text block text-[11px]">Quiz Avg</span>
                </div>
              </div>

              {/* Strongest & Priority Focus Areas */}
              <div className="grid grid-cols-2 gap-space-xs pt-1">
                <div className="p-2 rounded-lg bg-surface-container-low border border-border-subtle/40 flex flex-col">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-success-text">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    <span>Strongest Area</span>
                  </div>
                  <span className="font-body-sm text-xs text-primary font-medium mt-0.5 truncate">
                    {strongestArea || (completed.length > 0 ? 'Merchant Security' : 'Pending Quizzes')}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-surface-container-low border border-border-subtle/40 flex flex-col">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-warning-text">
                    <span className="material-symbols-outlined text-[14px]">crisis_alert</span>
                    <span>Priority Focus</span>
                  </div>
                  <span className="font-body-sm text-xs text-primary font-medium mt-0.5 truncate">
                    {weakestArea || 'POS & Transfer Verification'}
                  </span>
                </div>
              </div>

              {/* Begin your first module CTA if no data yet */}
              {!hasCompletedModules && !hasBaseline && (
                <div className="mt-1 flex items-center justify-between p-2 rounded-lg bg-primary/5 border border-primary/20">
                  <span className="text-xs text-primary font-medium">Begin your first module</span>
                  <Link
                    href={primaryModule ? `/training/${primaryModule.id}` : '/training'}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors"
                  >
                    <span>Begin your first module</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="pt-space-sm border-t border-border-subtle/60 flex items-center justify-between text-xs text-muted-text">
            <span>
              {effectiveImprovement !== null ? (
                <>Awareness Improvement: <strong className={effectiveImprovement >= 0 ? 'text-success-text' : 'text-warning-text'}>{effectiveImprovement >= 0 ? `+${effectiveImprovement}%` : `${effectiveImprovement}%`}</strong></>
              ) : !hasCompletedModules ? (
                <span>Complete your first training module to measure improvement.</span>
              ) : (
                <Link href="/assessment" className="text-secondary hover:underline flex items-center gap-1">
                  <span>Baseline not completed. • Take diagnostic to track improvement</span>
                  <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                </Link>
              )}
            </span>
            <Link href="/dashboard/progress" className="text-secondary hover:text-primary font-semibold flex items-center gap-1">
              <span>View Progress History</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Real-World Incident Protocol Carousel */}
        <div className="lg:col-span-5 h-full">
          <IncidentCarousel />
        </div>
      </div>

      {/* Priority Training for Your Business */}
      <section className="w-full flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-primary">Recommended for Your Business</h2>
            <p className="font-body-sm text-body-sm text-muted-text mt-0.5">
              Targeted modules to safeguard your daily business transfers, customer transactions, and data.
            </p>
          </div>
          <Link href="/training" className="font-label-sm text-label-sm text-secondary hover:text-primary font-semibold inline-flex items-center gap-1">
            <span>View All (15)</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </Link>
        </div>

        {/* Continue Learning Active Card */}
        {primaryModule && (
          <div className="bg-surface rounded-xl p-space-lg shadow-sm border border-secondary/20 flex flex-col md:flex-row md:items-center justify-between gap-space-md">
            <div className="flex flex-col gap-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-label-sm font-semibold text-secondary uppercase tracking-wider">
                  Module {String(primaryModule.order_index).padStart(2, '0')}
                </span>
                {primaryModule.is_weak_area && (
                  <span className="px-2 py-0.5 rounded-full bg-warning-bg text-warning-text font-label-sm text-label-sm font-semibold">
                    High Priority
                  </span>
                )}
              </div>
              <h3 className="font-headline-md text-headline-md text-primary">
                {primaryModule.title_en}
              </h3>
              <p className="font-body-sm text-body-sm text-muted-text">
                {primaryModule.threat_category ? `Protect your transactions against ${primaryModule.threat_category.replace(/_/g, ' ')} threats.` : 'Essential cybersecurity training for merchants.'}
              </p>
            </div>

            <div className="flex items-center gap-space-md shrink-0">
              <div className="flex items-center gap-1 text-muted-text font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                <span>{primaryModule.estimated_duration || 10} mins</span>
              </div>
              <Link 
                href={`/training/${primaryModule.id}`} 
                className="h-11 px-space-lg rounded-lg bg-primary hover:bg-primary-container text-on-primary font-body-md-semibold text-body-sm inline-flex items-center gap-1.5 transition-all shadow-sm"
              >
                <span>Start Training</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        )}

        {/* Secondary Modules */}
        {remainingRecommended.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {remainingRecommended.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        )}
      </section>

      {/* Practical Solo Merchant Defense Reminder */}
      <aside className="rounded-xl bg-surface border border-border-subtle p-space-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md shadow-sm">
        <div className="flex items-center gap-space-md">
          <div className="w-10 h-10 rounded-lg bg-warning-bg text-warning-text flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">verified_user</span>
          </div>
          <div>
            <h4 className="font-body-md-semibold text-body-md-semibold text-primary">Solo Merchant Security Rule</h4>
            <p className="font-body-sm text-body-sm text-muted-text mt-0.5">Always verify credit alerts directly inside your banking app before handing over high-value goods or cash.</p>
          </div>
        </div>
        <Link 
          href="/training" 
          className="shrink-0 text-secondary font-label-md text-label-md hover:text-primary transition-colors flex items-center gap-1"
        >
          <span>Review All Modules</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </Link>
      </aside>
    </div>
  )
}

// ----------------------------------------------------------------------
// 3. BUSINESS OWNER DASHBOARD VIEW
// ----------------------------------------------------------------------
export function OwnerDashboardView({
  profile,
  recommended = [],
  completed = [],
  teamReadiness,
  activeEmployeesCount,
  pendingInvitesCount = 0,
  quizMastery = 0,
  needsAttentionCount = 0,
  baselineScore,
  completionPercentage,
  avgQuizScore,
  humanFirewallScore,
  awarenessImprovement,
  awarenessLevel,
  strongestArea,
  weakestArea,
}: {
  profile: ProfileData
  recommended?: ModuleData[]
  allOthers?: ModuleData[]
  completed?: ModuleData[]
  teamReadiness: number
  activeEmployeesCount: number
  pendingInvitesCount?: number
  quizMastery?: number
  needsAttentionCount?: number
  baselineScore?: number | null
  completionPercentage?: number
  avgQuizScore?: number
  humanFirewallScore?: number
  awarenessImprovement?: number | null
  awarenessLevel?: 'Developing' | 'Aware' | 'Strong' | 'Highly Aware'
  strongestArea?: string | null
  weakestArea?: string | null
}) {
  const [copied, setCopied] = useState(false)
  const joinCode = profile.business_join_code || '---'

  const totalModules = 15;
  const ownerCompletionPct = completionPercentage ?? Math.round((completed.length / totalModules) * 100);
  const hasCompletedModules = completed.length > 0;
  const hasBaseline = typeof baselineScore === 'number';
  const effectiveBaseline = hasBaseline ? baselineScore : null;
  const effectiveQuizScore = avgQuizScore ?? (completed.length > 0 ? 100 : 0);
  // Approved Formula: HFS = (completion_percentage × 0.35) + (average_completed_module_quiz_score × 0.65)
  // Represents current cybersecurity awareness and training performance
  const ownerHFS = humanFirewallScore ?? Math.round((ownerCompletionPct * 0.35) + (effectiveQuizScore * 0.65));
  const effectiveImprovement = typeof awarenessImprovement === 'number'
    ? awarenessImprovement
    : ((hasBaseline && hasCompletedModules) ? ownerHFS - effectiveBaseline! : null);
  const effectiveLevel: 'Developing' | 'Aware' | 'Strong' | 'Highly Aware' = awarenessLevel ?? (
    ownerHFS >= 85 ? 'Highly Aware' :
    ownerHFS >= 70 ? 'Strong' :
    ownerHFS >= 50 ? 'Aware' : 'Developing'
  );
  const ownerPrimaryModule = recommended.length > 0 ? recommended[0] : null;

  const handleCopyCode = () => {
    if (profile.business_join_code) {
      navigator.clipboard.writeText(profile.business_join_code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex flex-col w-full gap-space-xl">
      {/* Welcome & Join Code Bar */}
      <section className="bg-surface rounded-xl shadow-sm p-space-lg md:p-space-xl border border-border-subtle/60 flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
        <div className="flex flex-col gap-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-secondary">storefront</span>
              {profile.business_name || 'Your Business'}
            </span>
            {profile.location && (
              <span className="text-xs text-muted-text">• {profile.location}</span>
            )}
          </div>
          <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight mt-1">
            Welcome back, {profile.full_name?.split(' ')[0] || 'Owner'}
          </h1>
          <p className="font-body-md text-body-md text-muted-text">
            Organizational cybersecurity awareness, staff training progress, and team resilience.
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-space-sm self-start lg:self-center">
          <button 
            type="button"
            onClick={handleCopyCode}
            className="flex items-center gap-space-xs bg-surface-container-low hover:bg-surface-container px-space-sm py-2 rounded-lg transition-colors border border-border-subtle/40"
            title="Click to copy team join code"
          >
            <span className="material-symbols-outlined text-muted-text text-base">pin</span>
            <div className="flex flex-col text-left">
              <span className="font-label-sm text-label-sm text-muted-text uppercase tracking-wider text-[10px]">Team Join Code</span>
              <span className="font-body-md-semibold text-body-md-semibold text-primary tracking-wider font-mono">
                {joinCode}
              </span>
            </div>
            <span className="material-symbols-outlined text-muted-text text-base ml-1">
              {copied ? 'check' : 'content_copy'}
            </span>
          </button>
          
          <Link 
            href="/dashboard/team/invite" 
            className="h-11 px-space-md rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md transition-colors shadow-sm flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-lg">person_add</span>
            <span>Invite Employee</span>
          </Link>
        </div>
      </section>

      {/* Hero Section: Team Human Firewall Score Dial + Incident Protocol Carousel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
        {/* Left Column: Team Human Firewall Score Dial */}
        <div className="lg:col-span-7 bg-surface rounded-xl shadow-sm p-space-lg md:p-space-xl flex flex-col justify-between border border-border-subtle/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
            <div>
              <span className="font-label-sm text-label-sm text-muted-text uppercase tracking-wider font-semibold">Staff Defense Readiness</span>
              <h2 className="font-headline-lg text-headline-lg text-primary">Organizational Awareness Score</h2>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-info-bg text-info-text self-start sm:self-auto font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-base">shield</span>
              <span>Target: 85%+</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-space-lg items-center my-auto py-space-sm">
            <div className="sm:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" fill="none" r="48" stroke="#E4E7EC" strokeLinecap="round" strokeWidth="10"></circle>
                  <circle 
                    className="transition-all duration-1000 ease-out" 
                    cx="60" cy="60" fill="none" r="48" 
                    stroke="#0060ac" 
                    strokeDasharray="301.6" 
                    strokeDashoffset={301.6 * (1 - (teamReadiness / 100))} 
                    strokeLinecap="round" 
                    strokeWidth="10"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-display-hero text-display-hero text-primary leading-none">
                    {teamReadiness}<span className="text-headline-md">%</span>
                  </span>
                  <span className="font-label-sm text-label-sm text-muted-text mt-1">Team Readiness</span>
                </div>
              </div>
            </div>

            <div className="sm:col-span-7 flex flex-col gap-space-sm">
              <p className="font-body-md text-body-md text-on-surface">
                Measures your workforce&apos;s collective training progress and verified quiz mastery across {activeEmployeesCount} active staff {activeEmployeesCount === 1 ? 'member' : 'members'}.
              </p>
              <div className="p-space-sm rounded-lg bg-surface-container-low flex items-start gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-xl mt-0.5">school</span>
                <div className="flex flex-col">
                  <span className="font-body-sm text-body-sm text-on-surface font-semibold">15 Defensive Training Modules</span>
                  <span className="font-body-sm text-body-sm text-muted-text">Staff learn spotting fake alerts, phishing, and POS hygiene.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-space-sm border-t border-border-subtle/60 flex items-center justify-between text-xs text-muted-text">
            <span>{activeEmployeesCount} staff enrolled</span>
            <Link href="/dashboard/team" className="text-secondary hover:text-primary font-semibold flex items-center gap-1">
              <span>Manage Team Roster</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Real-World Incident Protocol Carousel */}
        <div className="lg:col-span-5 h-full">
          <IncidentCarousel />
        </div>
      </div>

      {/* 4-Card Business Performance Metric Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        {/* Metric 1: Active Enrolled Team */}
        <div className="bg-surface rounded-xl shadow-sm p-space-md flex flex-col justify-between gap-space-sm border border-border-subtle/60">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-muted-text uppercase tracking-wider font-semibold">Team Size</span>
            <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-lg">badge</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-lg text-headline-lg text-primary">{activeEmployeesCount}</span>
            <span className="font-body-sm text-body-sm text-muted-text">Active staff in workspace</span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-border-subtle/40 text-xs">
            <span className="text-muted-text">Pending invites: {pendingInvitesCount}</span>
            <Link href="/dashboard/team/invite" className="text-secondary hover:underline font-semibold">+ Invite</Link>
          </div>
        </div>

        {/* Metric 2: Completed Modules */}
        <div className="bg-surface rounded-xl shadow-sm p-space-md flex flex-col justify-between gap-space-sm border border-border-subtle/60">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-muted-text uppercase tracking-wider font-semibold">Staff Completed</span>
            <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-lg">menu_book</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-lg text-headline-lg text-primary">{teamReadiness}%</span>
            <span className="font-body-sm text-body-sm text-muted-text">Workforce coverage rate</span>
          </div>
          <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
            <div className="bg-secondary h-full rounded-full transition-all duration-500" style={{ width: `${teamReadiness}%` }}></div>
          </div>
        </div>

        {/* Metric 3: Quiz Mastery Rate */}
        <div className="bg-surface rounded-xl shadow-sm p-space-md flex flex-col justify-between gap-space-sm border border-border-subtle/60">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-muted-text uppercase tracking-wider font-semibold">Quiz Mastery</span>
            <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-success-base">
              <span className="material-symbols-outlined text-lg">task_alt</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-lg text-headline-lg text-primary">
              {quizMastery > 0 ? `${quizMastery}% Avg` : '---'}
            </span>
            <span className="font-body-sm text-body-sm text-muted-text">
              {quizMastery > 0 ? 'First-pass quiz validation' : 'No quiz submissions yet'}
            </span>
          </div>
          <span className="text-xs text-muted-text pt-1">Passing benchmark: 80%</span>
        </div>

        {/* Metric 4: Attention Required */}
        <div className="bg-surface rounded-xl shadow-sm p-space-md flex flex-col justify-between gap-space-sm border border-border-subtle/60">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-muted-text uppercase tracking-wider font-semibold">Needs Attention</span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${needsAttentionCount > 0 ? 'bg-warning-bg text-warning-text' : 'bg-success-bg text-success-text'}`}>
              <span className="material-symbols-outlined text-lg">{needsAttentionCount > 0 ? 'help' : 'check'}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className={`font-headline-lg text-headline-lg ${needsAttentionCount > 0 ? 'text-warning-text' : 'text-primary'}`}>
              {needsAttentionCount} {needsAttentionCount === 1 ? 'Member' : 'Members'}
            </span>
            <span className="font-body-sm text-body-sm text-muted-text">
              {needsAttentionCount > 0 ? '0 completed modules so far' : 'All staff actively learning'}
            </span>
          </div>
          <Link href="/dashboard/team" className="text-secondary hover:underline font-label-sm text-label-sm pt-1 flex items-center gap-1">
            <span>Coaching details</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </Link>
        </div>
      </div>

      {/* Business Owner Personal Cybersecurity Awareness & Learning Track */}
      <section className="bg-surface rounded-xl p-space-lg md:p-space-xl shadow-sm border border-border-subtle/60 flex flex-col gap-space-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm border-b border-border-subtle/40 pb-space-sm">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-fixed/50 text-secondary font-label-sm text-label-sm font-semibold mb-1">
              <span className="material-symbols-outlined text-xs">shield_person</span>
              <span>Owner Defense Track</span>
            </div>
            <h2 className="font-headline-md text-headline-md text-primary">Your Personal Cybersecurity Awareness</h2>
            <p className="font-body-sm text-body-sm text-muted-text mt-0.5">
              Owner accounts are high-priority spear-phishing and BEC targets. Track your personal training alongside your staff.
            </p>
          </div>

          {effectiveImprovement !== null ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success-bg text-success-text font-label-sm text-label-sm self-start sm:self-auto font-medium">
              <span className="material-symbols-outlined text-[16px]">
                {effectiveImprovement >= 0 ? 'trending_up' : 'trending_down'}
              </span>
              <span>
                {effectiveImprovement >= 0 ? `+${effectiveImprovement}% Improvement` : `${effectiveImprovement}% Improvement`}
              </span>
            </div>
          ) : !hasCompletedModules ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-muted-text font-label-sm text-label-sm self-start sm:self-auto font-medium">
              <span className="material-symbols-outlined text-[16px]">school</span>
              <span>Complete your first training module to measure improvement.</span>
            </div>
          ) : (
            <Link href="/assessment" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-muted-text hover:text-primary font-label-sm text-label-sm self-start sm:self-auto font-medium transition-colors">
              <span className="material-symbols-outlined text-[16px]">assignment</span>
              <span>Baseline not completed.</span>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-space-lg items-center">
          {/* Owner HFS Metric */}
          <div className="md:col-span-4 flex items-center gap-space-md p-space-md rounded-xl bg-surface-container-low border border-border-subtle/30">
            <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle className="stroke-surface-container" cx="60" cy="60" fill="none" r="50" strokeWidth="10"></circle>
                <circle 
                  className="stroke-secondary transition-all duration-1000 ease-out" 
                  cx="60" cy="60" fill="none" r="50" 
                  strokeDasharray="314.16" 
                  strokeDashoffset={314.16 * (1 - (ownerHFS / 100))} 
                  strokeLinecap="round" 
                  strokeWidth="10"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-headline-md text-headline-md text-primary font-bold leading-none">{ownerHFS}%</span>
                <span className={`inline-flex items-center px-1.5 py-0.2 mt-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                  effectiveLevel === 'Highly Aware' ? 'bg-success-bg text-success-text' :
                  effectiveLevel === 'Strong' ? 'bg-secondary-fixed/50 text-secondary' :
                  effectiveLevel === 'Aware' ? 'bg-info-bg text-info-text' :
                  'bg-surface-container-high text-muted-text'
                }`}>
                  {effectiveLevel}
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-muted-text uppercase tracking-wider font-semibold">Your Personal HFS</span>
              <span className="font-body-md-semibold text-body-md text-primary mt-0.5">Cybersecurity Awareness</span>
              <span className="font-body-sm text-xs text-muted-text">Formula: 35% modules + 65% quiz</span>
            </div>
          </div>

          {/* Breakdown Stats */}
          <div className="md:col-span-4 grid grid-cols-3 gap-space-xs text-center">
            <div className="p-space-sm rounded-lg bg-surface-container-low">
              <span className="font-headline-sm text-headline-sm text-primary font-bold block">{effectiveBaseline !== null ? `${effectiveBaseline}%` : '---'}</span>
              <span className="font-label-sm text-label-sm text-muted-text block text-[11px]">Baseline</span>
            </div>
            <div className="p-space-sm rounded-lg bg-surface-container-low">
              <span className="font-headline-sm text-headline-sm text-primary font-bold block">{completed.length}/15</span>
              <span className="font-label-sm text-label-sm text-muted-text block text-[11px]">Modules</span>
            </div>
            <div className="p-space-sm rounded-lg bg-surface-container-low">
              <span className="font-headline-sm text-headline-sm text-primary font-bold block">{effectiveQuizScore > 0 ? `${effectiveQuizScore}%` : '---'}</span>
              <span className="font-label-sm text-label-sm text-muted-text block text-[11px]">Quiz Avg</span>
            </div>
          </div>

          {/* Next Recommended Module for Owner */}
          <div className="md:col-span-4 flex flex-col gap-2 p-space-md rounded-xl bg-surface-container-low border border-border-subtle/30">
            <span className="font-label-sm text-label-sm text-muted-text uppercase tracking-wider font-semibold">Recommended for You</span>
            {ownerPrimaryModule ? (
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col overflow-hidden">
                  <span className="font-body-md-semibold text-body-md text-primary truncate">{ownerPrimaryModule.title_en}</span>
                  <span className="font-body-sm text-xs text-muted-text">Module {String(ownerPrimaryModule.order_index).padStart(2, '0')} • {ownerPrimaryModule.estimated_duration || 10} mins</span>
                </div>
                <Link
                  href={`/training/${ownerPrimaryModule.id}`}
                  className="shrink-0 px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-sm text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  <span>Start</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-2">
                <span className="font-body-sm text-sm text-muted-text">All core modules completed!</span>
                <Link
                  href="/training"
                  className="shrink-0 px-3 py-1.5 rounded-lg bg-surface hover:bg-surface-container text-primary font-label-sm text-xs border border-border-subtle transition-colors"
                >
                  Review
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Strongest & Priority Focus Areas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
          <div className="p-3 rounded-lg bg-surface-container-low border border-border-subtle/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-success-bg text-success-text flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[16px]">verified</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-muted-text uppercase tracking-wider">Strongest Area</span>
                <span className="text-sm font-semibold text-primary">
                  {strongestArea || (completed.length > 0 ? 'Core Defense' : 'Pending Quizzes')}
                </span>
              </div>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-surface-container-low border border-border-subtle/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-warning-bg text-warning-text flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[16px]">crisis_alert</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-muted-text uppercase tracking-wider">Priority Focus</span>
                <span className="text-sm font-semibold text-primary">
                  {weakestArea || 'Executive Spear-Phishing & Wire Transfers'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Begin your first module CTA if no data yet */}
        {!hasCompletedModules && !hasBaseline && (
          <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">school</span>
              <span className="text-xs text-primary font-medium">Begin your first module to establish personal defense metrics.</span>
            </div>
            <Link
              href={ownerPrimaryModule ? `/training/${ownerPrimaryModule.id}` : '/training'}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors"
            >
              <span>Begin your first module</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </div>
        )}

        <div className="flex items-center justify-between pt-space-xs border-t border-border-subtle/40 text-xs text-muted-text">
          <span>
            {effectiveImprovement !== null ? (
              <>Your Awareness Improvement: <strong className={effectiveImprovement >= 0 ? 'text-success-text' : 'text-warning-text'}>{effectiveImprovement >= 0 ? `+${effectiveImprovement}%` : `${effectiveImprovement}%`}</strong></>
            ) : !hasCompletedModules ? (
              <span>Complete your first training module to measure improvement.</span>
            ) : (
              <span className="text-muted-text">Baseline not completed. • <Link href="/assessment" className="text-secondary hover:underline font-semibold">Take diagnostic</Link></span>
            )}
          </span>
          <Link href="/dashboard/progress" className="text-secondary hover:text-primary font-semibold flex items-center gap-1">
            <span>View Personal Progress Details</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* Concise Owner Action Banner */}
      <section className="bg-surface rounded-xl p-space-lg shadow-sm border border-border-subtle/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">
        <div className="flex items-start gap-space-sm">
          <div className="w-10 h-10 rounded-lg bg-info-bg text-info-text flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined">group</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <h3 className="font-headline-sm text-headline-sm text-primary">Team Management & Invitations</h3>
            <p className="font-body-sm text-body-sm text-muted-text">Monitor individual employee training velocity or invite new staff members to your workspace.</p>
          </div>
        </div>
        <Link 
          href="/dashboard/team" 
          className="shrink-0 h-11 px-space-lg rounded-lg bg-primary hover:bg-primary-container text-on-primary font-body-md-semibold text-body-sm inline-flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <span>Open Team Roster</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </section>
    </div>
  )
}

// ----------------------------------------------------------------------
// SHARED COMPONENTS
// ----------------------------------------------------------------------
function ModuleCard({ module }: { module: ModuleData }) {
  return (
    <div className="bg-surface rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between group border border-border-subtle/60">
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm font-semibold text-secondary uppercase tracking-wider">
            Module {String(module.order_index).padStart(2, '0')}
          </span>
          {module.is_weak_area && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
              <span className="material-symbols-outlined text-[12px]">warning</span>
              Flagged
            </span>
          )}
        </div>
        <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors mt-1 line-clamp-1">
          {module.title_en}
        </h3>
        <p className="font-body-sm text-body-sm text-muted-text line-clamp-2">
          {module.threat_category ? `Protect against ${module.threat_category.replace(/_/g, ' ')} threats.` : 'Essential cybersecurity training.'}
        </p>
      </div>
      <div className="pt-space-md mt-space-sm flex items-center justify-between border-t border-border-subtle/40">
        <div className="flex items-center gap-1.5 text-muted-text font-label-sm text-label-sm">
          <span className="material-symbols-outlined text-[16px]">schedule</span>
          <span>{module.estimated_duration || 10} mins</span>
        </div>
        <Link 
          href={`/training/${module.id}`} 
          className="h-8 px-3 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-body-md-semibold text-xs inline-flex items-center gap-1 transition-all"
        >
          <span>Start</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        </Link>
      </div>
    </div>
  )
}
