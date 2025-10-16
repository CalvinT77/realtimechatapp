import User from "../models/User.js";
import bcrypt from 'bcryptjs'

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body

    try {
        if (!fullName || email || password) {
            return res.status(400).json({ success: false, message: "All Fields are required" })
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be atleast 6 characters" })
        }

        const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (!format.test(password)) {
            return res.status(400).json({ success: false, message: "Password must contain a special character" })
        }

        const format2 = /\d/;
        if (!format2.test(password)) {
            return res.status(400).json({ success: false, message: "Password must contain a number" })
        }

        const format3 = /[a-zA-Z]/;
        if (!format3.test(password)) {
            return res.status(400).json({ success: false, message: "Password must contain a letter" })
        }

        const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailReg.test(email)) {
            return res.status(400).json({ success: false, message: "Email is Invalid" })
        }

        const user = await User.findOne({email: email})

        if(user){
            res.status(400).json({ success: false, message: "Email already in database" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if(newUser) {
            await newUser.save()
            generateToken(newUser._id, res)

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });

            //TODO: Send user a message email

        }else{
            res.status(400).json({ success: false, message: "Invalid user data" })
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error:", error })
    }
}
