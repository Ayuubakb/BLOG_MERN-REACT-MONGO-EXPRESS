const express=require('express')
const app=express();
const cors=require('cors');
const session=require('express-session');
const MongoDBStore=require('connect-mongodb-session')(session);
const mongoose=require('mongoose')
const authentification=require('./Routes/Authent')
const board=require('./Routes/Board')

mongoose.connect('mongodb://localhost:27017/Blog').then(()=>{
    console.log("DataBase Connected");
})

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
    methods:['GET','POST','DELETE','PUT'],
    allowedHeaders:'Content-Type'
    }
))

const mongoStrore= new MongoDBStore({
    uri:'mongodb://localhost:27017/Blog',
    collection:'mySessions'
})

app.use(session({
    secret:"blogSite",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:1000*60*60*24,
    },
    store:mongoStrore
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/uploads',express.static('uploads'));

app.use('/authentification',authentification)

app.use('/board',board)

app.listen(5000,()=>{
    console.log('Listening On Port 5000...');
})