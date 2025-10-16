import express from 'express'


const router = express.Router()

router.get("/send", (req, res) => {
    res.send("send route endpoint");
})

router.get("/recieve", (req, res) => {
    res.send("recieve route endpoint");
})


export default router