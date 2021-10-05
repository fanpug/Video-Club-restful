const router = require("../routes");
const { Genre } = require('../db');
const express = require('express');


function list(req, res, next) {
    res.send('Lista de generos del sistema');
    Genre.findAll({include:['movies']})
        .then(objects => res.json(objects))
        .catch(err => res.send(err));
}

function index(req, res, next){
    const id = req.params.id;
    Genre.findByPk(id)
        .then(objects => res.json(objects))
        .catch(err => res.send(err));
}

function create(req, res, next){
    const description = req.body.description;
    const status = req.body.status;

    let genre = new Object({
        description:description,
        status:status
    });

    Genre.create(genre)
        .then(obj => res.json(obj))
        .catch(err => res.send(err));

}

function replace(req, res, next){
    const id = req.params.id;
    Director.findByPk(id)
        .then(object => {
            const name = req.body.name ? req.body.name : "";
            const lastName = req.body.lastName ? req.body.lastName : "";

            object.update({name:name, lastName:lastName})
                .then(director => res.json(director));
            })
        .catch(err => res.send(err));
}

function edit(req, res, next){
    const id = req.params.id;
    Director.findByPk(id)
        .then(object => {
            const name = req.body.name ? req.body.name : object.name;
            const lastName = req.body.lastName ? req.body.lastName : object.lastName;

            object.update({name:name, lastName:lastName})
                .then(director => res.json(director));
            })
        .catch(err => res.send(err));
}

function destroy(req, res, next){
    const id = req.params.id;
    Director.destroy({ where: {id:id} })
        .then(objects => res.json(objects))
        .catch(err => res.send(err));
}


module.exports = {
    list, index, create, replace, edit, destroy
}