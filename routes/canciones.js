var express = require('express');
var ruta = express.Router();
var request = require('request');

var mensaje = '';
var data1 = [];
var data2 = [];


//Metodo GET sirve para listar los registros
ruta.get('/', function (req, res, next) {
    //Consume mediante RESTApi
    request.get("http://localhost:4000/canciones", (error, response, body) => {

        mensaje = '';
        if (error) { //En caso de que surja un error
            console.log(error);
            mensaje = 'Error: ' + error;
        }

        console.log(JSON.parse(body));
        //Enviamos la información a la vista en formato JSON
        res.render('canciones/index', {
            mensaje: mensaje,
            title: 'Listado de Canciones',
            data: JSON.parse(body)
        });
    });
});


//Despliega la pantalla para agregar Cancion
ruta.get('/add', (req, res) => {

    //Enlaza la informacion de artistas
    request.get("http://localhost:4000/artistas", (error, response, body) => {

        mensaje = '';
        if (error) { //En caso de que surja un error
            console.log(error);
            mensaje = 'Error: ' + error;
        }
        data1 = JSON.parse(body);
        console.log(data1);
    });

        //Enlaza la informacion de generos
        request.get("http://localhost:4000/generos", (error, response, body) => {

            mensaje = '';
            if (error) { //En caso de que surja un error
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            data2 = JSON.parse(body);
            console.log(data2);
        });

    //Despliega pantalla para captura de Cancion
    res.render('canciones/add', {
        mensaje: mensaje,
        title: 'Agregar una canción', //Titulo de la página
        NumeroCancion: '', //Datos de la Cancion
        Titulo: '',
        NumeroArtista: '',
        Año: '',
        Autor: '',
        Duracion: '',
        NumeroGenero: '',
        datos1: data1,
        datos2: data2
    });
});

//Agregando un nuevo libro a través del Microservicio
ruta.post('/add', function (req, res, next) {

    //Extrae los datos enviados por la forma
    let NumeroCancion = req.body.NumeroCancion;
    let Titulo = req.body.Titulo;
    let NumeroArtista = req.body.NumeroArtista;
    let Año = req.body.Año;
    let Autor = req.body.Autor;
    let Duracion = req.body.Duracion;
    let NumeroGenero = req.body.NumeroGenero;

    let errors = false;

    //Si no hay errores
    if (!errors) {

        //Encapsula datos de la forma
        var datosForma = {
            NumeroCancion: NumeroCancion,
            Titulo: Titulo,
            NumeroArtista: NumeroArtista,
            Año: Año,
            Autor: Autor,
            Duracion: Duracion,
            NumeroGenero: NumeroGenero
        }

        //Invoca al Microservicio
        request.post({ url: "http://localhost:4000/canciones", json: datosForma }, (error, response, body) => {
            mensaje = 'El dato se ha agregado con éxito';
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/canciones'); //Redirige a Lista de Libros
        });

    }
});


/*
//Despliega pantalla para Modificar Canción con ID
ruta.get('/update/:_id', (req, res) => {
    _id = req.params._id;
    mensaje = 'Modificando Canción con el ID ' + _id;
    console.log(mensaje);

    var CancionFind;
    //Busca si existe la canción de acuerdo al Número de Canción
    URI = "http://localhost:4000/canciones/" + _id;
    console.log('URI: ' + URI);

    request.get(URI, (error, response, body) => {

        mensaje = '';
        if (error) { //En caso de que surja un error
            console.log(error);
            mensaje = 'Error' + error;
        }

        console.log("Canción encontrada ====> ");
        console.log(body);


        //Despliega pantalla para modificar Cancion
        res.render('canciones/edit', {
            mensaje: mensaje,
            title: 'Editar Cancion', //Título de la página
            NumeroCancion: JSON.parse(body).NumeroCancion, //Datos de Cancion
            Titulo: JSON.parse(body).Titulo,
            Artista: JSON.parse(body).Artista,
            Año: JSON.parse(body).Año,
            Autor: JSON.parse(body).Autor,
            Duracion: JSON.parse(body).Duracion,
            Genero: JSON.parse(body).Genero
        });
    });
});
*/

//Despliega pantalla para Modificar Canción con Numero
ruta.get('/update/:numerocancion', (req, res) => {
    numerocancion = req.params.numerocancion;
    mensaje = 'Modificando Canción con el numero ' + numerocancion;
    console.log(mensaje);

    var CancionFind;
    //Busca si existe la canción de acuerdo al Número de Canción
    URI = "http://localhost:4000/canciones/" + numerocancion;
    console.log('URI: ' + URI);

    request.get(URI, (error, response, body) => {

        mensaje = '';
        if (error) { //En caso de que surja un error
            console.log(error);
            mensaje = 'Error' + error;
        }

        console.log("Canción encontrada ====> ");
        console.log(body);

        //Despliega pantalla para modificar Cancion
        res.render('canciones/edit', {
            mensaje: mensaje,
            title: 'Editar Cancion', //Título de la página
            NumeroCancion: JSON.parse(body).NumeroCancion, //Datos de Cancion
            Titulo: JSON.parse(body).Titulo,
            NumeroArtista: JSON.parse(body).NumeroArtista,
            Año: JSON.parse(body).Año,
            Autor: JSON.parse(body).Autor,
            Duracion: JSON.parse(body).Duracion,
            NumeroGenero: JSON.parse(body).NumeroGenero
        });
    });
});

// Modificando un nuevo libro a través del Microservicio
ruta.post('/update', function (req, res, next) {

    console.log('Modificando un Canción');
    //Extrae los datos enviados por la forma
    let NumeroCancion = req.body.NumeroCancion;
    let Titulo = req.body.Titulo;
    let Año = req.body.Año;
    let Autor = req.body.Autor;
    let Duracion= req.body.Duracion;

    let errors = false;

    // Si no hay errores
    if (!errors) {

        //Encapsula datos provenientes de la forma
        var datosForma = {
            NumeroCancion: NumeroCancion,
            Titulo: Titulo,
            Año: Año,
            Autor: Autor,
            Duracion: Duracion
        }
        //Invoca al Microservicio de modificar
        request.put({ url: "http://localhost:4000/canciones", json: datosForma },
            (error, response, body) => {
                mensaje = 'El dato se ha modificado con éxito';
                if (error) {
                    console.log(error);
                    mensaje = 'Error: ' + error;
                }
                console.log(response);
                res.redirect('/canciones'); //Redirige a Listado de Canciones
            });
    }
});

/*
//Eliminar un libro con ID
ruta.get('/delete/:_id', (req, res) => {
    _id = req.params._id;
    mensaje = 'Eliminando Libro con ID de Canción ' + _id;
    console.log(mensaje);


    if (_id) {
        //Invoca al Microservicio
        URI = "http://localhost:4000/canciones/" + _id;
        request.delete(URI, (error, response, body) => {
            mensaje = 'El dato se ha eliminado con éxito';
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/canciones'); //Redirige a Listado de canciones
        });
    }
});
*/

//Eliminar un libro con Numero
ruta.get('/delete/:numerocancion', (req, res) => {
    numerocancion = req.params.numerocancion;
    mensaje = 'Eliminando Libro con Número de Canción ' + numerocancion;
    console.log(mensaje);


    if (numerocancion) {
        //Invoca al Microservicio
        URI = "http://localhost:4000/canciones/" + numerocancion;
        request.delete(URI, (error, response, body) => {
            mensaje = 'El dato se ha eliminado con éxito';
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/canciones'); //Redirige a Listado de canciones
        });
    }
});

module.exports = ruta;