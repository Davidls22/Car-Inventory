const mongoose = require('mongoose');

const uri = 'mongodb+srv://davidsugden1:EnwIZby1w5CmO2js@clustercar.ykjjobu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

async function connectToDatabase() {
  const connection = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDB database');
  return connection;
}

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.warn('Mongoose disconnected from MongoDB');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection disconnected through app termination');
    process.exit(0);
  });
});

module.exports = { connectToDatabase };
