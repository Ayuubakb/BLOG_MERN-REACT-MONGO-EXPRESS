const User=require('../Models/User');
const bcrypt=require('bcrypt')

const verifyAuth=(req,res,next)=>{
    if(!req.session.Auth){
        res.status(403).json({message:false,objct:{}})
    }else{
        res.status(200).json({message:true,objct:req.session.Auth})
    }
}

const signup=async(req,res)=>{
    let saltRounds=10
    req.body.password=await bcrypt.hash(req.body.password,saltRounds)
    const inputs=req.body;
    var flag=true;
    await User.findOne({email:inputs.email}).then(
        (result)=>{
            if(result){
                res.status(400).json({message:'You Already Have An Account'})
                flag=false
            }
        }
    ).catch(()=>{
        res.status(500).json({message:'Server Problem, Please try again later'})
    })
    if(flag){
        await User.findOne({username:inputs.username}).then(
            (result)=>{
                if(result){
                    res.status(400).json({message:'UserName Already Used'})
                    flag=false
                }
            }
        ).catch(()=>{
            res.status(500).json({message:'Server Problem, Please try again later'})
        })
    }
    if(flag){
        const newUser=new User(inputs)
        await newUser.save().then(
            ()=>{
                res.status(301).json({message:"Signed Up Succesfully"})
            },
            ()=>{
                res.status(404).json({message:'Something Went Wrong, Please Try Later'})
            }
        )
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

const logout=async(req,res)=>{
    if(req.session.Auth){
        req.session.destroy(function(err){
            if(err)
                res.status(500).json({message:'Try Again Later '})
            else
                res.status(301).json({message:'Logged Out'})
        })
    }else{
        res.status(404).json({message:'already Logged Out'});
    }
}

module.exports={
    signup,
    login,
    verifyAuth,
    logout
}