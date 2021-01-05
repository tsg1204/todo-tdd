const express = require('express');
const app = express();
const todoRoutes = require('./routes/todo.routes');
const mongoDB = require('./mongodb/mongodb.connect');

mongoDB.connect();

app.use(express.json());

app.use('/todos', todoRoutes);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

app.get('/', (req, res) => {
  res.json('Hi');
});

module.exports = app;
