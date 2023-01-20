const express = require('express');
const router = express.Router();
 
// Models
const Ofertauno = require('../models/ofertauno');
 
 

const path = require('path');
const { unlink } = require('fs-extra');
const cloudinary = require('cloudinary');


// cloudinary.config({
//   cloud_name:'dd3uzxyfv',
//   api_key:'946715245779221',
//   api_secret:'mETr4SE0tAMSbvOlsMzjUotkx5c'
  
// });
cloudinary.config({
  cloud_name:'dsk4fft6r',
  api_key:'168297322199897',
  api_secret:'nHp3wKpofJIeNm2AlVFf9PgseZk'
  
});




router.post('/ofertauno/new-ofertauno',  async (req, res) => {
  const { name, title, filtro, description, enstock, oldprice, color, colorstock, talle, amount, dolarprice, price} = req.body;
  
  try {
   const resp = await cloudinary.v2.uploader.upload(req.files[0].path)
   const respdos = await cloudinary.v2.uploader.upload(req.files[1].path)
   const resptres = await cloudinary.v2.uploader.upload(req.files[2].path)
   const respcuatro = await cloudinary.v2.uploader.upload(req.files[3].path)
   const respcinco = await cloudinary.v2.uploader.upload(req.files[4].path)
   const respseis = await cloudinary.v2.uploader.upload(req.files[5].path)
  //  const respsiete = await cloudinary.v2.uploader.upload(req.files[6].path)
  //  const respocho = await cloudinary.v2.uploader.upload(req.files[7].path)
  //  const respnueve = await cloudinary.v2.uploader.upload(req.files[8].path) 
  //  const respdiez = await cloudinary.v2.uploader.upload(req.files[9].path) 

  //  const responce = await cloudinary.v2.uploader.upload(req.files[10].path)
  //  const respdoce = await cloudinary.v2.uploader.upload(req.files[11].path)
  //  const resptrece = await cloudinary.v2.uploader.upload(req.files[12].path)
  //  const respcatorce = await cloudinary.v2.uploader.upload(req.files[13].path)
  //  const respquince = await cloudinary.v2.uploader.upload(req.files[14].path)
  //  const respdieciseis = await cloudinary.v2.uploader.upload(req.files[15].path)
  //  const respdiecisiete = await cloudinary.v2.uploader.upload(req.files[16].path)
  //  const respdieciocho = await cloudinary.v2.uploader.upload(req.files[17].path)
  //  const respdiecinueve = await cloudinary.v2.uploader.upload(req.files[18].path)
  
  //  const respveinte = await cloudinary.v2.uploader.upload(req.files[19].path)
  //  const respveintiuno = await cloudinary.v2.uploader.upload(req.files[20].path)
  //  const respveintidos = await cloudinary.v2.uploader.upload(req.files[21].path)
  //  const respveintitres = await cloudinary.v2.uploader.upload(req.files[22].path)
  //  const respveinticuatro = await cloudinary.v2.uploader.upload(req.files[23].path)
  //  const respveinticinco = await cloudinary.v2.uploader.upload(req.files[24].path)


   const newNote = new Ofertauno({ 
  
    name, title, description, enstock, oldprice, color, colorstock, talle, amount, dolarprice, filtro,
    imageuno:resp.url,
    imagedos:respdos.url,
    imagetres:resptres.url,
    imagecuatro:respcuatro.url,
    imagecinco:respcinco.url,
     imageseis:respseis.url,
    // imagesiete:respsiete.url,
    // imageocho:respocho.url,
    // imagenueve:respnueve.url,
    // imagediez:respdiez.url,

    // imageonce:responce.url,
    // imagedoce:respdoce.url,
    // imagetrece:resptrece.url,
    // imagecatorce:respcatorce.url,
    // imagequince:respquince.url,
    // imagedieciseis:respdieciseis.url,
    // imagediecisiete:respdiecisiete.url,
    // imagedieciocho:respdieciocho.url,
    // imagediecinueve:respdiecinueve.url,
    // imageveinte:respveinte.url,

    // imageveintiuno:respveintiuno.url,
    // imageveintidos:respveintidos.url,
    // imageveintitres:respveintitres.url,
    // imageveinticuatro:respveinticuatro.url,
    // imageveinticinco:respveinticinco.url,
  
    price
  });
  await newNote.save();

  res.redirect('/ofertauno/add');
 
   }catch(err){
       console.log(err)
   }  
});


 
 

router.get('/ofertaunoredirect/:id', async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  const { id } = req.params;
  const ofertauno = await Ofertauno.findById(id);
  res.render('ofertauno/ofertaunoredirect', {
    ofertauno,
    products: cart.generateArray(), totalPrice: cart.totalPrice

  });
});








// New product
router.get('/ofertauno/uno',  async (req, res) => {
  const ofertauno = await Ofertauno.find();
  //res.render('ofertauno/new-ofertauno',  { ofertauno });
  res.json(ofertauno);
});

router.get('/ofertauno/add',  async (req, res) => {
  const ofertauno = await Ofertauno.find();
  res.render('ofertauno/new-ofertauno',  { ofertauno });
});

////////////////////////////like////////////////////////

 


////////////////////////////////////////crud////////////////////////////////////////////////7



//editar


router.get('/ofertauno/edit/:id',  async (req, res) => {
  const ofertauno = await Ofertauno.findById(req.params.id);
  res.render('ofertauno/edit-ofertauno', { ofertauno });
});

router.post('/ofertauno/edit/:id',  async (req, res) => {
  const { id } = req.params;
  await Ofertauno.updateOne({_id: id}, req.body);
  res.redirect('/ofertauno/add');
});



// Delete 
router.get('/ofertauno/delete/:id', async (req, res) => {
  const { id } = req.params;
    await Ofertauno.deleteOne({_id: id});
  res.redirect('/ofertauno/add');
});




 


module.exports = router;
