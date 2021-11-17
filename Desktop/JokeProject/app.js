const express = require("express");
const https = require("https");
const bodyParser= require("body-parser");


const app = express();// which initializes new express app

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
     res.sendFile(__dirname + "/index.html");
    })


app.post("/",function(req,res){


  const query = req.body.jokeType;
  const url = "https://v2.jokeapi.dev/joke/" + query + "?type=single";

   https.get(url, "JSON", function(response){
     var data;
     console.log(response.statusCode);


     response.on("data",function(chunk){
       if (!data){
         data = chunk;
       }else{
         data +=chunk;
       }
     });
     response.on("end",function(){
       const jokeText = JSON.parse(data);
       const joke = jokeText.joke;
       const jokeType = jokeText.category;
       res.write("<p> Type of joke is : " + jokeType + "</p>");
       res.write("<h1>" + joke +"</h1>");
       res.send();
     })
})
  })

app.listen(3000, function(){
  console.log("server is running on port 3000");
})
