const bcrypt = require('bcrypt')
import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'
const jwt = require('jsonwebtoken')
import { cookies } from 'next/headers'

export const runtime = 'nodejs'

async function verifyToken(token) {
    if (token) {
      let decodedToken = null
      try {
        decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        return decodedToken
      } catch (error) {
        return null
      }
    }
    return null
  }

export async function POST(req) {
  const body = await req.json()
  const { username, password } = body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = await prisma.user.create({
    data: {
        username,
        passwordHash
    }
  })
  
  return NextResponse.json(user.username, { status: 201 })
}

export async function DELETE(req) {
  const cookieStore = cookies()
  const cookieToDecode = cookieStore.get('userCookie')
  
  const decodedToken = await verifyToken(cookieToDecode?.value)
  console.log(decodedToken)
  
    if (!decodedToken.id) {
      return NextResponse.json({ error: 'Invalid token' })
    }
    
    try {
        await prisma.user.delete({
          where: {
            id: decodedToken.id,
          },
        })
      } catch (error) {
        return NextResponse.json({ message: 'error', type: error })
      }

      return NextResponse.json({ message: 'Your account has been successfully deleted', status: 204, type: success })
}
