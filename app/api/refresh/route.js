import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
const jwt = require('jsonwebtoken')

export const config = {
    runtime: 'server',
  }

export async function GET(req) {
    const body = await req.json()
    const cookieStore = cookies()
    const cookieToDecode = cookieStore.get('userCookie')

    if (!cookieToDecode)
      return NextResponse.status(401).json({ error: 'Unauthorized' })
    
    const decodedToken = jwt.verify(cookieToDecode, process.env.REFRESH_TOKEN_SECRET)
    
    if (!decodedToken)
      return NextResponse.status(401).json({ error: 'Unauthorized' })

    const accessToken = jwt.sign(
      {
        username: decodedToken.username,
        id: decodedToken.id,
      }, 
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '11s' }
    )

    NextResponse.json({ accessToken })
}