var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { page: 'Home', menuId: 'home' });
});

router.get('/indexuser', function(req, res, next) {
  res.render('indexuser', { page: 'Homeuser', menuId: 'homeuser' });
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

router.get('/ubicacion', function (req, res, next) {
  res.render('pages/ubicacion', { page: 'Ubicacion', menuId: 'ubicacion' });
});

router.get('/redessociales', function (req, res, next) {
  res.render('pages/redessociales', { page: 'Redes sociales', menuId: 'redessociales' });
});

router.get('/ecommerce', function (req, res, next) {
  res.render('pages/ecommerce', { page: 'Ecommerce', menuId: 'ecommerce' });
});

router.get('/streaming', function (req, res, next) {
  res.render('pages/streaming', { page: 'Streaming', menuId: 'streaming' });
});

router.get('/otra', function (req, res, next) {
  res.render('pages/otra', { page: 'Otra', menuId: 'otra' });
});

router.get('/acercade', function (req, res, next) {
  res.render('pages/acercade', { page: 'Acercade', menuId: 'acercade' });
});



router.get('/ubicacionuser', function (req, res, next) {
  res.render('pages/ubicacionuser', { page: 'Ubicacionuser', menuId: 'ubicacionuser' });
});

router.get('/redessocialesuser', function (req, res, next) {
  res.render('pages/redessocialesuser', { page: 'Redes socialesuser', menuId: 'redessocialesuser' });
});

router.get('/ecommerceuser', function (req, res, next) {
  res.render('pages/ecommerceuser', { page: 'Ecommerceuser', menuId: 'ecommerceuser' });
});

router.get('/streaminguser', function (req, res, next) {
  res.render('pages/streaminguser', { page: 'Streaminguser', menuId: 'streaminguser' });
});

router.get('/otrauser', function (req, res, next) {
  res.render('pages/otrauser', { page: 'Otrauser', menuId: 'otrauser' });
});

router.get('/acercadeuser', function (req, res, next) {
  res.render('pages/acercadeuser', { page: 'Acercadeuser', menuId: 'acercadeuser' });
});

module.exports = router;
