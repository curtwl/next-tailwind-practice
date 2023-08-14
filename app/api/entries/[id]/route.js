import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function DELETE(req, context) {
    const cookieStore = cookies()
    const cookieToDecode = cookieStore.get('userCookie')
    // const decodedToken = await verifyToken(cookieToDecode?.value)
  
    // check if decodedToken.id === id of entry's author?
    try {
      console.log(context.params.id)
      await prisma.entry.delete({
        where: {
          id: parseInt(context.params.id),
        },
      })
    } catch (error) {
        console.log(error)
      return NextResponse.json({ message: 'error', type: error })
    }
    return NextResponse.json({ status: 200 })
  }