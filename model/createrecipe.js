const mongoose = require("mongoose")

recipeschema = new mongoose.Schema({
    title:{
     type:String
    },
    ingredients:{
        type:String
    },
    steps:{
        type:String
    },
    image:{
        type:Buffer
    },
    createby:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"user"
    },
    likes: {
        type: Number,
        default: 0
      },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
})

const recipe =  mongoose.model("recipe",recipeschema)

module.exports = recipe