const express = require("express")
const routess = express.Router()
const commenst = require("../model/comments")
routess.post("/viewmore/coments/:id",async(req,res)=>{
    const {coments} = req.body
  await commenst.create({
        coments,
        createBy:req.user._id,
        recipeId:req.params.id
    })
    res.redirect(`/viewmore/${req.params.id}`)
})

module.exports = routess