const bcrypt = require('bcrypt')
import { NextResponse } from 'next/server'
import dbConnect from '../../utils/dbConnect'
const jwt = require('jsonwebtoken')
const User = require('../../models/user')


export async function GET(req) {
  const users = await User.find({})
  response.json(users)
}

export async function POST(req) {
  await dbConnect()
  const body = await req.json()
  const { username, password } = body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash,
  })

  const savedUser = await user.save()
  return NextResponse.json(savedUser, { status: 201 })
}

// export async function DELETE(req) {
//   await dbConnect()
//   const decodedToken = helper.requireToken(request, response)
  
//     if (!decodedToken.id) {
//       return response.status(401).json({ error: 'Invalid token' })
//     }
//     const deletedUser = await User.findByIdAndRemove(request.params.id)

//     response.status(204).end()
//     return { success: true, message: 'Your account has been successfully deleted' }
// }