/* users.js */
var express = require('express');
const User = require('../model/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/indexuser', function(req, res, next) {
  res.render('/indexuser', { page: 'Homeuser', menuId: 'homeuser' });
});

router.get('/login', function (req, res, next) {
  res.render('pages/login', { page: 'Login', menuId: 'login' });
});

router.get('/signup', function (req, res, next) {
  res.render('pages/signup', { page: 'Signup', menuId: 'signup' });
});


router.get('/errsignup', function (req, res, next) {
  res.render('pages/errsignup', { page: 'Errsignup', menuId: 'errsignup' });
});
router.get('/errlogin', function (req, res, next) {
  res.render('pages/errlogin', { page: 'Errlogin', menuId: 'errlogin' });
});


/* LOGIN */
router.post("/login", function(req, res, next) {
  var user = new User({
  email: req.body.email,
  password: req.body.password
  });

  //Busca un registro mediante el email
  User.findById(req.body.email, (err, user) => {
    if (err) res.status(400).send(err);
    res.status(200).redirect(user);
    });
  res.status(200).redirect('/indexuser');
  
 });
 
 /* SIGNUP */
router.post("/signup", function(req, res, next) {
  var user = new User({
  email: req.body.email,
  password: req.body.password
  });
  //Guarda un registro en Mongo
  user.save((err, response) => {
  if (err) res.status(400).redirect('/errsignup');
  res.status(200).redirect('/login');
  });
  
  
 });

 
module.exports = router;
