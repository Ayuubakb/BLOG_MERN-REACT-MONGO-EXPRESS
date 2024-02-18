const mongoose=require('mongoose');

const postSchema= new mongoose.Schema({
    cover:String,
    title:{
        type:String,
        required:true
    },
    paragraph:{
        type:String,
        required:true,
        default:'bg.jpg'
    }
})

module.exports=mongoose.model('Posts',postSchema)