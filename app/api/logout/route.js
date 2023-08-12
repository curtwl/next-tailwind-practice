import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req) {
    cookies().delete('userCookie')
    return NextResponse.json({ message: 'Cookie deleted' })
}