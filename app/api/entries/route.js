import { NextResponse } from 'next/server'
import dbConnect from '../../utils/dbConnect'
import Entry from '../../models/entry'
import User from '../../models/user'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export const config = {
  runtime: 'server',
}

async function verifyToken(token) {
  if (token) {
    let decodedToken = null
    try {
      decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
      return decodedToken;
    } catch (error) {
      return null
    }
  }
  return null
}

export async function GET(req) {
const decodedToken = await verifyToken(req)
  if (decodedToken?.id) {
    try {
      const entries = await Entry.find({ author: decodedToken.id })
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

  const decodedToken = await verifyToken(cookieToDecode.value)
  console.log(decodedToken)
  
  if (decodedToken?.id) {
    try {
      const user = await User.findById(decodedToken.id)
      const entry = new Entry({
        title: body.title,
        content: body.content,
        author: user._id,
      })
      const savedEntry = await entry.save()
      user.entries = user.entries.concat(savedEntry._id)
      await user.save()
      return NextResponse.json(savedEntry, { status: 201 })
    } catch (error) {
        console.log(error)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  } 
    
  return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
}