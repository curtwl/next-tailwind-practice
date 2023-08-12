import mongoose from 'mongoose'

let isConnected

const dbConnect = async () => {
  if (isConnected) {
    console.log('already connected')
    return
  }

  if (!process.env.MONGODB_ADDON_URI) {
    throw new Error('Please add your Mongo URI to .env.local')
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_ADDON_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    isConnected = db.connections[0].readyState;
    console.log('connected to MongoDB')
  } catch (error) {
    console.error('MongoDB connection error:', error)
  }
}

export default dbConnect
