const express=require('express')
const mongoose=require('mongoose')
const cors = require('cors')

require('dotenv').config();


const app=express();
const PORT=process.env.PORT||5000;

app.use(cors());
app.use(express.json());

//COnnect Our database (MONGO)

// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true , useUnifiedTopology: true });
// const connection=mongoose.connection;

// connection.once('open',()=>{
//     console.log("MongoD connection established");
// })

const uri = "mongodb+srv://User1:User1@cluster0.khpzg.mongodb.net/excercise?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then()
.catch(err=>console.log(err))


const connection= mongoose.connection;
connection.once('open',()=>{
    console.log("MOngo Connection Successful");
})

//For Routes from external folders
const excerciseRouter = require('./routes/excercises');
const  userRouter = require('./routes/users')

app.use('/excercises',excerciseRouter);
app.use('/users',userRouter);

app.get('/',(req,res)=>{
    res.send('<br><p>This a Home<br></p><h1>home</h1></br>')
})
app.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
