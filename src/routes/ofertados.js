const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');

// Models
const Ofertados = require('../models/ofertados');
 
// Helpers


router.post('/ofertados/new-ofertados',  async (req, res) => {
  const { 
    name,
    title,
    image,
    imagedos,
    imagetres,
    imagecuatro,
    imagecinco,
    imageseis,
    imagesiete,

    description,
    filtroprice,
    enstock,
    color,
    coloruno,
    colordos,
    colortres,
    colorcuatro,
    talle,
    talleuno,
    talledos,
    talletres,
    tallecuatro,
    tallecinco,
    talleseis,
    oldprice,
    price,
    dolarprice
     } = req.body;
  const errors = [];
  if (!image) {
    errors.push({text: 'Please Write a Title.'});
  }
 
  if (errors.length > 0) {
    res.render('notes/new-note', {
      errors,
      image,
     
    });
  } else {
    const newNote = new Ofertados({ 
      name,
      title,
      image,
      imagedos,
      imagetres,
      imagecuatro,
      imagecinco,
      imageseis,
      imagesiete,
      description,
      filtroprice,
      enstock,
      color,
      coloruno,
      colordos,
      colortres,
      colorcuatro,
      talle,
      talleuno,
      talledos,
      talletres,
      tallecuatro,
      tallecinco,
      talleseis,
      oldprice,
      price,
      dolarprice 
    });
    //newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Note Added Successfully');
    res.redirect('/ofertados/add');
  }
});






router.get('/ofertadosredirect/:id', async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  const { id } = req.params;
  const ofertados = await Ofertados.findById(id);
  const ofertadoss = await Ofertados.find();

   res.render('ofertados/ofertadosredirect', {
     ofertados,
     ofertadoss,
     products: cart.generateArray(), totalPrice: cart.totalPrice

    });
});











// New producto
router.get('/ofertados/add',  async (req, res) => {
  const ofertados = await Ofertados.find();
  res.render('ofertados/new-ofertados',  { ofertados });
});



 


 



 


////////////////////////////////////////crud////////////////////////////////////////////////7


router.get('/ofertados/edit/:id',  async (req, res) => {
  const ofertados = await Ofertados.findById(req.params.id);
  res.render('ofertados/edit-ofertados', { ofertados });
});

router.post('/ofertados/edit/:id',  async (req, res) => {
  const { id } = req.params;
  await Ofertados.updateOne({_id: id}, req.body);
  res.redirect('/ofertados/add');
});





// Delete 
router.get('/ofertados/delete/:id', async (req, res) => {
  const { id } = req.params;
  await Ofertados.deleteOne({_id: id});
  res.redirect('/ofertados/add');
});




 

module.exports = router;
