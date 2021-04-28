const express=require('express')
const router=express.Router();

const Excercise=require('../models/user.model');

router.route('/').get((req,res)=>{
   Excercise.find()
     .then((data)=>res.json(data))
     .catch(err=>res.status(400).json('Error = '+err))
});

router.route('/add').post((req,res) =>{
   
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExcercie=new Excercise (
        {
            username,
            description,
            duration,
            date,
        }
    );
   
    newExcercie.save()
    .then(( )=>res.json("Excerise Added Successfully!!"))
    .catch(err=>res.status(400).json('Error = '+err))

});
module.exports = router;