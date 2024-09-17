import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
    
    const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET);

    res.status(statusCode).cookie("token",token, {
        httpOnly: true,
        maxAge: 15*60*1000,
        sameSite : process.env.NODE_ENV === "Development" ? "lax" : "none",
        // sameSite is set to none to allow the cookie to be sent to the frontend because the frontend and backend are hosted on different domains but if sameSite:strict the cookie will not be sent to the frontend even if credentials are set to true
        secure : process.env.NODE_ENV === "Development" ? false : true,
        // secure is set ti true to allow the cookie to be sent over HTTPS only
    }).send({
        success: true,
        message: message,
    })
}