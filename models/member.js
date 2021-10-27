const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _address:{
        type:Map,
        of:String
    },
    _lastName:String,
    _name:String,
    _phone:String,
    _status:Boolean
});

class Member {
    constructor(address, lastName, name, phone, status){
        this._address = address;
        this._lastName = lastName;
        this._name = name;
        this._phone = phone;
        this._status = status;
    }

    get address(){
        return this._address;
    }

    set address(value){
        this._address = value;
    }

    get lastName(){
        return this._lastName;
    }

    set lastName(value){
        this._lastName = value;
    }

    get name(){
        return this._name;
    }

    set name(value){
        this._name = value;
    }

    get phone(){
        return this._phone;
    }

    set phone(value){
        this._phone = value;
    }

    get status(){
        return this._status;
    }

    set status(value){
        this._status = value;
    }
}

schema.loadClass(Member);
module.exports = mongoose.model('Member', schema);