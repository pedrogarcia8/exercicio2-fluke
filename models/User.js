const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let UserSchema = new Schema({
    user: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true}
});

module.exports = mongoose.model('User', UserSchema);