var express = require('express');
var ruta = express.Router();
var request = require('request');

var mensaje = '';


//Metodo GET sirve para listar los registros
ruta.get('/', function (req, res, next) {
    //Consume mediante RESTApi
    request.get("http://localhost:4000/categorias", (error, response, body) => {

        mensaje = '';
        if (error) { //En caso de que surja un error
            console.log(error);
            mensaje = 'Error: ' + error;
        }

        console.log(JSON.parse(body));
        //Enviamos la información a la vista en formato JSON
        res.render('categorias/index', {
            mensaje: mensaje,
            title: 'Listado de categorías',
            data: JSON.parse(body)
        });
    });
});

//Despliega la pantalla para agregar Categoría
ruta.get('/add', (req, res) => {
    mensaje = 'Agregando Categoría';
    //Despliega pantalla para captura de Categoría
    res.render('categorias/add', {
        mensaje: mensaje,
        title: 'Agregar un libro', //Titulo de la página
        NumeroCategoria: '', //Datos de Categoría
        Nombre: ''
    });
});

//Agregando una nueva Categoría a través del Microservicio
ruta.post('/add', function (req, res, next) {

    //Extrae los datos enviados por la forma
    let NumeroCategoria = req.body.NumeroCategoria;
    let Nombre = req.body.Nombre;

    let errors = false;

    //Si no hay errores
    if (!errors) {

        //Encapsula datos de la forma
        var datosForma = {
            NumeroCategoria: NumeroCategoria,
            Nombre: Nombre
        }

        //Invoca al Microservicio
        request.post({ url: "http://localhost:4000/categorias", json: datosForma }, (error, response, body) => {
            mensaje = 'El dato se ha agregado con éxito';
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/categorias'); //Redirige a Lista de Categorías
        });

    }
});



//Despliega pantalla para Modificar Categoría
ruta.get('/update/:NumeroCategoria', (req, res) => {
    NumeroCategoria = req.params.NumeroCategoria;
    mensaje = 'Modificando Categoría con Número de Categoría' + NumeroCategoria;
    console.log(mensaje);

    var CategoriaFind;
    //Busca si existe la Categoría de acuerdo al Número de Categoría
    URI = "http://localhost:4000/categorias/" + NumeroCategoria;
    console.log('URI: ' + URI);

    request.get(URI, (error, response, body) => {

        mensaje = '';
        if (error) { //En caso de que surja un error
            console.log(error);
            mensaje = 'Error' + error;
        }

        console.log("Categoría encontrada ====> ");
        console.log(body);


        //Despliega pantalla para modificar Categoría
        res.render('categorias/edit', {
            mensaje: mensaje,
            title: 'Editar Categoría', //Título de la página
            NumeroCategoria: JSON.parse(body).NumeroCategoria, //Datos de Categoría
            Nombre: JSON.parse(body).Nombre
        });
    });
});


// Modificando una nueva Categoría a través del Microservicio
ruta.post('/update', function (req, res, next) {

    console.log('Modificando una Categoría');
    //Extrae los datos enviados por la forma
    let NumeroCategoria = req.body.NumeroCategoria;
    let Nombre = req.body.Nombre;

    let errors = false;

    // Si no hay errores
    if (!errors) {

        //Encapsula datos provenientes de la forma
        var datosForma = {
            NumeroCategoria: NumeroCategoria,
            Nombre: Nombre
        }
        //Invoca al Microservicio de modificar
        request.put({ url: "http://localhost:4000/categorias", json: datosForma },
            (error, response, body) => {
                mensaje = 'El dato se ha modificado con éxito';
                if (error) {
                    console.log(error);
                    mensaje = 'Error: ' + error;
                }
                console.log(response);
                res.redirect('/categorias'); //Redirige a Listado de Categorías
            });
    }
});

//Eliminar una Categoría
ruta.get('/delete/:_id', (req, res) => {
    _id = req.params._id;
    mensaje = 'Eliminando Categoría con Número de Categoría' + _id;
    console.log(mensaje);


    if (_id) {
        //Invoca al Microservicio
        URI = "http://localhost:4000/categorias/" + _id;
        request.delete(URI, (error, response, body) => {
            mensaje = 'El dato se ha eliminado con éxito';
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/categorias'); //Redirige a Listado de Categorías
        });
    }
});


module.exports = ruta;