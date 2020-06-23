const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const validation = require('../validators/register');
const loginvalidation = require('../validators/login');
const jwt = require('jsonwebtoken');
const keys = require('../config/key');
const { json } = require('body-parser');
const User = require('../models/user');
const { response } = require('express');



//User register route
router.post('/register', (req,res) => {

    //validate register form data
    const { errors, isValid } = validation(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }

    //check if existing user
    User.findOne({email: req.body.email}).then(user => {
        if (user) {
            return res.status(400).json({error: 'Email already taken!'})
        } else {
            const newUser = new User({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
            });
            //Hash password before saving in user database
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, function(err, hash) {
                    // Store hash in your password DB.
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
            });
        };
    });
})


router.post('/login', (req,res) => {
    //validate login form data
    const { errors, isValid } = loginvalidation(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }

    //check if theres such user and if so, bcrypt compare => JWT, else return error
    User.findOne({email: req.body.email}).then(user => {
        if(!user) {
            return res.status(400).json({errors: 'No such email address!'})
        }
        //bcrypt compare
        const password = req.body.password;
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                //if match, create JWT payload
                const payload = {
                    id: user._id,
                    name: user.name
                }
                //sign token
                jwt.sign(payload, keys.secretOrKey, {expiresIn: 31556926}, (err,token) => {
                    if (err) throw err;
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                })
            } else {
            //if not match
                return res.status(400).json({
                    error: 'Password invalid!'
                })
            }
        })
    })
});

module.exports = router;
