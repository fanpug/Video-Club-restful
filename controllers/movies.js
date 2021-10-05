const router = require("../routes");
const { Movie, Actor } = require('../db');
const express = require('express');


function list(req, res, next) {
    res.send('Lista de peliculas del sistema');
    Movie.findAll({include:['genres', 'directors', 'actors']})
        .then(objects => res.json(objects))
        .catch(err => res.send(err));
}

function index(req, res, next){
    const id = req.params.id;
    Movie.findByPk(id)
        .then(objects => res.json(objects))
        .catch(err => res.send(err));
}

function addActor(req, res, next){
    const idMovie = req.body.idMovie;
    const idActor = req.body.idActor;

    Movie.findByPk(id)
        .then((movie) => {
            Actor.findByPk(idActor).then((actor) => {
                movie.addActor(actor);
                res.json(movie);
            });
        });
}

function create(req, res, next){
    const title = req.body.title;
    const genreId = req.body.genreId;
    const directorId = req.body.directorId;

    let movie = new Object({
        title:title,
        genreId:genreId,
        directorId:directorId
    });

    Movie.create(movie)
        .then(obj => res.json(obj))
        .catch(err => res.send(err));

}

function replace(req, res, next){
    
}

function edit(req, res, next){
    
}

function destroy(req, res, next){
    const id = req.params.id;
    Movie.destroy({ where: {id:id} })
        .then(objects => res.json(objects))
        .catch(err => res.send(err));
}


module.exports = {
    list, index, create, replace, edit, destroy, addActor
}