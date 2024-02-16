const {signup, login, logout}=require('../Controllers/authentControllers')
const express=require('express');
const router=express.Router();

router.post('/signup',signup);

router.post('/login',login);

router.delete('/logout',logout);

module.exports=router