const express = require('express');

const Booking = require("../models/booking");


function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;

    Booking.paginate({}, {page:page, limit:3})
    .then(objs => res.status(200).json({
        message: 'Lista de bookings del sistema',
        obj: objs
    }))
    .catch(ex => res.status(500).json({
        message: "No se pudo consultar la informacion de los bookings",
        obj: ex
    }));
}

function index(req, res, next){
    const id = req.params.id;

    Booking.findOne({"_id":id})
    .then(obj => res.status(200).json({
        message: `Se retorna el booking con ID ${id}`,
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message: `No se pudo consultar la informacion del booking con ID ${id}`,
        obj: ex
    }));

}

function create(req, res, next){
    const copy = req.body.copy;
    const member = req.body.member;
    const date = req.body.date;

    let booking = new Booking({
        copy: copy,
        member: member,
        date: date
    });

    booking.save()
    .then(obj => res.status(200).json({
        message: 'Booking creado correctamente',
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message: 'No se pudo crear el booking.',
        obj: ex
    }));
}

function replace(req, res, next){
    const copy = req.body.copy ? req.body.copy : "";
    const member = req.body.member ? req.body.member : "";
    const date = req.body.date ? req.body.date : "";

    let booking = new Object({
        _copy: copy,
        _member: member,
        _date: date
    });

    Booking.findOneAndUpdate({"_id":id}, booking)
    .then(obj => res.status(200).json({
        message: `Se reemplaza el booking con ID ${id}`,
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message: `No se pudo reemplazar el booking con ID ${id}`,
        obj: ex
    }));
}

function edit(req, res, next){
    const id = req.params.id;
    const copy = req.body.copy;
    const member = req.body.member;
    const date = req.body.date;

    let booking = new Object();

    if(copy){
        booking._copy = copy;
    }
    
    if(member){
        booking._member = member;
    }

    if(date){
        booking._date = date;
    }

    Booking.findOneAndUpdate({"_id":id}, booking)
    .then(obj => res.status(200).json({
        message: `Se actualiza el booking con ID ${id}`,
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message: `No se pudo actualizar el booking con ID ${id}`,
        obj: ex
    }));
}

function destroy(req, res, next){
    const id = req.params.id;

    Booking.remove({"_id":id})
    .then(obj => res.status(200).json({
        message: `Se elimino el booking con ID ${id}`,
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message: `No se pudo eliminar el booking con ID ${id}`,
        obj: ex
    }));
}


module.exports = {
    list, index, create, replace, edit, destroy
}