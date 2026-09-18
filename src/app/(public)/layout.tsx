import { LanguageProvider } from '@/contexts/LanguageContext'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PublicFooter } from '@/components/layout/PublicFooter'

export default function PublicRouteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LanguageProvider>
      <PublicLayout>
        {children}
        <PublicFooter />
      </PublicLayout>
    </LanguageProvider>
  )
}
