const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, login, revalidateJwt } = require("../controllers/userController");
const renewJwt = require("../middlewares/renewJwt");
const { validateCamp } = require("../middlewares/validateCamp");


const router = Router()

router.post('/new', 
[
    check('name' , 'Name is obligatory').not().isEmpty(),
    check('email' , 'Email is incorrect').isEmail(),
    check('email' , 'Email is obligatory').not().isEmpty(),
    check('password' , 'Password is obligatory').not().isEmpty(),
    validateCamp
]
 , createUser)

 router.post('/login' , 
 [
     check('email' , 'Email is obligatory').not().isEmpty(),
     check('password' , 'Password is obligatory').not().isEmpty(),
     validateCamp

 ]
  , login)

router.get('/renew' , renewJwt , revalidateJwt)  


module.exports = router