const express = require('express');
const router = express.Router();
const Ofertauno = require('../models/ofertauno');
const Ofertados = require('../models/ofertados');
const Ofertatres = require('../models/ofertatres');
const Ofertacuatro = require('../models/ofertacuatro');
const Produno = require('../models/produno');
const Proddos = require('../models/proddos');
 
 

router.get('/', async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
 
  const ofertauno = await Ofertauno.find();
  const ofertados = await Ofertados.find();
  const ofertatres = await Ofertatres.find();
  const ofertacuatro = await Ofertacuatro.find();

   res.render('index', { 
    ofertauno, 
    ofertados,
    ofertatres,
    ofertacuatro,
 
    products: cart.generateArray(), totalPrice: cart.totalPrice
 
  });
 
});



router.get('/index', async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
 
  const ofertauno = await Ofertauno.find();
  const ofertados = await Ofertados.find();
  const ofertatres = await Ofertatres.find();
  const ofertacuatro = await Ofertacuatro.find();

   res.render('index', { 
    ofertauno, 
    ofertados,
    ofertatres,
    ofertacuatro,
 
    products: cart.generateArray(), totalPrice: cart.totalPrice
 
  });
 
});

 
  
  
 
 
 

 




router.get('/realinmob', async (req, res) => {
   res.render('users/dashboard');
 });

module.exports = router;
