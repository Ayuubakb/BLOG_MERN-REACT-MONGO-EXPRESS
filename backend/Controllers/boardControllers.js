const User=require('../Models/User');
const Posts=require('../Models/Post');
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

const create=async(req,res)=>{
    const Paragraph=req.body.paragraph;
    const Title=req.body.title;
    const Tag=req.body.tag;
    const Author=req.session.Auth.username;
    let postData={};
    if(req.file)
        postData={author:Author,cover:req.file.filename,title:Title,paragraph:Paragraph,tag:Tag}
    else
        postData={author:Author,title:Title,paragraph:Paragraph,tag:Tag}

    console.log(postData);
    const post=new Posts(postData)
    await post.save().then(
        ()=>{
            res.status(200).json({message:'Post Published'})
        },
        ()=>{
            res.status(500).json({message:'Something went wrong, try again'})
        })
}

const showPosts=async(req,res)=>{
    await Posts.find({},'author , cover , title , paragraph , tag').then(
        (result)=>{
            if(result){
                const promises = result.map(async (post) => {
                    let pic;
                    await User.findOne({ username: post.author }, 'pic').then((result2) => {
                        if (result2) pic = result2.pic;
                    });
                
                    let objct = {
                        id:post._id,
                        cover: post.cover,
                        paragraph: post.paragraph,
                        title: post.title,
                        tag: post.tag,
                        profile: pic,
                    };
                    return objct;
                });
                
                Promise.all(promises).then((PostTab) => {
                    res.status(200).json({elements:PostTab})
                });
            }
        }
    )
}

const findArticle=async(req,res)=>{
    const postId=req.body.postId;
    await Posts.findOne({_id:postId},'title , paragraph , cover , author , tag ').then(
        async(result)=>{
            if(result){
                let pic;
                await User.findOne({ username: result.author }, 'pic').then(
                    (result2) => {
                        if (result2) {
                            pic = result2.pic;
                            let objct = {
                                author:result.author,
                                cover: result.cover,
                                paragraph: result.paragraph,
                                title: result.title,
                                tag: result.tag,
                                profile: pic
                            };
                            console.log(objct)
                            res.status(200).json(objct)
                        }
                    }
                );
            }
        }
    )
}

const findAuthors=async(req,res)=>{
    await User.find({username:{$ne:req.session.Auth.username}},'username , pic').then(
        async(result)=>{
            if(result){
                const promises=result.map(async(Author)=>{
                    let Count;
                    await Posts.find({author:Author.username}).countDocuments().then(
                        (count)=>{
                            console.log(count);
                            Count=count
                        }
                    )
                    let objct={
                        username:Author.username,
                        pic:Author.pic,
                        count:Count
                    }
                    return objct
                })
                Promise.all(promises).then(authorsTab=>{
                    res.status(200).json({elements:authorsTab})
                })
            }
            else{
                res.status(404).json({elements:["No User Found"]})
            }
        },
        ()=>{
            res.status(500).json({elements:["Something Went Wrong"]})
        }
    )
}

module.exports={
    update,
    create,
    showPosts,
    findArticle,
    findAuthors
}