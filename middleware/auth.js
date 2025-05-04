const {validation} = require("../service/authJWT")
function checkAuth(cookieName){
    return  function(req, res, next){
        const token = req.cookies[cookieName]
        if(!token) {
            return next()
        }
        try {
            const payloadnew = validation(token)
            req.user = payloadnew
            next()
        } catch (error) {
            return res.status(401).json({message: "unauthorized"})
        }
    }
}

module.exports = { checkAuth }