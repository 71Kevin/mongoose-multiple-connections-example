const mongoose = require('mongoose');
const {userConnection, todoConnection} = require('../connection');

const userSchema = new mongoose.Schema({
    cpf: String,
    number: Number
});

const todoSchema = new mongoose.Schema({
    cpf: String,
    number: Number
});

const userModel = userConnection.model('calls', userSchema);
const todoModel = todoConnection.model('testes', todoSchema);

module.exports = {
    userModel,
    todoModel,
};
