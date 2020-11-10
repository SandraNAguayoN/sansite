var express = require('express');
var router = express.Router();

/*const User = require('../model/user');
const bcrypt = require('bcrypt');
var mongoose = require("mongoose");
const saltRounds = 10;*/
/* GET users listing. 
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function (req, res, next) {
  res.render('login', { page: 'Login', menuId: 'login' });
});

router.get('/signup', function (req, res, next) {
  res.render('signup', { page: 'Signup', menuId: 'signup' });
});*/

  /* SIGNUP 
  router.post("/signup", function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
  
    var newuser = new User();
    newuser.email = email;
    newuser.password = password;
    newuser.save(function (err, savedUser) {
      if (err) {
        res.status(500).send('ERROR al registrar al usuario');
        res.redirect('../pages/registroFallido.ejs');
      }
      res.status(200).send('Usuario Registrado!');
      res.redirect('./views/pages/registroExitoso.ejs');
    })
  });
*/
  
/* LOGIN 
router.post("/login", function (req, res, next) {
  var user = new User({
    email: req.body.email,
    password: req.body.password
  });
  //Guarda un registro en Mongo
  user.save((err, response) => {
    if (err) res.status(400).send(err);
    res.status(200).send(response);
  });

  //Busca un registro mediante el email  
  User.findById(req.body.email, (err, user) => {
  if (err) res.status(400).send(err);
  res.status(200).send(user);
  });

});*/
module.exports = router;

