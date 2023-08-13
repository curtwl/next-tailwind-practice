import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'
import jwt from 'jsonwebtoken'
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

export async function GET(req) {
  const cookieStore = cookies()
  const cookieToDecode = cookieStore.get('userCookie')
  const decodedToken = await verifyToken(cookieToDecode?.value)
  
  if (decodedToken?.id) {
    try {
      const entries = await prisma.entry.findMany({
        where: {
          author: {
            id: decodedToken.id
          }
        }
      })

      return NextResponse.json(entries)

    } catch (error) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  } 
  return NextResponse.json([], { status: 200 })
}

export async function POST(req) {
  const body = await req.json()
  const cookieStore = cookies()
  const cookieToDecode = cookieStore.get('userCookie')

  const decodedToken = await verifyToken(cookieToDecode?.value)
  console.log(decodedToken)
  
  if (decodedToken?.id) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: decodedToken.id,
        },
      })

      const savedEntry = await prisma.entry.create({
        data: {
          title: body.title,
          content: body.content,
          author: {
            connect: {
              id: user.id,
            },
          },
        },
      })

      return NextResponse.json(savedEntry, { status: 201 })
    } catch (error) {
        console.log(error)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  } 
    
  return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
}