const User=require('../Models/User');
const bcrypt=require('bcrypt');

const update=async(req,res)=>{
    console.log('in');
    const usernameIn=req.body.username;
    const emailIn=req.body.email;
    const currPass=req.body.currPass
    const newPass=req.body.newPass
    let pic
    req.file?pic=req.file.filename:'';
    console.log(usernameIn,emailIn,currPass);

    await User.findOne({username:req.session.Auth.username}, 'password').then(
        async(result)=>{
            if(result){
                console.log('verifying password...');
                const flag= await bcrypt.compare(currPass,result.password)
                if(flag){
                    console.log('true password');
                    let dataUpdate={
                        username:usernameIn,
                        email:emailIn
                    }
                    if(newPass !== ''){
                        newPass=await bcrypt.hash(newPass,10)
                        dataUpdate={...dataUpdate,password:newPass}
                    }
                    pic!=='' ? dataUpdate={...dataUpdate,pic:pic} : null
                    console.log(dataUpdate)

                    await User.updateOne({username:req.session.Auth.username},dataUpdate).then(
                        (result)=>{
                            console.log('found it');
                            console.log(result.modifiedCount);
                            if(result.modifiedCount === 1){
                                console.log('changed it');
                                req.session.Auth={
                                    username:usernameIn,
                                    email:emailIn,
                                    pic:pic
                                }
                                res.status(200).json({message:'Updated'});
                            }
                        }
                    )
                }else{
                    console.log('false password');
                    res.status(403).json({message:'Incorrect Password'})
                }
            }else{
                console.log('something');
                res.status(500).json({message:'Some Thing Went Wrong'})
            }
        }
    )
}

module.exports={
    update
}