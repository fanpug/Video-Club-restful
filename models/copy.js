const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _format:String,
    _movie:[{ type: Schema.ObjectId, ref: 'Movie' }],
    _number:Number,
    _status:String
});

class Copy {
    constructor(format, movie, number, status){
        this._format = format;
        this._movie = movie;
        this._number = number;
        this._status = status;
    }

    get format(){
        return this._format;
    }

    set format(value){
        this._format = value;
    }

    get movie(){
        return this._movie;
    }

    set movie(value){
        this._movie = value;
    }

    get number(){
        return this._number;
    }

    set number(value){
        this._number = value;
    }

    get status(){
        return this._status;
    }

    set status(value){
        this._status = value;
    }
}

schema.loadClass(Copy);
module.exports = mongoose.model('Copy', schema);