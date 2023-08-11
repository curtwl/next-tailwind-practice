import mongoose from 'mongoose'

const dbConnect = async () => {
    console.log('connecting')
  if (mongoose.connection.readyState >= 1) {
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('connected to MongoDB')
  } catch (error) {
    console.error('MongoDB connection error:', error)
  }
}

export default dbConnect
