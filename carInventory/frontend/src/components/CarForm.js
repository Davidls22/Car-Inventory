import React, { useState} from 'react';

function CarForm({ handleAdd }) {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState(0);
    const [owner, setOwner] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [showForm, setShowForm] = useState(false);
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const car = { make, model, year, owner, registrationNumber };
  
      fetch('https://carinventorybackend.onrender.com/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          handleAdd(data);
        })
        .catch(err => console.log(err));
  
      setMake('');
      setModel('');
      setYear(0);
      setOwner('');
      setRegistrationNumber('');
    };
  
    return (
      <div className="car-form-container">
        <button className="toggle-form-button" onClick={() => setShowForm(!showForm)}>Add a new car</button>
        {showForm && (
          <form className="car-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="make" className="form-label">Make:</label>
              <input type="text" id="make" value={make} onChange={event => setMake(event.target.value)} className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="model" className="form-label">Model:</label>
              <input type="text" id="model" value={model} onChange={event => setModel(event.target.value)} className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="year" className="form-label">Year:</label>
              <input type="number" id="year" value={year} onChange={event => setYear(parseInt(event.target.value))} className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="owner" className="form-label">Owner:</label>
              <input type="text" id="owner" value={owner} onChange={event => setOwner(event.target.value)} className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="registrationNumber" className="form-label">Registration Number:</label>
              <input type="text" id="registrationNumber" value={registrationNumber} onChange={event => setRegistrationNumber(event.target.value)} className="form-input" />
            </div>
            <button type="submit" className="submit-button">Add car</button>
          </form>
        )}
      </div>
    );
  }

  export default CarForm;
