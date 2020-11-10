var express = require('express');
var router = express.Router();
//var nombres = ['María','Carmen','Angélica','Valentina','Yolanda','Mauricio','Luis','Pedro','Gustavo','Fabián'];

/* GET home page. Página Principal*/
router.get('/', function (req, res, next) {
  res.render('index', { page: 'Home', menuId: 'home' });
});

router.get('/ubicacion', function (req, res, next) {
  res.render('pages/ubicacion', { page: 'Ubicacion', menuId: 'ubicacion' });
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
