const router = require("../routes");
const { Booking } = require('../db');
const express = require('express');


function list(req, res, next) {
    res.send('Lista de bookings del sistema');
    Booking.findAll()
        .then(objects => res.json(objects))
        .catch(err => res.send(err));
}

function index(req, res, next){
    const id = req.params.id;
    Booking.findByPk(id)
        .then(objects => res.json(objects))
        .catch(err => res.send(err));
}

function create(req, res, next){
    const name = req.body.name;
    const lastName = req.body.lastName;
    const address = req.body.address;
    const phone = req.body.phone;
    const status = req.body.status;

    let booking = new Object({
        name:name,
        lastName:lastName,
        address:address,
        phone:phone,
        status:status

    });

    Booking.create(booking)
        .then(obj => res.json(obj))
        .catch(err => res.send(err));

}

function replace(req, res, next){
   
}

function edit(req, res, next){

}

function destroy(req, res, next){
    const id = req.params.id;
    Booking.destroy({ where: {id:id} })
        .then(objects => res.json(objects))
        .catch(err => res.send(err));
}


module.exports = {
    list, index, create, replace, edit, destroy
}