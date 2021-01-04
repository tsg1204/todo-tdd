const mongoose = require('mongoose');
const uri = require('../dev/dev');

async function connect() {
  try {
    await mongoose.connect(uri.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error('Error connecting to mongodb');
    console.error(err);
  }
}

module.exports = { connect };
