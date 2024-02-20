const mongoose=require('mongoose');

const postSchema= new mongoose.Schema({
    author:{
        type:String,
        required:true
    },
    cover:String,
    title:{
        type:String,
        required:true
    },
    paragraph:{
        type:String,
        required:true,
        default:'bg.jpg'
    },
    tag:{
        type:String,
        required:"true"
    }
})

module.exports=mongoose.model('Posts',postSchema)