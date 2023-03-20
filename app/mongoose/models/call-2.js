const mongoose = require('mongoose');
const { userConnection, todoConnection } = require('../connection');

const userSchema = new mongoose.Schema({
  cpf: String,
  number: Number,
});

const todoSchema = new mongoose.Schema({
  cpf: String,
  number: Number,
});

const userModel = userConnection.model('calls', userSchema);
const todoModel = todoConnection.model('testes', todoSchema);

// error handling for userConnection
userConnection.on('error', (err) => {
  console.error('User connection error:', err);
});

// error handling for todoConnection
todoConnection.on('error', (err) => {
  console.error('Todo connection error:', err);
});

// wait for both connections to be open before continuing
Promise.all([userConnection, todoConnection])
  .then(() => {
    console.log('All database connections established successfully.');
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
    process.exit(1);
  });

module.exports = {
  userModel,
  todoModel,
};
