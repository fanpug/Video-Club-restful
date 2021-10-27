const express = require('express');

const Member = require("../models/member");


function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;

    Member.paginate({}, {page:page, limit:3})
    .then(objs => res.status(200).json({
        message: 'Lista de miembros del sistema',
        obj: objs
    }))
    .catch(ex => res.status(500).json({
        message: "No se pudo consultar la informacion de los miembros",
        obj: ex
    }));
}

function index(req, res, next){
    const id = req.params.id;

    Member.findOne({"_id":id})
    .then(obj => res.status(200).json({
        message: `Se retorna el miembro con ID ${id}`,
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message: `No se pudo consultar la informacion del miembro con ID ${id}`,
        obj: ex
    }));

}

function create(req, res, next){
    const lastName = req.body.lastName;
    const name = req.body.name;
    const phone = req.body.phone;
    const status = req.body.status;

    const city = req.body.city;
    const country = req.body.country;
    const number = req.body.number;
    const state = req.body.state;
    const street = req.body.street;

    const address = new Object({
        _city: city,
        _country: country,
        _number: number,
        _state: state,
        _street: street
    });

    let member = new Member({
        address: address,
        lastName: lastName,
        name: name,
        phone: phone,
        status: status
    });

    member.save()
    .then(obj => res.status(200).json({
        message: 'Miembro creado correctamente',
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message: 'No se pudo crear el miembro.',
        obj: ex
    }));
}

function replace(req, res, next){
    const id = req.params.id;
    const lastName = req.body.lastName ? req.body.lastName : '';
    const name = req.body.name ? req.body.name : '';
    const phone = req.body.phone ? req.body.phone : ''; 
    const status = req.body.status ? req.body.status : object.status; 

    const city = req.body.city ? req.body.city : '';
    const country = req.body.country ? req.body.country : '';
    const number = req.body.number ? req.body.number : '';
    const state = req.body.state ? req.body.state : '';
    const street = req.body.street ? req.body.street : '';

    const address = new Object({
        _city: city,
        _country: country,
        _number: number,
        _state: state,
        _street: street
    });

    let member = new Object({
        _address: address,
        _lastName: lastName,
        _name: name,
        _phone: phone,
        _status: status,
    });


    Member.findOneAndUpdate({"_id":id}, member)
    .then(obj => res.status(200).json({
        message: `Se reemplaza el miembro con ID ${id}`,
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message: `No se pudo reemplazar el miembro con ID ${id}`,
        obj: ex
    }));
}

function edit(req, res, next){
    const id = req.params.id;
    const lastName = req.body.lastName;
    const name = req.body.name;
    const phone = req.body.phone;
    const status = req.body.status;

    const city = req.body.city;
    const country = req.body.country;
    const number = req.body.number;
    const state = req.body.state;
    const street = req.body.street;

    let member = new Object();

    if(lastName){
        member._lastName = lastName;
    }
    
    if(name){
        member._name = name;
    }

    if(phone){
        member._phone = phone;
    }
    
    if(status){
        member._status = status;
    }

    if(city){
        member._address.set('_city', city);
    }

    if(country){
        member._address.set('_country', country);
    }

    if(number){
        member._address.set('_number', number);
    }

    if(state){
        member._address.set('_state', state);
    }

    if(street){
        member._address.set('_street', street);
    }


    Member.findOneAndUpdate({"_id":id}, member)
    .then(obj => res.status(200).json({
        message: `Se actualiza el miembro con ID ${id}`,
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message: `No se pudo actualizar el miembro con ID ${id}`,
        obj: ex
    }));
}

function destroy(req, res, next){
    const id = req.params.id;

    Member.remove({"_id":id})
    .then(obj => res.status(200).json({
        message: `Se elimino el miembro con ID ${id}`,
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message: `No se pudo eliminar el miembro con ID ${id}`,
        obj: ex
    }));
}


module.exports = {
    list, index, create, replace, edit, destroy
}