const router = require("../routes");
const { Copy } = require('../db');
const express = require('express');


function list(req, res, next) {
    res.send('Lista de copias del sistema');
    Copy.findAll()
        .then(objects => res.json(objects))
        .catch(err => res.send(err));
}

function index(req, res, next){
    const id = req.params.id;
    Copy.findByPk(id)
        .then(objects => res.json(objects))
        .catch(err => res.send(err));
}

function create(req, res, next){
    const number = req.body.number;
    const format = req.body.format;
    const status = req.body.status;

    let copy = new Object({
        number:number,
        format:format,
        status:status

    });

    Copy.create(copy)
        .then(obj => res.json(obj))
        .catch(err => res.send(err));

}

function replace(req, res, next){
   
}

function edit(req, res, next){

}

function destroy(req, res, next){
    const id = req.params.id;
    Copy.destroy({ where: {id:id} })
        .then(objects => res.json(objects))
        .catch(err => res.send(err));
}


module.exports = {
    list, index, create, replace, edit, destroy
}