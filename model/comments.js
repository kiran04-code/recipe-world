const mongoose = require("mongoose")

commentsSchema = new mongoose.Schema({
    coments:{
        type:String
    },
    createBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    recipeId:{
       type:mongoose.Schema.Types.ObjectId,
        ref:"recipe"
    }
},{timestamps:true})

const commenst = mongoose.model("coments",commentsSchema)

module.exports = commenst