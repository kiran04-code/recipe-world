const express = require("express");
const app = express();
const path = require("path");
const router = require("./routes/user")
const routers = require("./routes/admin")
const routess = require("./routes/coments")
const cookieparser = require("cookie-parser")
const {checkAuth} = require("./middleware/auth")
const port = 3009;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.resolve("public")));
app.set("view engine","ejs");
app.set("views",path.resolve("./views"))
app.use(cookieparser())
app.use(checkAuth("token"))
const {connectDB} = require("./config/mongoDB");
connectDB("mongodb://localhost:27017/To-share").then(()=>{
    console.log("Connected to MongoDB");

}).catch((err)=>{
    console.log("Error connecting to MongoDB", err);
})

app.use("/",router)
app.use("/",routers)
app.use("/",routess)
app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`);
})