# Car Inventory Management System

Welcome to the Car Inventory Management System, a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application designed to manage the inventory of cars. This project allows users to view, add, update, and delete car entries in the inventory database.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Introduction

The Car Inventory Management System provides a user-friendly interface for managing car inventory efficiently. It is built using the MERN stack, providing a seamless experience for users to interact with the inventory database.

## Features

- **View Cars:** Display a list of cars with details such as make, model, year, owner, and registration number.
- **Add Car:** Add new cars to the inventory with relevant information.
- **Update Car:** Edit existing car entries to update information such as make, model, year, owner, and registration number.
- **Delete Car:** Remove cars from the inventory database.
- **Filter Cars:** Filter cars based on specific criteria, such as ownership duration (e.g., cars owned for more than 5 years).

## Installation

To use the Car Inventory Management System, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies by running `npm install` in the terminal.
4. Start the development server by running `npm start`.
5. Access the application at `http://localhost:3000` in your web browser.

## Usage

Once the application is running, you can perform the following actions:

1. View the list of cars in the inventory.
2. Add new cars by filling out the form and submitting the details.
3. Update existing car entries by clicking on the "Update" button next to each car.
4. Delete cars from the inventory by clicking on the "Delete" button.
5. Toggle between showing all cars and showing cars owned for more than 5 years.

## API Endpoints

The Car Inventory Management System uses the following API endpoints:

- **GET /api/cars:** Retrieve all cars from the database.
- **POST /api/cars:** Create a new car entry in the database.
- **PUT /api/cars/:id:** Update a car entry with the specified ID.
- **PUT /api/cars:** Update multiple cars in the database.
- **DELETE /api/cars/:id:** Delete a car entry with the specified ID from the database.

