import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import dbConnect from '../../utils/dbConnect'
import bcrypt from 'bcrypt'
import User from '../../models/user'
import { cookies } from 'next/headers'

export const runtime = 'nodejs'

async function loginWithPassword(body) {
  const { username, password } = body
  console.log(body, 'loginWithPassword')

  const user = await User.findOne({ username })
  
  const passwordIsCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordIsCorrect)) {
    return NextResponse.json({ error: 'invalid username or password' }, { status: 401 })
  }
  const userForToken = {
    username: user.username,
    id: user._id,
  }
  
  const accessToken = jwt.sign(
    {
      username: user.username,
      id: user._id,
    }, 
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '6s' }
    )
    
    const refreshToken = jwt.sign(
      userForToken,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
      )
      
      const cookieStore = cookies()
      cookieStore.set('userCookie', refreshToken, { httpOnly: true })
      const tokenFromCookiet = cookieStore.get('userCookie')
      console.log(tokenFromCookiet, 'cookieStore')
  return NextResponse.json({ accessToken, username: user.username, id: user.id }, { status: 200 })
}

export async function POST(req) {
  await dbConnect()
  const body = await req.json()
  const cookieStore = cookies()
  const tokenFromCookie = cookieStore.get('userCookie')
  console.log(tokenFromCookie,'tokenFromCookie')

  if (body.password) {
    return loginWithPassword(body)
  } else if (tokenFromCookie) {
    const decodedToken = jwt.verify(tokenFromCookie, process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decodedToken.id)
    if (user) {
      return NextResponse.json({ tokenFromCookie, username: decodedToken.username, id: decodedToken.id }, { status: 200 })
    } else {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
        .clearCookie("token")
    }
  } else {
    //console.log(req,'no password or cookie')
    return NextResponse.json({ error: 'No password or cookie provided' }, { status: 400 })
  }
}