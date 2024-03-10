const express = require('express');
const Router = express.Router();
const Club = require('../Models/club');

Router.get('/',(err,res)=>{
    res.render('index');
})

// create / insert data

Router.post('/add',(req,res)=>{
     const name = req.body.name;
     const email = req.body.email;

    //  console.log(name,email)

   const club = new Club({
       name,
       email,
   });
   club.save((err) => {
    if (err) {
      console.error("Error saving club:", err);
      // Handle error here (e.g., send error response)
    } else {
      res.redirect('/');
    }
  });
});

// find data 

Router.get('/show',(req,res)=>{
    Club.find((err,docs)=>{
        if(err) {
        console.error("Error finding clubs:", err);
    }
       
        res.render('show',{
            students : docs
        })
        
    })
})

// update data

Router.route('/edit/:id')
  .get((req, res) => {
    Club.findById(req.params.id, (err, docs) => {
      if (err) {
        console.error("Error finding club for edit:", err);
        // Handle error here (e.g., send error response)
      } else {
        res.render('edit', { studentdata: docs });
      }
    });
  })
  .post((req, res) => {
    const updateData = xss(req.body); // Sanitize update data

    Club.findByIdAndUpdate(req.params.id, updateData, { new: true }, (err, docs) => {
      if (err) {
        console.error("Error updating club:", err);
        // Handle error here (e.g., send error response)
      } else {
        res.redirect('/show');
      }
    });
  });

// Del data 

Router.get('/delete/:id',(req,res)=>{
    Club.findByIdAndDelete({_id:req.params.id},req.body,(err,docs)=>{
         if(err){
             console.log("Err is")
         }else{
             console.log("Delted")
             res.redirect('/show')
         }
    })
})

module.exports = Router;