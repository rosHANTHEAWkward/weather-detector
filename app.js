 const express =require("express");
 const https=require("https");
 const bodyParser=require("body-parser");


 const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname + "/index.html");

})

app.post("/",function(req,res){
  

    
const appkey="2f62de1865a3aa7856fc02091bed1c9e"
const quercyCity=req.body.cityName    
const url="https://api.openweathermap.org/data/2.5/weather?q="+quercyCity+"&appid="+appkey+"&units=metric";

    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data" , function(data){
            const weatherData=JSON.parse(data)
            console.log(weatherData );
            console.log(weatherData.main.temp);

          const temp =  weatherData.main.temp;
          const tempDescription=weatherData.weather[0].description;
          const name=weatherData.name
            const image=weatherData.weather[0].icon;
            const imageIcon= "http://openweathermap.org/img/wn/" + image + "@2x.png"

            console.log(weatherData.weather[0].description);

            res.write("<p> the wether decription is "+tempDescription+"</p>");
            res.write("<h1> the tempreatur of "+ name +" is"+temp+" degree celsius </h1>");
           res.write("<img src=" + imageIcon + ">");
            res.send();
        })
    })

})

 app.listen(3000,function(){
    console.log("server running on 3000 port ");
 })