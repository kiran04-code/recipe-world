const express = require("express")
const {createrecipe,createrecipeuser} = require("../controller/user")
const upload = require("../config/mult")
const recipe = require("../model/createrecipe")
const user = require("../model/user")
const comments = require("../model/comments")
const routers = express.Router()
routers.post("/addrecipe",upload.single("image"),createrecipe)
routers.post("/adrecpesbyuser",upload.single("image"),createrecipeuser)
 routers.get("/admin",async(req,res)=>{
   const recipes =  await recipe.find({})
   const users =  await user.find({})
    res.render("admin",{recipedata:recipes,userdata:users})
 })
 routers.get("/addrecipe",(req,res)=>{
   res.render("addrecipe",)
})
 routers.get("/adrecpesbyuser",(req,res)=>{
   res.render("adrecpesbyuser",)
})
 routers.get("/allrecips",async(req,res)=>{
 const recipes =  await recipe.find({})
    res.render("allrecips",{data:recipes})
 })
 routers.post("/delete/:id", async (req, res) => {
   const recipeId = req.params.id; // Renamed to recipeId for clarity
   await recipe.findByIdAndDelete(recipeId);
   res.redirect("/allrecips");
});
  routers.get("/viewmore/:id", async (req, res) => {
   const recipeId = req.params.id; // Renamed to recipeId for clarity
  const recipes =  await recipe.findById(recipeId);
  const com = await comments.find({ recipeId }).populate("createBy"); // assuming comments have a u
   res.render("viewmore",{data:recipes,comments:com,users:req.user});
});
routers.get("/allusers",async(req,res)=>{
   const useres =  await user.find({})
      res.render("allusers",{data:useres})
   })
// save recips 
routers.get("/viewmore/save/:id",async(req,res)=>{
   const users = await user.findById(req.user._id);
   if (!users.allrecips.includes(req.params.id)) {
      users.allrecips.push(req.params.id);
      await users.save();
   }
   res.redirect(`/viewmore/${req.params.id}`)
   
})   
routers.post("/viewmore/like/:id",async(req,res)=>{
   try {
      const Recipe = await recipe.findById(req.params.id);

      if (Recipe.likedBy.includes(req.user._id)) {
        return res.status(400).json({ message: 'Already liked' });
      }
  
      Recipe.likes += 1;
      Recipe.likedBy.push(req.user._id);
      await Recipe.save();
  
      res.redirect(`/viewmore/${req.params.id}`); // or res.json if using AJAX
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong' });
    }
})
// details about 
routers.get("/postdetails",(req,res)=>{
   res.render("postdetails")
})
//post Details 
routers.get("/postdetails/:id", async (req, res) => {
   try {
      const recipeIds = req.params.id;
     const recipsdata = await recipe.findById(req.params.id).populate("likedBy");
     const com = await comments.find({ recipeId:  recipeIds }).populate('createBy');
     res.render("postdetails", { data: recipsdata,comments:com });
   } catch (err) {
     console.error(err);
     res.status(500).send("Error loading recipe details");
   }
 });
 routers.get('/sharerecips', async(req, res) => {
  const recipess = await recipe.find({createby:req.user._id}).populate("createby")
   res.render('sharerecips', { recipes: recipess });
 });
 // all like on perticular post 
 routers.post('/like/:id', async(req, res) => {
   const recipeId = req.params.id
   const recipes =  await recipe.findById(recipeId).populate("likedBy")
   res.render('like',{likess:recipes});
 });
 routers.get('/comments/:id', async(req, res) => {
   const com =  await comments.find({recipeId:req.params.id}).populate("createBy")
   res.render('comments',{coments:com});
 });
 
module.exports = routers