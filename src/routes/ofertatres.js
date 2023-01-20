const express = require('express');
const router = express.Router();

// Models
const Ofertatres = require('../models/ofertatres');
 

const path = require('path');
const { unlink } = require('fs-extra');
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name:'dernadqrq',
  api_key:'241274546791763',
  api_secret:'EnOvxHpFoTKSdfDybes9Po6OoPI'
  
});
 


router.post('/ofertatres/new-ofertatres',   async (req, res) => {
  const { name, title, description, enstock, oldprice, color, colorstock, talle, amount, dolarprice, price} = req.body;

   try {
    // console.log(req.files)
   const resp = await cloudinary.v2.uploader.upload(req.files[0].path)
 
       
   const newNote = new Ofertatres({ 
 
    name, title, description, enstock, oldprice, color, colorstock, talle, amount, dolarprice,
    description,
    imageuno:resp.url,
    price

  });
  //newNote.user = req.user.id;    
  await newNote.save();
             
  res.redirect('/ofertatres/add');
 
   } catch(err) {
      console.log(err)
   }  
});


    

 



router.get('/ofertatresredirect/:id', async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  const { id } = req.params;
  const ofertatres = await Ofertatres.findById(id);

   res.render('ofertatres/ofertatresredirect', {
     ofertatres,
     products: cart.generateArray(), totalPrice: cart.totalPrice

    });
});

 



// New producto
router.get('/ofertatres/add',  async (req, res) => {
  //console.log(`${ii}`)
  const ofertatres = await Ofertatres.find();
  res.render('ofertatres/new-ofertatres',  { ofertatres });
});



 


////////////////////////////////////////crud////////////////////////////////////////////////7





//editar


router.get('/ofertatres/edit/:id',  async (req, res) => {
  const ofertatres = await Ofertatres.findById(req.params.id);
  res.render('ofertatres/edit-ofertatres', { ofertatres });
});

router.post('/ofertatres/edit/:id',  async (req, res) => {
  const { id } = req.params;
  await Ofertatres.updateOne({_id: id}, req.body);
  res.redirect('/ofertatres/add');
});


// Delete 
router.get('/ofertatres/delete/:id', async (req, res) => {
  const { id } = req.params;
  await Ofertatres.deleteOne({_id: id});
  res.redirect('/ofertatres/add');
});




 
module.exports = router;


 