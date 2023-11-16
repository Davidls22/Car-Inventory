import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://carinventorybackend.onrender.com';

function App() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    async function getCars() {
      const response = await axios.get(`${API_BASE_URL}/api/cars`);
      setCars(response.data);
    }
    getCars();
  }, []);

  async function handleAddCar(newCar) {
    const response = await axios.post(`${API_BASE_URL}/api/cars`, newCar);
    setCars([...cars, response.data]);
  }

  async function handleUpdateCar(updatedCar) {
    const response = await axios.put(`${API_BASE_URL}/api/cars/${updatedCar._id}`, updatedCar);
    setCars(cars.map(car => car._id === response.data._id ? response.data : car));
  }
  

  async function handleDeleteCar(id) {
    await axios.delete(`${API_BASE_URL}/cars/${id}`);
    setCars(cars.filter(car => car._id !== id));
  }

  const oldCars = cars.filter(car => {
    const soldDate = new Date(car.soldDate);
    const today = new Date();
    const diffTime = today.getTime() - soldDate.getTime();
    const diffYears = diffTime / (1000 * 3600 * 24 * 365);
    return diffYears >= 5;
  });

  return (
    <div className="container">
      <h1>Cars</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Registration Number</th>
            <th>Sold Date</th>
            <th>Current Owner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car._id}>
              <td>{car.make}</td>
              <td>{car.model}</td>
              <td>{car.registrationNumber}</td>
              <td>{car.soldDate}</td>
              <td>{car.currentOwner}</td>
              <td>
                <button onClick={() => handleUpdateCar(car)}>Edit</button>
                <button onClick={() => handleDeleteCar(car._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Old Cars</h2>
      <table className="table">
       <caption>Cars Sold Over 5 Years Ago</caption>
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Registration Number</th>
            <th>Sold Date</th>
            <th>Current Owner</th>
          </tr>
        </thead>
        <tbody>
          {oldCars.map(car => (
            <tr key={car._id}>
              <td>{car.make}</td>
              <td>{car.model}</td>
              <td>{car.registrationNumber}</td>
              <td>{car.soldDate}</td>
              <td>{car.currentOwner}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Add Car</h2>
      <CarForm onSubmit={handleAddCar} />
    </div>
  );
}
function CarForm({ onSubmit }) {
const [make, setMake] = useState('');
const [model, setModel] = useState('');
const [registrationNumber, setRegistrationNumber] = useState('');
const [soldDate, setSoldDate] = useState('');
const [currentOwner, setCurrentOwner] = useState('');

function handleSubmit(event) {
event.preventDefault();
const newCar = { make, model, registrationNumber, soldDate, currentOwner };
onSubmit(newCar);
setMake('');
setModel('');
setRegistrationNumber('');
setSoldDate('');
setCurrentOwner('');
}

return (
<form onSubmit={handleSubmit}>
<div className="form-group">
<label htmlFor="make">Make</label>
<input
type="text"
className="form-control"
id="make"
value={make}
onChange={event => setMake(event.target.value)}
/>
</div>
<div className="form-group">
<label htmlFor="model">Model</label>
<input
type="text"
className="form-control"
id="model"
value={model}
onChange={event => setModel(event.target.value)}
/>
</div>
<div className="form-group">
<label htmlFor="registrationNumber">Registration Number</label>
<input
type="text"
className="form-control"
id="registrationNumber"
value={registrationNumber}
onChange={event => setRegistrationNumber(event.target.value)}
/>
</div>
<div className="form-group">
<label htmlFor="soldDate">Sold Date</label>
<input
type="date"
className="form-control"
id="soldDate"
value={soldDate}
onChange={event => setSoldDate(event.target.value)}
/>
</div>
<div className="form-group">
<label htmlFor="currentOwner">Current Owner</label>
<input
type="text"
className="form-control"
id="currentOwner"
value={currentOwner}
onChange={event => setCurrentOwner(event.target.value)}
/>
</div>
<button type="submit" className="btn btn-primary">Add Car</button>
</form>
);
}

export default App;
