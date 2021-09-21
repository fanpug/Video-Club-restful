const router = require("../routes");

const express = require('express');


function list(req, res, next) {
    res.send('Lista de usuarios del sistema');
}

function index(req, res, next){
    res.send(`Usuario del sistema con un ID = ${req.params.id}`);

}

function create(req, res, next){
    res.send("Crear un usuario nuevo");
}

function replace(req, res, next){
    res.send(`Reemplazo el usuario con ID = ${req.params.id} por otro.`);
}

function edit(req, res, next){
    res.send(`Reemplazo las propiedades del usuario con ID = ${req.params.id} por otras.`);
}

function destroy(req, res, next){
    res.send(`Destrui un usuario con ID = ${req.params.id}.`);
}


module.exports = {
    list, index, create, replace, edit, destroy
}