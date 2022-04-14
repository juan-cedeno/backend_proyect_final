
const { Router } = require('express')
const { check } = require('express-validator')

const { createMovie, getMovies, getMovieById, updatedMovie, deleteMovie } = require('../controllers/movieController')
const renewJwt = require('../middlewares/renewJwt')
const { validateCamp } = require('../middlewares/validateCamp')

const router = Router()

router.post('/' ,
[
    check('title' , 'Title is obligatory').not().isEmpty(),
    check('director' , 'Director is obligatory').not().isEmpty(),
    check('actors' , 'Actors is obligatory').not().isEmpty(),
    check('trailer' , 'Trailer is obligatory').not().isEmpty(),
    validateCamp,
    renewJwt

]
 , createMovie)
router.get('/' , getMovies)
router.get('/:id' , getMovieById)
router.put('/:id' , renewJwt ,updatedMovie )
router.delete('/:id' , renewJwt, deleteMovie )


module.exports = router