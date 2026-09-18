import React from 'react'

interface Props {
  content: string
}

export function MarkdownRenderer({ content }: Props) {
  if (!content) return null

  // Split by newlines, preserving empty lines
  const lines = content.split('\n')
  
  const renderLine = (line: string, index: number) => {
    const trimmed = line.trim()
    
    if (!trimmed) {
      return <div key={`empty-${index}`} className="h-4" /> // Spacing for empty lines
    }

    // Process bold text using regex replacement before rendering element
    const processInlineText = (text: string) => {
      // Split by ** to find bold parts
      const parts = text.split(/(\*\*.*?\*\*)/g)
      return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-semibold text-primary">{part.slice(2, -2)}</strong>
        }
        return <span key={i}>{part}</span>
      })
    }

    // Headings
    if (trimmed.startsWith('# ')) {
      return <h1 key={index} className="text-3xl font-serif font-bold text-primary mb-4 mt-6">{processInlineText(trimmed.slice(2))}</h1>
    }
    if (trimmed.startsWith('## ')) {
      return <h2 key={index} className="text-2xl font-serif font-bold text-primary mb-3 mt-5">{processInlineText(trimmed.slice(3))}</h2>
    }
    if (trimmed.startsWith('### ')) {
      return <h3 key={index} className="text-xl font-serif font-bold text-primary mb-2 mt-4">{processInlineText(trimmed.slice(4))}</h3>
    }
    if (trimmed.startsWith('#### ')) {
      return <h4 key={index} className="text-lg font-serif font-bold text-primary mb-2 mt-3">{processInlineText(trimmed.slice(5))}</h4>
    }

    // Unordered list
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      return (
        <ul key={index} className="list-disc list-inside mb-2 ml-2">
          <li className="text-base text-on-surface-variant leading-relaxed">
            {processInlineText(trimmed.slice(2))}
          </li>
        </ul>
      )
    }

    // Numbered list
    const numberedListMatch = trimmed.match(/^(\d+)\.\s+(.*)/)
    if (numberedListMatch) {
      return (
        <ol key={index} className="list-decimal list-inside mb-2 ml-2" start={parseInt(numberedListMatch[1], 10)}>
          <li className="text-base text-on-surface-variant leading-relaxed">
            {processInlineText(numberedListMatch[2])}
          </li>
        </ol>
      )
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      return (
        <blockquote key={index} className="border-l-4 border-primary-container pl-4 italic text-muted-text mb-4">
          {processInlineText(trimmed.slice(2))}
        </blockquote>
      )
    }

    // Standard paragraph
    return (
      <p key={index} className="text-base text-on-surface-variant leading-relaxed mb-4">
        {processInlineText(trimmed)}
      </p>
    )
  }

  // To group consecutive list items together properly:
  const elements: React.ReactNode[] = []
  let currentListType: 'ul' | 'ol' | null = null
  let currentListItems: React.ReactNode[] = []
  let listStartIndex = 0

  const flushList = () => {
    if (currentListType && currentListItems.length > 0) {
      const ListTag = currentListType
      elements.push(
        <ListTag 
          key={`list-${elements.length}`} 
          className={`${currentListType === 'ul' ? 'list-disc' : 'list-decimal'} list-inside mb-4 ml-2 space-y-1`}
          start={currentListType === 'ol' ? listStartIndex : undefined}
        >
          {currentListItems}
        </ListTag>
      )
      currentListItems = []
      currentListType = null
    }
  }

  lines.forEach((line, index) => {
    const trimmed = line.trim()
    
    // Check if list item
    const isUl = trimmed.startsWith('- ') || trimmed.startsWith('* ')
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/)
    
    if (isUl) {
      if (currentListType === 'ol') flushList()
      currentListType = 'ul'
      
      const processInlineText = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g)
        return parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-semibold text-primary">{part.slice(2, -2)}</strong>
          }
          return <span key={i}>{part}</span>
        })
      }
      
      currentListItems.push(
        <li key={index} className="text-base text-on-surface-variant leading-relaxed pl-1">
          {processInlineText(trimmed.slice(2))}
        </li>
      )
    } else if (numMatch) {
      if (currentListType === 'ul') flushList()
      if (!currentListType) {
        listStartIndex = parseInt(numMatch[1], 10)
      }
      currentListType = 'ol'
      
      const processInlineText = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g)
        return parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-semibold text-primary">{part.slice(2, -2)}</strong>
          }
          return <span key={i}>{part}</span>
        })
      }
      
      currentListItems.push(
        <li key={index} className="text-base text-on-surface-variant leading-relaxed pl-1">
          {processInlineText(numMatch[2])}
        </li>
      )
    } else {
      flushList()
      if (trimmed || line === '') {
        elements.push(renderLine(line, index))
      }
    }
  })
  
  flushList()

  return <div className="markdown-content">{elements}</div>
}
