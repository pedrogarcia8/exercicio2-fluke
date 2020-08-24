const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.post('/user', userController.newUser);

router.get('/user/:user', userController.getUser);

router.post('/login', userController.login);

module.exports = router;