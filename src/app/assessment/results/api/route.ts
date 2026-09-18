import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let query = supabase
    .from('baseline_results')
    .select('*')
    .eq('user_id', user.id)

  if (id) {
    query = query.eq('id', id)
  } else {
    query = query.order('created_at', { ascending: false }).limit(1)
  }

  const { data, error } = await query.maybeSingle()

  if (error || !data) {
    return NextResponse.json({ error: 'Result not found' }, { status: 404 })
  }

  return NextResponse.json(data)
}
