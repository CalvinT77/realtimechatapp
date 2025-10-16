import jwt from "jsonwebtoken"

export const generateToken = (userId, res) => {
    const { JWT_SECRET, NODE_ENV } = process.env;

    // checkes if JWT Secret key is added, if not throw an error
    if(!JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured");
    }

    // signs a jwt token and have it expire in 7 days
    const token = jwt.sign({userId: userId}, process.env.JWT_SECRET, {
        expiresIn: '7d',
    })

    // res a cookie 
    res.cookie("jwt", token, {
        maxAge: 7*24*60*60*1000,
        httpOnly: true, // prevent XSS attacks
        sameSite: "strict", // prevents CSRF attacks
        secure: process.env.NODE_ENV === "development" ? false : true,
    })

    return token; 
}