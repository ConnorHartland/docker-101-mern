import mongoose from 'mongoose'


const connectionString = process.env.ATLAS_URI 
console.log('connecting', connectionString)

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error)
  })
