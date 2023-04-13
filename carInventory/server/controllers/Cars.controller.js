const Car = require("../models/Car");

// GET /api/cars
// This route handles a GET request to retrieve all the cars from the database
exports.getCars = async (req, res) => {
  try {
    // Retrieve all the cars from the database using the Car model
    const cars = await Car.find();

    // Send the list of cars in the response body as a JSON object
    res.json(cars);
  } catch (err) {
    // If an error occurs while retrieving the cars, send an error response with a 500 status code and the error message
    res.status(500).json({ message: err.message });
  }
};

// POST /api/cars
// This route handles a POST request to create a new car in the database
exports.createCar = async (req, res) => {
  // Create a new Car object from the request body
  const car = new Car({
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    owner: req.body.owner,
    registrationNumber: req.body.registrationNumber,
  });
  try {
    // Save the new Car object to the database and retrieve the new document
    const newCar = await car.save();
    // Send a success response with a 201 status code and the new car document as a JSON object
    res.status(201).json(newCar);
  } catch (err) {
    // If an error occurs while saving the car to the database, send an error response with a 400 status code and the error message
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/cars/:id
// This route handles a PUT request to update a car in the database
exports.updateCar = async (req, res) => {
  // Destructure the properties of the request body
  const { make, model, year, owner, registrationNumber } = req.body;
  try {
    // Find and update the car document with the specified ID using the Car model and the properties from the request body
    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      { make, model, year, owner, registrationNumber },
      { new: true }
    );
    // Send a success response with the updated car document as a JSON object
    res.json(updatedCar);
  } catch (err) {
    // If an error occurs while updating the car document, send an error response with a 400 status code and the error message
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/cars
// This route handles a PUT request to update multiple cars in the database
exports.updateMultipleCars = async (req, res) => {
  // Destructure the properties of the request body
  const { field, oldValues, newValue } = req.body;

  try {
    // Construct a filter object with the specified field and old values to update
    const filter = { [field]: { $in: oldValues } };
    // Construct an update object with the specified field and new value to set
    const update = { [field]: newValue };
    // Update all car documents matching the filter using the update object
    const result = await Car.updateMany(filter, update);

    // Send a success response with a message indicating the cars were updated
    res.json({ message: `Cars updated` });
  } catch (err) {
    // If an error occurs while updating the car documents, send an error response with a 400 status code and the error message
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/cars/:id
// This route handles a DELETE request to delete a car with the specified ID from the database
exports.deleteCar = async (req, res) => {
  try {
    // Find the car document with the specified ID using the `findById()` method of the `Car` model
    const car = await Car.findById(req.params.id);
    // If no car is found with the specified ID, send a 404 response with an error message
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    // If a car is found, remove it from the database using the `remove()` method
    await car.remove();
    // Send a success response with a message indicating that the car was deleted
    res.json({ message: "Car deleted" });
  } catch (err) {
    // If an error occurs while deleting the car document, send an error response with a 500 status code and the error message
    res.status(500).json({ message: err.message });
  }
};
