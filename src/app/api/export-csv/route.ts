import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  const supabase = await createClient()

  // 1. Authenticate user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  // 2. Verify business owner status
  const { data: profile } = await supabase
    .from('users')
    .select('role, business_id')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'business_owner' || !profile.business_id) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  // 3. Fetch team members
  const { data: employees } = await supabase
    .from('users')
    .select('id, full_name, role, created_at')
    .eq('business_id', profile.business_id)
    .order('created_at', { ascending: true })

  if (!employees) {
    return new NextResponse('No employees found', { status: 404 })
  }

  // 4. Fetch their progress
  const employeeIds = employees.map(e => e.id)
  const { data: teamProgress } = await supabase
    .from('user_progress')
    .select('user_id, status')
    .in('user_id', employeeIds)
    .eq('status', 'completed')

  // 5. Generate CSV
  const headers = ['Name', 'Role', 'Modules Completed', 'Date Joined']
  
  const rows = employees.map(emp => {
    const completedCount = teamProgress?.filter(p => p.user_id === emp.id).length || 0
    const dateJoined = new Date(emp.created_at).toLocaleDateString('en-GB')
    
    // Wrap strings in quotes to handle commas in names
    return [
      `"${emp.full_name || ''}"`,
      `"${emp.role}"`,
      completedCount,
      `"${dateJoined}"`
    ].join(',')
  })

  const csvContent = [headers.join(','), ...rows].join('\n')

  // 6. Return standard file download response
  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="team_compliance_report_${new Date().toISOString().split('T')[0]}.csv"`
    }
  })
}
