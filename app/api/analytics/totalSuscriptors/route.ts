import { getSubscribersByMonth } from '@/actions/getSuscribersByMonth'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const data = await getSubscribersByMonth()
    return NextResponse.json(data)
  } catch (error) {
    console.error('[TOTAL_SUSCRIPTORS]', error)
    return NextResponse.json({ error })
  }
}
