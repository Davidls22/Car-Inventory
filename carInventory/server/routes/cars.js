const express = require('express');
const router = express.Router();
const carController = require('../controllers/Cars.controller');

// GET /api/cars
router.get('/', carController.getCars);

// POST /api/cars
router.post('/', carController.createCar);

// PUT /api/cars/:id
router.put('/:id', carController.updateCar);

// PUT /api/cars
router.put('/', carController.updateMultipleCars);

// DELETE /api/cars/:id
router.delete('/:id', carController.deleteCar);

module.exports = router;
