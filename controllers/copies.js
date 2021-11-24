const express = require('express');

const Copy = require("../models/copy");


function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;

    Copy.paginate({}, {page:page, limit:3})
    .then(objs => res.status(200).json({
        message: res.__('ok.find'),
        obj: objs
    }))
    .catch(ex => res.status(500).json({
        message: res.__('bad.find'),
        obj: ex
    }));
}

function index(req, res, next){
    const id = req.params.id;

    Copy.findOne({"_id":id})
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
    const format = req.body.format;
    const movie = req.body.movie;
    const number = req.body.number;
    const status = req.body.status;

    let copy = new Copy({
        format:format,
        movie:movie,
        number:number,
        status:status
    });

    copy.save()
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
    let format = req.body.format ? req.body.format : "";
    let movie = req.body.movie ? req.body.movie : "";
    let number = req.body.number ? req.body.number : "";
    let status = req.body.status ? req.body.status : "";

    let copy = new Object({
        _format:format,
        _movie:movie,
        _number:number,
        _status:status
    });

    Copy.findOneAndUpdate({"_id":id}, copy)
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
    let format = req.body.format;
    let movie = req.body.movie;
    let number = req.body.number;
    let status = req.body.status;
    

    let copy = new Object();

    if(format){
        copy._format = format;
    }

    if(movie){
        copy._movie = movie;
    }

    if(number){
        copy._number = number;
    }

    if(status){
        copy._status = status;
    }

    Copy.findOneAndUpdate({"_id":id}, copy)
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

    Copy.remove({"_id":id})
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