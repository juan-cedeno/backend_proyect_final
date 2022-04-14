
const {Schema , model} = require('mongoose')

const movieSchema = Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true,
    },
    trailer: {
        type: String
    },
    backdrop_path: {type: String},
    poster_path: {type: String},
    actors: {type: String},
    release_date: {type: String}
})

module.exports = model('Movie' , movieSchema)