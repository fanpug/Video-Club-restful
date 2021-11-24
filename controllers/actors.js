const express = require('express');
const config = require('config');
const Actor = require("../models/actor");


function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;

    Actor.paginate({}, {page:page, limit:config.get("paginate.size")})
    .then(obj => res.status(200).json({
        message: ('ok.find'),
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message: res.__('bad.find'),
        obj: ex
    }));
}

function index(req, res, next){
    const id = req.params.id;

    Actor.findOne({"_id":id})
    .then(obj => res.status(200).json({
        message: ('ok.find'),
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message: res.__('bad.find'),
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
        message: res.__('ok.create'),
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message: res.__('bad.create'),
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
        message: res.__('ok.replace'),
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message: res.__('bad.replace'),
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
        message: res.__('ok.edit'),
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message: res.__('bad.edit'),
        obj: ex
    }));
}

function destroy(req, res, next){
    const id = req.params.id;

    Actor.remove({"_id":id})
    .then(obj => res.status(200).json({
        message: res.__('ok.destroy'),
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message: res.__('bad.destroy'),
        obj: ex
    }));
}


module.exports = {
    list, index, create, replace, edit, destroy
}