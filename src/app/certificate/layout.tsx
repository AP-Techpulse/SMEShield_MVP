import { LanguageProvider } from '@/contexts/LanguageContext'

export default function CertificateLayout({
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
