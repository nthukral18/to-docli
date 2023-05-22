import jwt from "jsonwebtoken"
const privateKey = "nav123";
function authMiddleware(req, res, next) {

    try {
        let token = req.headers[`auth-token`]
        let payload = jwt.verify(token, privateKey)
        req.payload = payload;
        return next()
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ error: " token is invalid/expired" })
    }
}
export { authMiddleware }