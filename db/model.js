const mongoose = require("mongoose");


const model = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    
    text: {
        type: String,
    },
    photo:{
        type:String,

    },
    number_of_reports:{
        type:Number,
        default:0
    },
    post_stat:{
        likes : {
            type:String,
            default:0
         },
         comments:{
            type:Array
         }
    } 
    
});


let obj = mongoose.model('posts',model);
module.exports= obj;


