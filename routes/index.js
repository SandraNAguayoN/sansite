var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
  res.render('index', { page: 'Home', menuId: 'home' });
});
router.get('/signup', function (req, res, next) {
  res.render('pages/signup', { page: 'Signup', menuId: 'signup' });
});
router.get('/login', function (req, res, next) {
  res.render('pages/login', { page: 'Login', menuId: 'login' });
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

module.exports = router;
