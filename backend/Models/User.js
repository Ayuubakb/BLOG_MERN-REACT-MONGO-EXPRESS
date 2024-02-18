const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        required:true,
        type:String,
    },
    pic:{
        type:String,
        default:'Admin.png'
    }
})

module.exports=mongoose.model('User',userSchema);