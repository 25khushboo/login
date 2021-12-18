const express = require("express");

const mongoose = require('mongoose');
const bodyParser = require("body-parser");
// const browserEnv = require('browser-env');
// browserEnv();
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb+srv://kukri:qwerty123@cluster0.ekjeh.mongodb.net/project',{useNewUrlParser: true});

const CompanySchema =new mongoose.Schema({
    name: String,
    category: String,
    email: String,
    job: String,
    password: String,
    location: String
});

const CandidateSchema =new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    location: String
});

const Company = mongoose.model("company",CompanySchema);
const Candidate = mongoose.model("candidate",CandidateSchema);

app.use(express.static("public"));
app.use(express.json());

// var lat,long;

// if('geolocation' in navigator){
    // navigator.geolocation.getCurrentPosition(setPosition, showError);
// }

// console.log(window.navigator);

// function setPosition(position){
//     let latitude = position.coords.latitude;
//     let longitude = position.coords.longitude;
    
//     lat=latitude;
//     long= longitude;
// }

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    console.log(error.message);
}

app.get("/",function(req,res){
   res.sendFile(__dirname+"/index.html");
});

app.get("/signup",function(req,res){
    res.sendFile(__dirname+"/signup.html");
 });

 app.post("/usersign",function(req,res){

    // const successCallback = (pos)=>{
    //     console.log(pos);
    // };

    // const errCallback = (error)=>{
    //     console.log(error);
    // };

    // navigator.geolocation.getCurrentPosition(successCallback,errCallback);

    const val = new Candidate ({
        name: req.body.uname,
        password: req.body.pass,
        email: req.body.email,
        location: req.body.loc
    });
    // console.log(val);
    val.save(function(err)
    {
        if(err)
        console.log(err);
    });
    // res.status(201).json({message: "Thanks for your feedback"});
    res.redirect('/');
 });

 app.post("/companysign",function(req,res){

    const val = new Company ({
        name: req.body.cname,
        category: req.body.category,
        password: req.body.pass,
        email: req.body.email,
        job: req.body.job,
        location: req.body.loc
    });
    // console.log(val);
    val.save(function(err)
    {
        if(err)
        console.log(err);
    });
    // res.status(201).json({message: "Thanks for your feedback"});
    res.redirect('/');
 });

 app.post("/company_dashboard",function(req,res){
    Company.findOne({email: req.body.email}, function(err,foundUser){
        if(err)
        console.log(err);
        else
        {
          if(foundUser)
          {
            console.log(foundUser);
            // bcrypt.compare(req.body.password, foundUser.password, function(err, result) {
            //   if(err)
            //   console.log(err);
    
              if(req.body.pass === foundUser.password)
              res.send(" company dashboard");
              else 
              res.redirect("/");
          }
          else
          res.redirect("/");
    
        }
 });
 });

 app.post("/candidate_dashboard",function(req,res){
    Candidate.findOne({email: req.body.email}, function(err,foundUser){
        if(err)
        console.log(err);
        else
        {
          if(foundUser)
          {
            console.log(foundUser);
            // bcrypt.compare(req.body.password, foundUser.password, function(err, result) {
            //   if(err)
            //   console.log(err);
    
              if(req.body.pass === foundUser.password)
              res.send("candidate dashboard");
              else 
              res.redirect("/");
          }
          else
          res.redirect("/");
    
        }
 });
 });

app.listen(3000,function(){
console.log("port running at 3000");
});