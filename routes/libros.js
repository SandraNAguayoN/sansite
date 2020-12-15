var express = require('express');
var ruta = express.Router();
var request = require('request');

var mensaje = '';


//Metodo GET sirve para listar los registros
ruta.get('/', function (req, res, next) {
    //Consume mediante RESTApi
    request.get("http://localhost:4000/libros", (error, response, body) => {

        mensaje = '';
        if (error) { //En caso de que surja un error
            console.log(error);
            mensaje = 'Error: ' + error;
        }

        console.log(JSON.parse(body));
        //Enviamos la información a la vista en formato JSON
        res.render('libros/index', {
            mensaje: mensaje,
            title: 'Listado de libros',
            data: JSON.parse(body)
        });
    });
});

//Despliega la pantalla para agregar Libro
ruta.get('/add', (req, res) => {
    mensaje = 'Agregando Libro';
    //Despliega pantalla para captura de Libro
    res.render('libros/add', {
        mensaje: mensaje,
        title: 'Agregar un libro', //Titulo de la página
        NumeroLibro: '', //Datos de Libro
        Titulo: '',
        Autor: '',
        Categoria: '',
        FechaPublicacion: '',
        NoEdicion: '',
        Argumento: ''
    });
});

//Agregando un nuevo libro a través del Microservicio
ruta.post('/add', function (req, res, next) {

    //Extrae los datos enviados por la forma
    let NumeroLibro = req.body.NumeroLibro;
    let Titulo = req.body.Titulo;
    let Autor = req.body.Autor;
    let Categoria = req.body.Categoria;
    let FechaPublicacion = req.body.FechaPublicacion;
    let NoEdicion = req.body.NoEdicion;
    let Argumento = req.body.Argumento;

    let errors = false;

    //Si no hay errores
    if (!errors) {

        //Encapsula datos de la forma
        var datosForma = {
            NumeroLibro: NumeroLibro,
            Titulo: Titulo,
            Autor: Autor,
            Categoria: Categoria,
            FechaPublicacion: FechaPublicacion,
            NoEdicion: NoEdicion,
            Argumento: Argumento
        }

        //Invoca al Microservicio
        request.post({ url: "http://localhost:4000/libros", json: datosForma }, (error, response, body) => {
            mensaje = 'El dato se ha agregado con éxito';
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/libros'); //Redirige a Lista de Libros
        });

    }
});



//Despliega pantalla para Modificar Libro
ruta.get('/update/:_id', (req, res) => {
    _id = req.params._id;
    mensaje = 'Modificando Libro con el ID ' + _id;
    console.log(mensaje);

    var LibroFind;
    //Busca si existe el libro de acuerdo al Número de libro
    URI = "http://localhost:4000/libros/" + _id;
    console.log('URI: ' + URI);

    request.get(URI, (error, response, body) => {

        mensaje = '';
        if (error) { //En caso de que surja un error
            console.log(error);
            mensaje = 'Error' + error;
        }

        console.log("Libro encontrado ====> ");
        console.log(body);


        //Despliega pantalla para modificar estudiante
        res.render('libros/edit', {
            mensaje: mensaje,
            title: 'Editar Libro', //Título de la página
            NumeroLibro: JSON.parse(body).NumeroLibro, //Datos de Estudiante
            Titulo: JSON.parse(body).Titulo,
            Autor: JSON.parse(body).Autor,
            Categoria: JSON.parse(body).Categoria,
            FechaPublicacion: JSON.parse(body).FechaPublicacion,
            NoEdicion: JSON.parse(body).NoEdicion,
            Argumento: JSON.parse(body).Argumento
        });
    });
});


// Modificando un nuevo libro a través del Microservicio
ruta.post('/update', function (req, res, next) {

    console.log('Modificando un Libro');
    //Extrae los datos enviados por la forma
    let NumeroLibro = req.body.NumeroLibro;
    let Titulo = req.body.Titulo;
    let Categoria = req.body.Categoria;
    let NoEdicion = req.body.NoEdicion;
    let Argumento = req.body.Argumento;

    let errors = false;

    // Si no hay errores
    if (!errors) {

        //Encapsula datos provenientes de la forma
        var datosForma = {
            NumeroLibro: NumeroLibro,
            Titulo: Titulo,
            Categoria: Categoria,
            NoEdicion: NoEdicion,
            Argumento: Argumento
        }
        //Invoca al Microservicio de modificar
        request.put({ url: "http://localhost:4000/libros", json: datosForma },
            (error, response, body) => {
                mensaje = 'El dato se ha modificado con éxito';
                if (error) {
                    console.log(error);
                    mensaje = 'Error: ' + error;
                }
                console.log(response);
                res.redirect('/libros'); //Redirige a Listado de Libros
            });
    }
});

//Eliminar un libro
ruta.get('/delete/:_id', (req, res) => {
    _id = req.params._id;
    mensaje = 'Eliminando Libro con Número de Libro ' + _id;
    console.log(mensaje);


    if (_id) {
        //Invoca al Microservicio
        URI = "http://localhost:4000/libros/" + _id;
        request.delete(URI, (error, response, body) => {
            mensaje = 'El dato se ha eliminado con éxito';
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/libros'); //Redirige a Listado de libros
        });
    }
});


module.exports = ruta;