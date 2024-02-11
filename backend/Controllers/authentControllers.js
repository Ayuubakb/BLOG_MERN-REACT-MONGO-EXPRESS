const mongoose=require('mongoose');
const User=require('../Models/User');
const bcrypt=require('bcrypt')

const verifyAuth=(req,res,next)=>{
    if(!req.session.Auth){
        res.status(403).json({message:false})
        console.log('Not Authorized');
    }else{
        res.status(200).json({message:true})
        console.log('Authorized');
    }
}

const signup=async(req,res)=>{
    let saltRounds=10
    req.body.password=await bcrypt.hash(req.body.password,saltRounds)
    const inputs=req.body;
    var flag=true;
       console.log(inputs);
    await User.findOne({email:inputs.email}).then(
        (result)=>{
            if(result){
                res.status(400).json({message:'You Already Have An Account'})
                console.log('You Already Have An Account');
                flag=false
            }
        }
    ).catch(()=>{
        res.status(500).json({message:'Server Problem, Please try again later'})
    })
    console.log(flag);
    if(flag){
        await User.findOne({username:inputs.username}).then(
            (result)=>{
                if(result){
                    res.status(400).json({message:'UserName Already Used'})
                    console.log('UserName Already Used');
                    flag=false
                }
            }
        ).catch(()=>{
            res.status(500).json({message:'Server Problem, Please try again later'})
        })
    }
    console.log(flag);
    if(flag){
        const newUser=new User(inputs)
        await newUser.save().then(
            ()=>{
                res.status(301).json({message:"Signed Up Succesfully"})
                console.log("saved");
            },
            ()=>{
                res.status(404).json({message:'Something Went Wrong, Please Try Later'})
                console.log("not saved");
            }
        )
        console.log("saved");
    }
}

const login=async(req,res)=>{
    const inputs=req.body;
    await User.findOne({email:inputs.email},'username pic password').then(
        async (result)=>{
            if(result){
                await bcrypt.compare(inputs.password,result.password).then(
                    (isPassword)=>{
                        if(isPassword){
                            let objct={
                                username:result.username,
                                email:inputs.email,
                                pic:result.pic
                            }
                            req.session.Auth=objct;
                            req.session.Auth?res.status(301).json({message:'session created'}):res.status(500).json({message:'Problem Accured,Please Try Again later'})
                        }else{
                            res.status(400).json({message:'Incorrect Password'});
                        }
                    }
                )
            }else{
                res.status(404).json({message:'No User Found'})
                console.log('not Found');
            }
        })
}

module.exports={
    signup,
    login,
    verifyAuth
}