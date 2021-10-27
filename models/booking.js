const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _copy: {type: mongoose.Schema.ObjectId, ref: 'Copy'},
    _member: {type: mongoose.Schema.ObjectId, ref: 'Member'},
    _date: Date
});

class Booking {

    constructor(copy, member, date){
        this._copy = copy;
        this._member = member;
        this._date = date;
    }

    get copy(){
        return this._copy;
    }

    set copy(value){
        this._copy = value;
    }

    get member(){
        return this._member;
    }

    set member(value){
        this._member = value;
    }
    
    get date(){
        return this._date;
    }
    
    set date(value){
        this._date = value;
    }

}

schema.loadClass(Booking);
module.exports = mongoose.model('Booking', schema);
