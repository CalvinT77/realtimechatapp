import mongoose from 'mongoose'

export const connectDB = async () => {

    const { MONGO_URI } = process.env;
    if(!MONGO_URI) throw new Error("MONGO_URI is not set");
    
    await mongoose.connect(process.env.MONGO_URI)
        .then(result  => {
            console.log('Connected to rtc database')
        }).catch(err => {
            console.error('Failed to connect to database:', err)
        })}