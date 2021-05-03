const express=require('express')
const router=express.Router();

const Excercise=require('../models/excercise.model');

router.route('/').get((req,res)=>{
   Excercise.find()
     .then((data)=>res.json(data))
     .catch(err=>res.status(400).json('Error = '+err))
});

router.route('/:id').get((req,res) =>{
    Excercise.findById(req.params.id)
     .then( excercise => res.json(excercise))
     .catch(err => res.status(400).json('Error :' + err))
});

router.route('/:id').delete((req,res) => {
   Excercise.findByIdAndDelete(req.params.id)
    .then(()=> res.json('Excercise Deleted!'))
    .catch(err =>res.status(400).json('Error :'+ err))
});

router.route('/update/:id').post((req,res)=>{
      Excercise.findById(req.params.id)
      .then(
          excercise=> {
              excercise.username=req.body.username;
              excercise.description=req.body.description;
              excercise.duration=Number(req.body.duration);
              excercise.date=Date(req.body.date);
     
              excercise.save()
                .then(()=> res.json('Excercise Updated!'))
                .catch((err)=>res.status(400).json('Error :' + err));


          }
      )
      .catch(err =>res.status(400).json('Error :'+ err))
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