const router = require("../routes");
const { Director } = require('../db');
const express = require('express');


function list(req, res, next) {
    res.send('Lista de directores del sistema');
    Director.findAll().then(objects => res.json(objects));
}

function index(req, res, next){
    const id = req.params.id;
    Director.findByPk(id).then(objects => res.json(objects));
}

function create(req, res, next){
    const name = req.body.name;
    const lastName = re.body.lastName;

    let director = new Object({
        name:name,
        lastName:lastName
    });

    Director.create(director)
        .then(obj => res.json(obj))
        .catch(err => res.send(err));

    res.send("Crear un director nuevo");
}

function replace(req, res, next){
    res.send(`Reemplazo el director con ID = ${req.params.id} por otro.`);
}

function edit(req, res, next){
    res.send(`Reemplazo las propiedades del director con ID = ${req.params.id} por otras.`);
}

function destroy(req, res, next){
    res.send(`Destrui un director con ID = ${req.params.id}.`);
}


module.exports = {
    list, index, create, replace, edit, destroy
}