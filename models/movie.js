const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _director: {
        type: Map,
        of: String
    },
    _actors: [{type: mongoose.Schema.ObjectId, ref: 'Actor'}],
    _genre: String,
    _title: String
});

class Movie {

    constructor(director, actors, genre, title) {
        this._director = director;
        this._actors = actors;
        this._genre = genre;
        this._title = title;
    }

    get director(){
        return this._director;
    }

    set director(value){
        this._director = value;
    }

    get actors(){
        return this._actors;
    }

    set actors(value){
        this._actors = value;
    }
    
    get genre(){
        return this._genre;
    }

    set genre(value){
        this._genre = value;
    }

    get title(){
        return this._title;
    }
    
    set title(value){
        this._title = value;
    }

}

schema.loadClass(Movie);
module.exports = mongoose.model('Movie', schema);
