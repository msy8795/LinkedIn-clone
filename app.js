const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 80;
const path = require("path");
require("./db/conn");
const model = require("./db/model")
const hbs = require('hbs');



app.set('view engine', 'hbs');
app.use(bodyParser.json())
bodyParser.urlencoded({extended: true})
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));


app.get('/', async(req, res)=>{
	
    let data = await model.find();
    // console.log(data);
    res.render("index" , {
        "data" : data
    });

});

app.get("/post" , (req,res)=>{
    res.render("writePost")
});


app.post("/publish" , async(req,res)=>{
    try{
        console.log(req.body);
        let data = await model(req.body);

        let resp = await data.save();

        if(resp != null){
            res.status(201).json({
                status: 201
            })
        }
        else{
            res.status(402).json({
                status: 402
            })
        }
            
        

    }
    catch(Exception){
        res.send("an error occured!");
    }


});

app.post("/update" , async(req,res)=>{
    try{
         let data = await model(req.body);
             await data.save();

             res.send("data saved successfully!");

    }
    catch(Exception){
        res.send("an error occured!");
    }


});

app.get("/post/:id",async(req,res)=>{
    try {
      let data =   await model.find({_id:req.params.id});
      res.render("index" , {
        "data" : data
      });
        
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

app.put("/post/:id", async(req,res)=>{
    try{
       let data = await model.findOne({_id:req.params.id});
       data.number_of_reports =   data.number_of_reports + 1 ;
       await data.save();

       res.status(200).json({
        status : 200
    })

    }
    catch(Exception){
        res.status(403).json({
            status : 403
        })
    }
})

app.delete("/post/:id" , async(req,res)=>{
    try {
        let data =   await model.deleteOne({_id:req.params.id});
        if(data != null){
            res.status(200).json({
                status : 200
            })
        }
          
      } catch (error) {
          console.log(error);
          res.status(403).json({
            status : 403
        })
      }
})

app.patch("/comment/:id" , async(req,res)=>{
      
    let requestedData = req.body.data;
    // console.log(requestedData);

    try {
        let data = await model.findOne({_id:req.params.id});
        if(data != null){
            data.post_stat.comments.push(requestedData);
            await data.save();
            res.status(201).json({
                status:201
            })
        }
    } catch (error) {
        res.status(500).json({
            status:500
        })
    }

})

app.get("/post/like/:id", async(req,res)=>{

    try {

        let data = await model.findOne({_id:req.params.id});
        data.post_stat.likes =  Number(data.post_stat.likes) + 1 ;
        await data.save();
 
        res.status(201).json({
         status : 201
     })
        
    } catch (error) {
        res.status(401).json({
            status : 401
        })
    }

})

app.get("/post/dislike/:id", async(req,res)=>{

    try {

        let data = await model.findOne({_id:req.params.id});
        data.post_stat.likes =  Number(data.post_stat.likes) - 1 ;
        await data.save();
 
        res.status(201).json({
         status : 201
     })
        
    } catch (error) {
        res.status(401).json({
            status : 401
        })
    }

})



app.listen(PORT, (error) =>{
	if(!error)
		{
            console.log("Server is Running at  "+ PORT);
        }
	else
		console.log("Error occurred, server can't start", error);
	}
);
