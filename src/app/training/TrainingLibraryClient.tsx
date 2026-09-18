"use client"

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { ModuleData } from '@/lib/adaptive-engine'

export interface ExtendedModuleData extends ModuleData {
  status: 'not_started' | 'in_progress' | 'completed'
  is_recommended: boolean
}

interface TrainingLibraryClientProps {
  modules: ExtendedModuleData[]
  totalCompleted: number
}

export default function TrainingLibraryClient({ modules, totalCompleted }: TrainingLibraryClientProps) {
  const [filter, setFilter] = useState<'all' | 'recommended' | 'in_progress' | 'completed'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [languageFilter, setLanguageFilter] = useState('english')

  const filteredModules = useMemo(() => {
    return modules.filter(m => {
      // Basic text search
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        if (!m.title_en.toLowerCase().includes(query) && !m.threat_category.toLowerCase().includes(query)) {
          return false
        }
      }
      
      // Category filter
      if (categoryFilter !== 'all' && m.threat_category !== categoryFilter) {
        return false
      }

      // Tab filter
      if (filter === 'recommended' && !m.is_recommended) return false
      if (filter === 'in_progress' && m.status !== 'in_progress') return false
      if (filter === 'completed' && m.status !== 'completed') return false
      
      return true
    })
  }, [modules, filter, searchQuery, categoryFilter])

  const recommendedCount = modules.filter(m => m.is_recommended).length
  const inProgressCount = modules.filter(m => m.status === 'in_progress').length
  const completedCount = modules.filter(m => m.status === 'completed').length

  const priorityModules = useMemo(() => modules.filter(m => m.is_recommended), [modules])
  const topModule = useMemo(() => modules.find(m => m.status === 'in_progress') || priorityModules[0] || modules[0], [modules, priorityModules])

  const getStatusDisplay = (mod: ExtendedModuleData) => {
    if (mod.status === 'completed') {
      return (
        <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-success-text bg-success-bg px-2.5 py-0.5 rounded-full">
          <span className="material-symbols-outlined text-[14px]">check_circle</span> Completed
        </span>
      )
    }
    if (mod.status === 'in_progress') {
      return (
        <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-warning-text bg-warning-bg px-2.5 py-0.5 rounded-full">
          <span className="material-symbols-outlined text-[14px]">timelapse</span> In Progress
        </span>
      )
    }
    return (
      <span className="font-label-sm text-label-sm text-muted-text bg-surface-container px-2.5 py-0.5 rounded-full">
        Not Started
      </span>
    )
  }

  const getProgressBar = (mod: ExtendedModuleData) => {
    if (mod.status === 'completed') return 100
    if (mod.status === 'in_progress') return 50
    return 0
  }

  return (
    <div className="flex flex-col w-full">
      {/* Top Visual Banner */}
      <section className="relative w-full rounded-2xl overflow-hidden bg-primary shadow-lg mb-8 lg:mb-12 text-on-primary">
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen" 
          style={{ backgroundImage: 'radial-gradient(#d7e2ff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 lg:p-12">
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-surface-tint/30 text-primary-fixed">
              <span className="material-symbols-outlined text-[16px] text-info-base">verified_user</span>
              <span className="font-label-sm text-label-sm tracking-wide">NDPA 2023 Compliant Workplace Readiness</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-[44px] lg:leading-[56px] font-bold text-on-primary">
              Training Curriculum Library
            </h1>
            <p className="text-primary-fixed-dim max-w-2xl text-base md:text-lg">
              15 practical, bite-sized cybersecurity awareness modules built specifically for Nigerian workplace realities. Available in English & Pidgin with authentic operational threat scenarios.
            </p>
            
            {/* Quick Impact Metrics */}
            <div className="pt-4 grid grid-cols-3 gap-4 max-w-lg">
              <div className="flex flex-col">
                <span className="font-serif text-xl md:text-2xl font-bold text-on-primary">{totalCompleted} / {modules.length}</span>
                <span className="text-xs md:text-sm text-surface-dim">Completed Modules</span>
              </div>
              <div className="flex flex-col border-l border-primary-container pl-4">
                <span className="font-serif text-xl md:text-2xl font-bold text-success-base">85%</span>
                <span className="text-xs md:text-sm text-surface-dim">Average Quiz Score</span>
              </div>
              <div className="flex flex-col border-l border-primary-container pl-4">
                <span className="font-serif text-xl md:text-2xl font-bold text-secondary-container">55m</span>
                <span className="text-xs md:text-sm text-surface-dim">Total Est. Time</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-primary-container h-full min-h-[320px]">
              <div className="absolute inset-0 bg-surface-variant flex items-center justify-center">
                {topModule ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={topModule.image_url || '/assets/smeshield/scenarios/employee-learning-laptop.jpg'} alt={topModule.title_en} className="w-full h-full object-cover" />
                ) : (
                  <span className="material-symbols-outlined text-muted-text text-[48px]">video_library</span>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-warning-base text-[24px]">flag</span>
                    <div>
                      <p className="font-semibold text-sm text-white">Current Priority Threats</p>
                      <p className="text-xs text-white/80">Tailored to your business profile</p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded bg-primary text-white border border-white/20 font-medium">{recommendedCount} Key Modules</span>
                </div>
                {priorityModules.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/20">
                    {priorityModules.slice(0, 2).map(mod => (
                      <div key={mod.id} className="flex items-center gap-1.5 text-xs text-white/90">
                        <span className="material-symbols-outlined text-[14px] text-warning-base">menu_book</span>
                        <span className="line-clamp-1">Mod {String(mod.order_index).padStart(2, '0')}: {mod.title_en}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section with Premium Brand Gradient Wrapper */}
      <div className="relative rounded-2xl p-4 sm:p-6 mb-16 border border-secondary/20 shadow-sm bg-gradient-to-br from-surface via-surface-container-low to-primary/5 overflow-hidden">
        {/* Ambient Subtle Motion Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/10 to-primary/5 opacity-60 pointer-events-none animate-calm-gradient" />

        <div className="relative z-10 flex flex-col gap-6">
          {/* Filter Tabs & Search */}
          <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2">
          <div className="inline-flex p-1 rounded-xl bg-surface-container shadow-sm overflow-x-auto max-w-full">
            <button 
              onClick={() => setFilter('all')}
              className={`h-10 px-4 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${filter === 'all' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              All Modules <span className="ml-1 opacity-80">({modules.length})</span>
            </button>
            <button 
              onClick={() => setFilter('recommended')}
              className={`h-10 px-4 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${filter === 'recommended' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Recommended <span className="ml-1 text-info-text">({recommendedCount})</span>
            </button>
            <button 
              onClick={() => setFilter('in_progress')}
              className={`h-10 px-4 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${filter === 'in_progress' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              In Progress <span className="ml-1 text-warning-text">({inProgressCount})</span>
            </button>
            <button 
              onClick={() => setFilter('completed')}
              className={`h-10 px-4 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${filter === 'completed' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Completed <span className="ml-1 text-success-text">({completedCount})</span>
            </button>
          </div>
          <div className="text-right hidden sm:block shrink-0">
            <span className="text-sm text-muted-text">Showing <strong className="text-primary">{filteredModules.length}</strong> modules</span>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 rounded-xl bg-surface border border-border-subtle shadow-sm">
          <div className="md:col-span-6 relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-muted-text text-[20px] pointer-events-none">search</span>
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 bg-app-bg text-on-surface rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary transition-all" 
              placeholder="Search modules or threat topics..." 
              type="text" 
            />
          </div>
          <div className="md:col-span-3 relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-muted-text text-[20px] pointer-events-none">filter_alt</span>
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full h-11 pl-10 pr-8 bg-app-bg text-on-surface rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
            >
              <option value="all">All Threats</option>
              {Array.from(new Set(modules.map(m => m.threat_category))).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-3 text-muted-text text-[20px] pointer-events-none">expand_more</span>
          </div>
          <div className="md:col-span-3 relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-muted-text text-[20px] pointer-events-none">translate</span>
            <select 
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className="w-full h-11 pl-10 pr-8 bg-app-bg text-on-surface rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
            >
              <option value="english">English</option>
              <option value="pidgin">Nigerian Pidgin</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 text-muted-text text-[20px] pointer-events-none">expand_more</span>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filteredModules.length === 0 ? (
          <div className="col-span-full py-16 px-6 text-center rounded-2xl bg-surface border border-border-subtle shadow-sm flex flex-col items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center text-muted-text">
              <span className="material-symbols-outlined text-[32px]">search_off</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-primary">No matching modules found</h3>
            <p className="text-sm text-muted-text max-w-md">
              We couldn&apos;t find any training modules matching &quot;{searchQuery || categoryFilter}&quot;. Try adjusting your filters or search keywords.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setCategoryFilter('all'); setFilter('all'); }}
              className="mt-2 px-5 py-2.5 rounded-lg bg-primary text-on-primary text-sm font-semibold hover:bg-primary-container transition-all shadow-sm"
              type="button"
            >
              Reset All Filters
            </button>
          </div>
        ) : filteredModules.map(mod => (
          <Link 
            href={`/training/${mod.id}`} 
            key={mod.id} 
            className={`group flex flex-col justify-between rounded-xl bg-surface border border-border-subtle shadow-sm card-hover overflow-hidden transition-all duration-200 ${mod.is_recommended ? 'ring-2 ring-info-base/30' : ''}`}
          >
            {/* Visual Scenario Thumbnail */}
            <div className="relative w-full h-44 bg-primary-container overflow-hidden">
              {mod.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={mod.image_url} 
                  alt={mod.title_en} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-primary-fixed">
                  <span className="material-symbols-outlined text-[40px] opacity-40">security</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent pointer-events-none" />
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-surface text-primary border border-border-subtle shadow-xs">
                  Module {(mod.order_index).toString().padStart(2, '0')}
                </span>
                {mod.is_recommended && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-info-text bg-info-bg px-2 py-0.5 rounded-full border border-info-base/20 shadow-xs">
                    Recommended
                  </span>
                )}
              </div>
              <div className="absolute top-3 right-3">
                {getStatusDisplay(mod)}
              </div>
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-white/90">
                <span className="uppercase tracking-wider font-semibold text-[10px] text-white/90 bg-primary/80 px-2 py-0.5 rounded border border-white/15">
                  {mod.threat_category.replace('_', ' ')}
                </span>
                <span className="flex items-center gap-1 bg-primary/80 px-2 py-0.5 rounded text-[11px] border border-white/15">
                  <span className="material-symbols-outlined text-[12px]">schedule</span> {mod.estimated_duration || 5} mins
                </span>
              </div>
            </div>

            <div className="flex flex-col flex-1 justify-between p-5">
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-lg font-bold text-primary group-hover:text-secondary transition-colors line-clamp-2">
                  {mod.title_en}
                </h3>
                <p className="text-sm text-muted-text line-clamp-2">
                  {mod.description_en || 'Learn about this critical cybersecurity topic and how it affects your business.'}
                </p>
              </div>
              
              <div className="pt-4 mt-4 flex flex-col gap-3 border-t border-surface-container">
                <div className="flex items-center justify-between text-sm">
                  <span className={`text-xs font-medium ${mod.status === 'completed' ? 'text-success-text font-semibold flex items-center gap-1' : mod.status === 'in_progress' ? 'text-warning-text' : 'text-muted-text'}`}>
                    {mod.status === 'completed' ? (
                      <><span className="material-symbols-outlined text-[14px]">check_circle</span> Completed</>
                    ) : mod.status === 'in_progress' ? (
                      'In Progress'
                    ) : (
                      'Ready to start'
                    )}
                  </span>
                  <span className="text-xs text-muted-text">{getProgressBar(mod)}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${mod.status === 'completed' ? 'bg-success-base' : mod.status === 'in_progress' ? 'bg-warning-base' : 'bg-primary/20'}`} 
                    style={{ width: `${getProgressBar(mod)}%` }} 
                  />
                </div>
                <button 
                  className={`w-full h-10 mt-1 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 
                    ${mod.status === 'completed' 
                      ? 'bg-surface-container text-primary hover:bg-surface-container-high' 
                      : 'bg-primary text-on-primary hover:bg-primary-container shadow-sm'}`} 
                  type="button"
                  tabIndex={-1}
                >
                  {mod.status === 'completed' ? (
                    <><span className="material-symbols-outlined text-[16px]">replay</span> Review Module</>
                  ) : mod.status === 'in_progress' ? (
                    <><span className="material-symbols-outlined text-[16px]">play_arrow</span> Resume Module</>
                  ) : (
                    'Start Module'
                  )}
                </button>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  </div>
</div>
  )
}
