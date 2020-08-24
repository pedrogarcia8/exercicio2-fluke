const User = require('../models/User');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');

exports.newUser = function (req, res) {
    bcrypt.hash(req.body.password, 10, (errorBcrypt, hash) => {
		if(errorBcrypt){
			console.log('Encryption error ' + errorBcrypt);
			return res.status(500).send(errorBcrypt);
		}

        let user = new User(
        {
            user: req.body.user,
            email: req.body.email,
            password: hash,
        });
    
        user.save(function (err) {
            if (err) {
                return next(err);
            }
            res.status(201).send('New user successfully created!');
        });
    });
};

exports.getUser = function (req, res) {
    User.find({user: req.body.user}, (err, result) => {
        if(err)
            return res.status(404).send(err);
        res.status(200).json(result);
    });
};

exports.login = function(req, res){
    User.find({user: req.body.user}, (err, result) => {
        if(err)
            return res.status(404).send(err);
        bcrypt.compare(req.body.password, result[0].password, (exception, result2) => {	
			if(exception){
				return res.status(401).send({ message: 'Authentication Failed'});
			}
			if(result2){
				const token = jwt.sign({
					user : result[0].user,
					email: result[0].email
				},
				"Z35I-K8K5-M7LW-1Y96-VHP9",
				{
					expiresIn: "12h"
				});
				return res.status(200).set('x-access-token', token).send({ message: 'Authenticated',token: token });
			}
			res.status(401).send({ message: 'Authentication Failed'});
		});
    });
};

