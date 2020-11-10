var express = require('express');
var router = express.Router();
//var nombres = ['María','Carmen','Angélica','Valentina','Yolanda','Mauricio','Luis','Pedro','Gustavo','Fabián'];

/* GET home page. Página Principal*/
router.get('/', function (req, res, next) {
  res.render('index', { page: 'Home', menuId: 'home' });
});
router.get('/signup', function (req, res, next) {
  res.render('signup', { page: 'Signup', menuId: 'signup' });
});
router.get('/login', function (req, res, next) {
  res.render('login', { page: 'Login', menuId: 'login' });
});

router.get('/ubicacion', function (req, res, next) {
  res.render('ubicacion', { page: 'Ubicacion', menuId: 'ubicacion' });
});

router.get('/redessociales', function (req, res, next) {
  res.render('redessociales', { page: 'Redes sociales', menuId: 'redessociales' });
});

router.get('/ecommerce', function (req, res, next) {
  res.render('ecommerce', { page: 'Ecommerce', menuId: 'ecommerce' });
});

router.get('/streaming', function (req, res, next) {
  res.render('streaming', { page: 'Streaming', menuId: 'streaming' });
});

router.get('/otra', function (req, res, next) {
  res.render('otra', { page: 'Otra', menuId: 'otra' });
});

router.get('/acercade', function (req, res, next) {
  res.render('acercade', { page: 'Acercade', menuId: 'acercade' });
});

//Método POST
router.post('/', function (req, res) {
  res.send('Tengo una petición con POST');
});

//Método PUT
router.put('/greeting', function (req, res) {
  res.send('Te doy un saludo con Greeting');
});

//Método DELETE
router.delete('/hello', function (req, res) {
  res.send('Te doy un saludo con DELETE');
});

module.exports = router;
