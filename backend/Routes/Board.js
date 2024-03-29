const express=require('express');
const router=express.Router();
const {update, create,showPosts,findArticle, findAuthors}=require('../Controllers/boardControllers')
const {verifyAuth} = require('../Controllers/authentControllers')
const multer=require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

router.get('/',verifyAuth);

router.post('/update',upload.single('pic'),update);

router.post('/create',upload.single('pic'),create);

router.get('/showPosts',showPosts)

router.post('/findArticle',findArticle)

router.get('/findAuthors',findAuthors)


module.exports=router