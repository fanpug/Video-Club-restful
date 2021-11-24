const express = require('express');
const bcrypt = require('bcrypt');
const async = require('async');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/user');

const jwtKey = config.get("secret.key");

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
                        message:res.__('ok.login'),
                        obj:jwt.sign(result.user.id, jwtKey)
                    });
                }else{
                    res.status(403).json({
                        message:res.__('bad.login'),
                        obj:null
                    });
                }
            });
        }else{
            res.status(403).json({
                message:res.__('bad.login'),
                obj:null
            });
        }

    });
}

module.exports = {
    home, login
}