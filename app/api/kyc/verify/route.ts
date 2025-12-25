import { NextRequest, NextResponse } from 'next/server'
import { verifyAgeWithUIDAI } from '@/lib/uidai-kyc'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { aadhaar } = body

    if (!aadhaar) {
      return NextResponse.json(
        { success: false, message: 'Aadhaar number is required' },
        { status: 400 }
      )
    }

    // Perform age verification
    const result = await verifyAgeWithUIDAI(aadhaar)

    return NextResponse.json(result, { 
      status: result.success ? 200 : 400 
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
