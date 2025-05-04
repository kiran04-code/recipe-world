const jwt  = require("jsonwebtoken")
const secretKey = "kiran9090@"
function createToken(user){
 const payload = {
    _id: user._id,
    email:user.email,
    allrecips:user.allrecips
 }
 const token = jwt.sign(payload,secretKey)
 return token
}
function validation(token){
  const payload = jwt.verify(token,secretKey)
  return payload
}
module.exports = {createToken ,validation}