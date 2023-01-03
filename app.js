const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 3000;
const path = require("path");
require("./db/conn");
const model = require("./db/model")
var hbs = require('hbs');
const res = require('express/lib/response');


app.set('view engine', 'hbs');
app.use(bodyParser.json())
bodyParser.urlencoded({extended: true})
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));


app.post("/publish" , async(req,res)=>{
    try{
         let data = await model(req.body);
             await data.save();

             res.send("data saved successfully!");

    }
    catch(Exception){
        res.send("an error occured!");
    }


});

app.post("/update" , async(req,res)=>{
    try{
         let _id=res.id;
         let obj=db.test.find({_id:id});


         let data = await model(req.body);
             await data.save();

             res.send("data saved successfully!");

    }
    catch(Exception){
        res.send("an error occured!");
    }


});

app.get('/', async(req, res)=>{
	
    let data = await model.find();
    console.log(data);
    res.render("index" , {
        "data" : data
    });

});

app.get("/post" , (req,res)=>{
    res.render("writePost")
});




app.listen(PORT, (error) =>{
	if(!error)
		{
            console.log("Server is Successfully Running,and App is listening on port "+ PORT)
            console.log("\n");
        }
	else
		console.log("Error occurred, server can't start", error);
	}
);
