import express from 'express'
import dotenv from 'dotenv'
import authRoute from './routes/auth.routes.js';
import messageRoute from './routes/message.routes.js'

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000

app.get("/api/auth", authRoute)
app.get("/api/message", messageRoute)


app.listen(PORT, () => {
    console.log('server is currently running at port ' + PORT)
})