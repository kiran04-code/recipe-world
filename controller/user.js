const user = require("../model/user")
const recipe = require("../model/createrecipe")
async function createuser(req,res){
  const {email,password} = req.body 
   await user.create({
    email,
    password
  })
 res.render("signin")

}
async function chekauth(req, res) {
  try {
    const { email, password } = req.body;
    if(email=="kiran@gmail.com"&&password=="kiran"){
      res.redirect("/admin")
    }
    else{
      const token = await user.matchUser(email, password);
    
      // Set token cookie and redirect
      res.cookie("token", token).redirect("/");
    }

  } catch (error) {
    console.error("Auth error:", error.message);
    res.render("signin", { error: "Your email or password is incorrect!" });
  }
}

  async function createrecipe(req,res){
    const { title,ingredients,steps} = req.body 
   await  recipe.create({
      image:req.file.buffer,
      title,
      ingredients,
      steps
      
    })
    res.render("addrecipe",{error:"Admin Your recipe is Post!"})

  }
  async function createrecipeuser(req,res){
    const { title,ingredients,steps} = req.body 
   await  recipe.create({
      image:req.file.buffer,
      title,
      ingredients,
      steps,
      createby:req.user._id
      
    })
    res.render("adrecpesbyuser",{error:" Your recipe has been posted successfully!"})

  }
module.exports = {createuser ,chekauth,createrecipe,createrecipeuser}
