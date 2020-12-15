var express = require('express');
var ruta = express.Router();
var request = require('request');

var mensaje = '';


//Metodo GET sirve para listar los registros
ruta.get('/', function (req, res, next) {
    //Consume mediante RESTApi
    request.get("http://localhost:4000/artistas", (error, response, body) => {

        mensaje = '';
        if (error) { //En caso de que surja un error
            console.log(error);
            mensaje = 'Error: ' + error;
        }

        console.log(JSON.parse(body));
        //Enviamos la información a la vista en formato JSON
        res.render('artistas/index', {
            mensaje: mensaje,
            title: 'Listado de Artistas',
            data: JSON.parse(body)
        });
    });
});


//Despliega la pantalla para agregar Cancion
ruta.get('/add', (req, res) => {
    mensaje = 'Agregando Artista';
    //Despliega pantalla para captura de Cancion
    res.render('artistas/add', {
        mensaje: mensaje,
        title: 'Agregar un artista', //Titulo de la página
        NumeroArtista: '', //Datos de la Cancion
        Nombres: '',
        Apellidos: '',
        Edad: '',
        Twitter: ''
    });
});

//Agregando un nuevo libro a través del Microservicio
ruta.post('/add', function (req, res, next) {

    //Extrae los datos enviados por la forma
    let NumeroArtista = req.body.NumeroArtista;
    let Nombres = req.body.Nombres;
    let Apellidos = req.body.Apellidos;
    let Edad = req.body.Edad;
    let Twitter = req.body.Twitter;

    let errors = false;

    //Si no hay errores
    if (!errors) {

        //Encapsula datos de la forma
        var datosForma = {
            NumeroArtista: NumeroArtista,
            Nombres: Nombres,
            Apellidos: Apellidos,
            Edad: Edad,
            Twitter: Twitter
        }

        //Invoca al Microservicio
        request.post({ url: "http://localhost:4000/artistas", json: datosForma }, (error, response, body) => {
            mensaje = 'El dato se ha agregado con éxito';
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/artistas'); //Redirige a Lista de Libros
        });

    }
});


/*
//Despliega pantalla para Modificar Canción con ID
ruta.get('/update/:_id', (req, res) => {
    _id = req.params._id;
    mensaje = 'Modificando Artista con el ID ' + _id;
    console.log(mensaje);

    var ArtistaFind;
    //Busca si existe la canción de acuerdo al Número de Canción
    URI = "http://localhost:4000/artistas/" + _id;
    console.log('URI: ' + URI);

    request.get(URI, (error, response, body) => {

        mensaje = '';
        if (error) { //En caso de que surja un error
            console.log(error);
            mensaje = 'Error' + error;
        }

        console.log("Artista encontrado ====> ");
        console.log(body);


        //Despliega pantalla para modificar Cancion
        res.render('artistas/edit', {
            mensaje: mensaje,
            title: 'Editar Artista', //Título de la página
            NumeroArtista: JSON.parse(body).NumeroArtista, //Datos de Cancion
            Nombres: JSON.parse(body).Nombres,
            Apellidos: JSON.parse(body).Apellidos,
            Edad: JSON.parse(body).Edad,
            Twitter: JSON.parse(body).Twitter
        });
    });
});
*/

//Despliega pantalla para Modificar Canción con ID
ruta.get('/update/:numeroartista', (req, res) => {
    numeroartista = req.params.numeroartista;
    mensaje = 'Modificando Artista con el numero ' + numeroartista;
    console.log(mensaje);

    var ArtistaFind;
    //Busca si existe la canción de acuerdo al Número de Canción
    URI = "http://localhost:4000/artistas/" + numeroartista;
    console.log('URI: ' + URI);

    request.get(URI, (error, response, body) => {

        mensaje = '';
        if (error) { //En caso de que surja un error
            console.log(error);
            mensaje = 'Error' + error;
        }

        console.log("Artista encontrado ====> ");
        console.log(body);


        //Despliega pantalla para modificar Cancion
        res.render('artistas/edit', {
            mensaje: mensaje,
            title: 'Editar Artista', //Título de la página
            NumeroArtista: JSON.parse(body).NumeroArtista, //Datos de Cancion
            Nombres: JSON.parse(body).Nombres,
            Apellidos: JSON.parse(body).Apellidos,
            Edad: JSON.parse(body).Edad,
            Twitter: JSON.parse(body).Twitter
        });
    });
});



// Modificando un nuevo libro a través del Microservicio
ruta.post('/update', function (req, res, next) {

    console.log('Modificando un Artista');
    //Extrae los datos enviados por la forma
    let NumeroArtista = req.body.NumeroArtista;
    let Nombres = req.body.Nombres;
    let Apellidos = req.body.Apellidos;
    let Edad = req.body.Edad;
    let Twitter= req.body.Twitter;

    let errors = false;

    // Si no hay errores
    if (!errors) {

        //Encapsula datos provenientes de la forma
        var datosForma = {
            NumeroArtista: NumeroArtista,
            Nombres: Nombres,
            Apellidos: Apellidos,
            Edad: Edad,
            Twitter: Twitter
        }
        //Invoca al Microservicio de modificar
        request.put({ url: "http://localhost:4000/artistas", json: datosForma },
            (error, response, body) => {
                mensaje = 'El dato se ha modificado con éxito';
                if (error) {
                    console.log(error);
                    mensaje = 'Error: ' + error;
                }
                console.log(response);
                res.redirect('/artistas'); //Redirige a Listado de Canciones
            });
    }
});


/*
//Eliminar un artista por ID
ruta.get('/delete/:_id', (req, res) => {
    _id = req.params._id;
    mensaje = 'Eliminando Artista con ID de Artista ' + _id;
    console.log(mensaje);


    if (_id) {
        //Invoca al Microservicio
        URI = "http://localhost:4000/artistas/" + _id;
        request.delete(URI, (error, response, body) => {
            mensaje = 'El dato se ha eliminado con éxito';
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/artistas'); //Redirige a Listado de canciones
        });
    }
});
*/

//Eliminar un artista por numero
ruta.get('/delete/:numeroartista', (req, res) => {
    numeroartista = req.params.numeroartista;
    mensaje = 'Eliminando Artista con numero de Artista ' + numeroartista;
    console.log(mensaje);


    if (numeroartista) {
        //Invoca al Microservicio
        URI = "http://localhost:4000/artistas/" + numeroartista;
        request.delete(URI, (error, response, body) => {
            mensaje = 'El dato se ha eliminado con éxito';
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/artistas'); //Redirige a Listado de canciones
        });
    }
});

module.exports = ruta;