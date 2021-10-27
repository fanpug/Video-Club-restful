const express = require('express');

const Movie = require("../models/movie");


function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;

    Movie.paginate({}, {page:page, limit:3})
    .then(objs => res.status(200).json({
        message: 'Lista de peliculas del sistema',
        obj: objs
    }))
    .catch(ex => res.status(500).json({
        message: "No se pudo consultar la informacion de las peliculas",
        obj: ex
    }));
}

function index(req, res, next){
    const id = req.params.id;

    Movie.findOne({"_id":id})
    .then(obj => res.status(200).json({
        message: `Se retorna la pelicula con ID ${id}`,
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message: `No se pudo consultar la informacion de la pelicula con ID ${id}`,
        obj: ex
    }));

}

function create(req, res, next){
    const genre = req.body.genre;
    const title = req.body.title;
    const actors = req.body.actors;

    const directorName = req.body.directorName;
    const directorLastName = req.body.directorLastName;

    const director = new Map([
        ['name', directorName],
        ['lastName', directorLastName],
    ]);

    let movie = new Movie({
        genre: genre,
        title: title,
        actors: actors,
        director: director
    });

    movie.save()
    .then(obj => res.status(200).json({
        message: 'Movie creada correctamente',
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message: 'No se pudo crear la movie.',
        obj: ex
    }));
}

function replace(req, res, next){
    const id = req.params.id;
    const genre = req.body.genre ? req.body.genre : "";
    const title = req.body.title ? req.body.title : "";
    const actors = req.body.actors ? req.body.actors : "";

    const directorName = req.body.directorName ? req.body.directorName : "";
    const directorLastName = req.body.directorLastName ? req.body.directorLastName : "";

    const director = new Map([
        ['name', directorName],
        ['lastName', directorLastName],
    ]);

    let movie = new Object({
        _genre: genre,
        _title: title,
        _actors: actors,
        _director: director
    });

    Movie.findOneAndUpdate({"_id":id}, movie)
    .then(obj => res.status(200).json({
        message: `Se reemplaza la pelicula con ID ${id}`,
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message: `No se pudo reemplazar la pelicula con ID ${id}`,
        obj: ex
    }));
}

function edit(req, res, next){
    const genre = req.body.genre;
    const title = req.body.title;
    const actors = req.body.actors;

    const directorName = req.body.directorName;
    const directorLastName = req.body.directorLastName;

    let movie = new Object();

    if(genre){
        movie._genre = genre;
    }
    
    if(title){
        movie._title = title;
    }

    if(actors){
        movie._actors = actors;
    }

    if(directorName){
        movie._director.set('_Name', directorName);
    }

    if(directorLastName){
        movie._director.set('_lastName', directorLastName);
    }

    Movie.findOneAndUpdate({"_id":id}, movie)
    .then(obj => res.status(200).json({
        message: `Se actualiza la pelicula con ID ${id}`,
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message: `No se pudo actualizar la pelicula con ID ${id}`,
        obj: ex
    }));
}

function destroy(req, res, next){
    const id = req.params.id;

    Movie.remove({"_id":id})
    .then(obj => res.status(200).json({
        message: `Se elimino la pelicula con ID ${id}`,
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message: `No se pudo eliminar la pelicula con ID ${id}`,
        obj: ex
    }));
}


module.exports = {
    list, index, create, replace, edit, destroy
}