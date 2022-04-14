const {request , response} = require('express')
const Movie = require('../models/movies')


const createMovie = async (req , res = response) => {
    
    const movie = new Movie(req.body)

    try {
        const movieSaved = await movie.save()

        res.status(201).json({
            movie: movieSaved
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Please contact technical support'
        })
    }
}

const getMovies = async (req = request , res = response) => {
    
    try {
        const movies = await Movie.find()
        res.status(200).json({
            movies
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Please contact technical support'
        })
    }
}

const getMovieById = async (req = request , res = response) => {
    const id = req.params.id
    try {
        const movie = await Movie.findById(id)

        if (!movie) {
            return res.status(404).json({
                message: 'Movie not found'
            }) 
        }

        res.status(200).json({
            movie
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Please contact technical support'
        })
    }
}

const updatedMovie = async (req = request , res = response) => {
    const id = req.params.id

    if (!id) {
        return res.status(404).json({
            message: 'No id'
        })
    }

    try {
        const movie = await Movie.findById(id)
        if (!movie) {
            return res.status(404).json({
                message: 'No movie with this id'
            })
        }

        const movieUpdated = await Movie.findByIdAndUpdate(id , req.body , {new: true})

        res.status(200).json({
            movieUpdated
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Please contact technical support'
        })
    }
}

const deleteMovie = async (req = request , res = response) => {
    const id = req.params.id

    if (!id) {
        return res.status(404).json({
            message: 'No id'
        })
    }

    try {
        const movie = await Movie.findById(id)
        if (!movie) {
            return res.status(404).json({
                message: 'No movie with this id'
            })
        }

        await Movie.findByIdAndDelete(id)
        res.status(200).json({
            message : 'Movie Deleted'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Please contact technical support'
        })
    }
}


module.exports = {
    createMovie,
    getMovies,
    getMovieById,
    updatedMovie,
    deleteMovie
}