const express = require('express');
const bcrypt = require('bcrypt');
const async = require('async');


const User = require("../models/user");



function list(req, res, next) {
    //email, name, lastName, password
    let page = req.params.page ? req.params.page : 1;

    User.paginate({}, {page:page, limit:3})
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

    User.findOne({"_id":id})
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
    const email = req.body.email;
    const password = req.body.password;

    async.parallel({
        salt:(callback)=>{
            bcrypt.genSalt(10, callback);
        }
    }, (err, result)=>{
        bcrypt.hash(password, result.salt, (error, hash)=>{
            let user = new User({
                name:name,
                lastName:lastName,
                email:email,
                password:hash,
                salt:result.salt
            });
        
            user.save()
            .then(obj => res.status(200).json({
                message: res.__('ok.create'),
                obj: obj
            }))
            .catch(ex => res.status(500).json({
                message: res.__('bad.create'),
                obj: ex
            }));
        });
    });

    
}

function replace(req, res, next){
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";
    let email = req.body.email ? req.body.email : "";
    let password = req.body.password ? req.body.password : "";

    let user = new Object({
        _name: name,
        _lastName: lastName,
        _email:email,
        _password:password
    });

    User.findOneAndUpdate({"_id":id}, user)
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
    let email = req.body.email;
    let password = req.body.password;

    let user = new Object();

    if(name){
        user._name = name;
    }

    if(lastName){
        user._lastName = lastName;
    }

    if(email){
        user._email = email;
    }

    if(password){
        user._password = password;
    }

    User.findOneAndUpdate({"_id":id}, user)
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

    User.remove({"_id":id})
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