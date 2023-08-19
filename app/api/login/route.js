import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import prisma from '../../../lib/prisma'
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'

export const runtime = 'nodejs'

async function loginWithPassword(body) {
  const { username, password } = body
  console.log(body, 'loginWithPassword')

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  })
  
  const passwordIsCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordIsCorrect)) {
    return NextResponse.json({ error: 'invalid username or password' }, { status: 401 })
  }
  const userForToken = {
    username: user.username,
    id: user.id,
  }
  
  const accessToken = jwt.sign(
    {
      username: user.username,
      id: user.id,
    }, 
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '10s' }
  )
    
  const refreshToken = jwt.sign(
    userForToken,
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  )
  console.log('access', accessToken)
  console.log('refresh', refreshToken)
  const cookieStore = cookies()
  cookieStore.set('userCookie', refreshToken, { maxAge: 7*24*60*60*1000,  httpOnly: true })
  return NextResponse.json({ accessToken, username: user.username, id: user.id }, { status: 200 })
}

export async function POST(req) {
  const body = await req.json()
  const cookieStore = cookies()
  const tokenFromCookie = cookieStore.get('userCookie')
  console.log(tokenFromCookie,'tokenFromCookie')

  if (body.password) {
    return loginWithPassword(body)
  } else if (tokenFromCookie) {
    console.log('got here')
    const decodedToken = jwt.verify(tokenFromCookie.value, process.env.REFRESH_TOKEN_SECRET)
    
    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.id,
      },
    })

    if (user) {
      return NextResponse.json({ tokenFromCookie, username: decodedToken.username, id: decodedToken.id }, { status: 200 })
    } else {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
        //.clearCookie("token")
    }
  } else {
    //console.log(req,'no password or cookie')
    return NextResponse.json({ error: 'No password or cookie provided' }, { status: 400 })
  }
}