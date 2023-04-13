const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./db');

const app = express();
const port = process.env.PORT || 8082;

app.use(cors());
app.use(express.json());

app.use('/api/cars', carsRouter);

async function startServer() {
  await connectToDatabase();
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();

