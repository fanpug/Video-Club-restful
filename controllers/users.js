const express = require('express');
const User = require("../models/user");


function list(req, res, next) {
    //email, name, lastName, password
    User.find()
    .then(objs => res.status(200).json({
        message: 'Lista de usuarios del sistema',
        obj: objs
    }))
    .catch(ex => res.status(500).json({
        message: "No se pudo consultar la informacion de los usuarios",
        obj: ex
    }));

}

function index(req, res, next){
    const id = req.params.id;

    User.findOne({"_id":id})
    .then(obj => res.status(200).json({
        message: `Se retorna el usuario con ID ${id}`,
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message: `No se pudo consultar la informacion del usuario con ID ${id}`,
        obj: ex
    }));

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