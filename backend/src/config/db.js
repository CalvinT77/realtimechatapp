import mongoose from 'mongoose'

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI)
        .then(result  => {
            console.log('Connected to rtc database')
        }).catch(err => {
            console.error('Failed to connect to database:', err)
        })}