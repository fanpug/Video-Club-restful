const express = require('express');
const bcrypt = require('bcrypt');
const async = require('async');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const jwtKey = "8adadb33444c21fa4a6b346f86d6dbd4";

function home(req, res, next) {
    res.render('index', { title: 'Humberto "Fanpug" Navarro' });
}

function login(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;

    async.parallel({
        user: callback => User.findOne({_email:email})
        .select('_password _salt')
        .exec(callback)
    }, (err, result)=>{
        if(result.user){
            bcrypt.hash(password, result.user.salt, (err, hash)=>{
                if(hash === result.user.password){
                    res.status(200).json({
                        message:"Inicio de sesion exitoso!",
                        obj:jwt.sign(result.user.id, jwtKey)
                    });
                }else{
                    res.status(403).json({
                        message:"Usuario y/o contrasenia incorrectos",
                        obj:null
                    });
                }
            });
        }else{
            res.status(403).json({
                message:"Usuario y/o contrasenia incorrectos",
                obj:null
            });
        }

    });
}

module.exports = {
    home, login
}