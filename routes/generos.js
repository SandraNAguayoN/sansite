var express = require('express');
var ruta = express.Router();
var request = require('request');

var mensaje = '';


//Metodo GET sirve para listar los registros
ruta.get('/', function (req, res, next) {
    //Consume mediante RESTApi
    request.get("http://localhost:4000/generos", (error, response, body) => {

        mensaje = '';
        if (error) { //En caso de que surja un error
            console.log(error);
            mensaje = 'Error: ' + error;
        }

        console.log(JSON.parse(body));
        //Enviamos la información a la vista en formato JSON
        res.render('generos/index', {
            mensaje: mensaje,
            title: 'Listado de Géneros musicales',
            data: JSON.parse(body)
        });
    });
});


//Despliega la pantalla para agregar Categoría
ruta.get('/add', (req, res) => {
    mensaje = 'Agregando un Género';
    //Despliega pantalla para captura de Categoría
    res.render('generos/add', {
        mensaje: mensaje,
        title: 'Agregar un Género', //Titulo de la página
        NumeroGenero: '', //Datos de Categoría
        Nombre: ''
    });
});

//Agregando una nueva Categoría a través del Microservicio
ruta.post('/add', function (req, res, next) {

    //Extrae los datos enviados por la forma
    let NumeroGenero = req.body.NumeroGenero;
    let Nombre = req.body.Nombre;

    let errors = false;

    //Si no hay errores
    if (!errors) {

        //Encapsula datos de la forma
        var datosForma = {
            NumeroGenero: NumeroGenero,
            Nombre: Nombre
        }

        //Invoca al Microservicio
        request.post({ url: "http://localhost:4000/generos", json: datosForma }, (error, response, body) => {
            mensaje = 'El dato se ha agregado con éxito';
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/generos'); //Redirige a Lista de Categorías
        });

    }
});



//Despliega pantalla para Modificar Categoría
ruta.get('/update/:NumeroGenero', (req, res) => {
    NumeroGenero = req.params.NumeroGenero;
    mensaje = 'Modificando Genero con Número de Genero' + NumeroGenero;
    console.log(mensaje);

    var GeneroFind;
    //Busca si existe la Categoría de acuerdo al Número de Categoría
    URI = "http://localhost:4000/generos/" + NumeroGenero;
    console.log('URI: ' + URI);

    request.get(URI, (error, response, body) => {

        mensaje = '';
        if (error) { //En caso de que surja un error
            console.log(error);
            mensaje = 'Error' + error;
        }

        console.log("Género encontrado ====> ");
        console.log(body);


        //Despliega pantalla para modificar Categoría
        res.render('generos/edit', {
            mensaje: mensaje,
            title: 'Editar Género', //Título de la página
            NumeroGenero: JSON.parse(body).NumeroGenero, //Datos de Categoría
            Nombre: JSON.parse(body).Nombre
        });
    });
});


// Modificando una nueva Categoría a través del Microservicio
ruta.post('/update', function (req, res, next) {

    console.log('Modificando un Género');
    //Extrae los datos enviados por la forma
    let NumeroGenero = req.body.NumeroGenero;
    let Nombre = req.body.Nombre;

    let errors = false;

    // Si no hay errores
    if (!errors) {

        //Encapsula datos provenientes de la forma
        var datosForma = {
            NumeroGenero: NumeroGenero,
            Nombre: Nombre
        }
        //Invoca al Microservicio de modificar
        request.put({ url: "http://localhost:4000/generos", json: datosForma },
            (error, response, body) => {
                mensaje = 'El dato se ha modificado con éxito';
                if (error) {
                    console.log(error);
                    mensaje = 'Error: ' + error;
                }
                console.log(response);
                res.redirect('/generos'); //Redirige a Listado de Categorías
            });
    }
});

/*
//Eliminar una genero por ID
ruta.get('/delete/:_id', (req, res) => {
    _id = req.params._id;
    mensaje = 'Eliminando Género con ID de Género' + _id;
    console.log(mensaje);


    if (_id) {
        //Invoca al Microservicio
        URI = "http://localhost:4000/generos/" + _id;
        request.delete(URI, (error, response, body) => {
            mensaje = 'El dato se ha eliminado con éxito';
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/generos'); //Redirige a Listado de Categorías
        });
    }
});
*/

//Eliminar una genero por numero
ruta.get('/delete/:numerogenero', (req, res) => {
    numerogenero = req.params.numerogenero;
    mensaje = 'Eliminando Género con ID de Género' + numerogenero;
    console.log(mensaje);


    if (numerogenero) {
        //Invoca al Microservicio
        URI = "http://localhost:4000/generos/" + numerogenero;
        request.delete(URI, (error, response, body) => {
            mensaje = 'El dato se ha eliminado con éxito';
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/generos'); //Redirige a Listado de Categorías
        });
    }
});

module.exports = ruta;