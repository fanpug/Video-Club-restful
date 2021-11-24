const express = require('express');

const Booking = require("../models/booking");


function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;

    Booking.paginate({}, {page:page, limit:3})
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

    Booking.findOne({"_id":id})
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

    Booking.remove({"_id":id})
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