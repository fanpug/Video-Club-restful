const express = require('express');

const Actor = require("../models/actor");


function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;

    Actor.paginate({}, {page:page, limit:3})
    .then(objs => res.status(200).json({
        message: 'Lista de actores del sistema',
        obj: objs
    }))
    .catch(ex => res.status(500).json({
        message: "No se pudo consultar la informacion de los actores",
        obj: ex
    }));
}

function index(req, res, next){
    const id = req.params.id;

    Actor.findOne({"_id":id})
    .then(obj => res.status(200).json({
        message: `Se retorna el actor con ID ${id}`,
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message: `No se pudo consultar la informacion del actor con ID ${id}`,
        obj: ex
    }));

}

function create(req, res, next){
    const name = req.body.name;
    const lastName = req.body.lastName;

    let actor = new Actor({
        name:name,
        lastName:lastName
    });

    actor.save()
    .then(obj => res.status(200).json({
        message: 'Actor creado correctamente',
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message: 'No se pudo crear el actor.',
        obj: ex
    }));
}

function replace(req, res, next){
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";

    let actor = new Object({
        _name: name,
        _lastName: lastName
    });

    Actor.findOneAndUpdate({"_id":id}, actor)
    .then(obj => res.status(200).json({
        message: `Se reemplaza el actor con ID ${id}`,
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message: `No se pudo reemplazar el actor con ID ${id}`,
        obj: ex
    }));
}

function edit(req, res, next){
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;

    let actor = new Object();

    if(name){
        actor._name = name;
    }

    if(lastName){
        actor._lastName = lastName;
    }

    Actor.findOneAndUpdate({"_id":id}, actor)
    .then(obj => res.status(200).json({
        message: `Se actualiza el actor con ID ${id}`,
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message: `No se pudo actualizar el actor con ID ${id}`,
        obj: ex
    }));
}

function destroy(req, res, next){
    const id = req.params.id;

    Actor.remove({"_id":id})
    .then(obj => res.status(200).json({
        message: `Se elimino el actor con ID ${id}`,
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message: `No se pudo eliminar el actor con ID ${id}`,
        obj: ex
    }));
}


module.exports = {
    list, index, create, replace, edit, destroy
}