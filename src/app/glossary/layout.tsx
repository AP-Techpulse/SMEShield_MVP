import { LanguageProvider } from '@/contexts/LanguageContext'

export default function GlossaryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  )
}
