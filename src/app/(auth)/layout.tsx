import { LanguageProvider } from '@/contexts/LanguageContext'
import { AuthLayout } from '@/components/layout/AuthLayout'

export default function AuthRouteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LanguageProvider>
      <AuthLayout>
        {children}
      </AuthLayout>
    </LanguageProvider>
  )
}
