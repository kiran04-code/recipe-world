const mongoose = require('mongoose');
const {createHash,randomBytes} = require("crypto")
const {createToken } = require("../service/authJWT")

const UserSchema = new mongoose.Schema({
  
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
  salt:{
    type:String
  },
  allrecips: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'recipe'  // Ensure this matches the model name of your Recipe schema
  }]
})

UserSchema.pre("save",function(next){
  const user = this
  if (!user.isModified("password")) return next();
  const salt = randomBytes(16).toString()
  const hashpass = createHash("sha256").update(salt + this.password).digest('hex')
  this.salt = salt;
  this.password = hashpass
  return next()
})
UserSchema.statics.matchUser = async function(email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found");

  const salt = user.salt;
  const storedHash = user.password;
  
  const hash = createHash("sha256").update(salt + password).digest("hex");
  if (hash !== storedHash) throw new Error("Incorrect password");
  const token = createToken(user)
  return token;
};

const user = mongoose.model('user',UserSchema)

module.exports = user
