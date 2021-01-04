const express = require('express');
const app = express();
const todoRoutes = require('./routes/todo.routes');

app.use('/todos', todoRoutes);

app.get('/', (req, res) => {
  res.json('Hi');
});

app.listen(3001, () => {
  console.log('Server is now running.');
});

module.exports = app;
