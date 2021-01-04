import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.json('Hi');
});

app.listen(3001, () => {
  console.log('Server is now running.');
});
