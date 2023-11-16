import React, { useState, useEffect } from "react";
import CarForm from "./CarForm";
import UpdateCarForm from "./UpdateCarForm";

function CarList() {
  const [cars, setCars] = useState([]);
  const [showOlderCars, setShowOlderCars] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [editedCar, setEditedCar] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8082/api/cars")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.log(err));
  }, []);

  
  const handleDelete = (id) => {
    fetch(`https://carinventorybackend.onrender.com/api/cars/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setCars((prevCars) => prevCars.filter((car) => car._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const handleAdd = (car) => {
    setCars((prevCars) => [car, ...prevCars]);
  };

  const handleUpdate = (updatedCar) => {
    fetch(`https://carinventorybackend.onrender.com/api/cars/${updatedCar._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCar),
    })
      .then((res) => res.json())
      .then((data) => {
        setCars((prevCars) =>
          prevCars.map((car) => (car._id === updatedCar._id ? updatedCar : car))
        );
        setSelectedCar(null);
      })
      .catch((err) => console.log(err));
  };
  

// Function to handle updating multiple cars with a new value for a specified field
const handleUpdateMultiple = () => {
    // Prompt user for input of the field to update, old value(s), and new value
    const field = prompt("Enter field name (make, model, year, owner or registration number");
    const oldValue = prompt("Enter old value(s), separated by commas");
    const newValue = prompt("Enter new value");
  
    // If user has entered valid input for all fields
    if (field && oldValue && newValue) {
      // Split the old values into an array, trimming each value of whitespace
      const oldValuesArr = oldValue.split(",").map((val) => val.trim());
  
      // Make a PUT request to the server to update the cars with the new field value
      fetch("https://carinventorybackend.onrender.com/api/cars/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ field, oldValues: oldValuesArr, newValue }),
      })
        .then((res) => res.json())
        .then((data) => {
          // Log the server response message to the console
          console.log(data.message);
  
          // Update the cars state by mapping over previous cars and replacing the old value(s) with the new value for the specified field
          setCars((prevCars) =>
            prevCars.map((car) =>
              oldValuesArr.includes(car[field])
                ? { ...car, [field]: newValue }
                : car
            )
          );
        })
        .catch((err) => console.log(err));
    }
  };
  

  const handleEdit = (car) => {
    setEditedCar(car);
  };

  const handleSave = (car) => {
    handleUpdate(car);
    setEditedCar(null);
  };

  const filteredCars = showOlderCars
    ? cars.filter((car) => car.year <= 2018)
    : cars;

    return (
        <div>
          <h1>Car Inventory</h1>
          <button onClick={() => setShowOlderCars(!showOlderCars)}>
            {showOlderCars ? "Show all cars" : "Show cars owned for more than 5 years"}
          </button>
          <button onClick={handleUpdateMultiple}>Update Multiple Cars</button>
          <table>
            <thead>
              <tr>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Owner</th>
                <th>Registration Number</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {filteredCars.map((car) => (
                <tr key={car._id}>
                  <td>
                    {editedCar && editedCar._id === car._id ? (
                      <input
                        type="text"
                        defaultValue={car.make}
                        onChange={(e) =>
                          setEditedCar({ ...editedCar, make: e.target.value })
                        }
                      />
                    ) : (
                      car.make
                    )}
                  </td>
                  <td>
                    {editedCar && editedCar._id === car._id ? (
                      <input
                        type="text"
                        defaultValue={car.model}
                        onChange={(e) =>
                          setEditedCar({ ...editedCar, model: e.target.value })
                        }
                      />
                    ) : (
                      car.model
                    )}
                  </td>
                  <td>
                    {editedCar && editedCar._id === car._id ? (
                      <input
                        type="number"
                        defaultValue={car.year}
                        onChange={(e) =>
                          setEditedCar({
                            ...editedCar,
                            year: parseInt(e.target.value),
                          })
                        }
                      />
                    ) : (
                      car.year
                    )}
                  </td>
                  <td>
                    {editedCar && editedCar._id === car._id ? (
                      <input
                        type="text"
                        defaultValue={car.owner}
                        onChange={(e) =>
                          setEditedCar({ ...editedCar, owner: e.target.value })
                        }
                      />
                    ) : (
                      car.owner
                    )}
                  </td>
                  <td>
                    {editedCar && editedCar._id === car._id ? (
                      <input
                        type="text"
                        defaultValue={car.registrationNumber}
                        onChange={(e) =>
                          setEditedCar({
                            ...editedCar,
                            registrationNumber: e.target.value,
                          })
                        }
                      />
                    ) : (
                      car.registrationNumber
                    )}
      </td>
              <td>
                <button onClick={() => handleDelete(car._id)}>Delete</button>
              </td>
              <td>
                {editedCar && editedCar._id === car._id ? (
                  <button onClick={() => handleSave(editedCar)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(car)}>Update</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCar ? (
        <UpdateCarForm
          car={selectedCar}
          handleUpdate={handleUpdate}
          setSelectedCar={setSelectedCar}
        />
      ) : (
        <CarForm handleAdd={handleAdd} />
      )}
    </div>
  );
}

export default CarList;


/* Resources:
Mentor Call
https://www.youtube.com/watch?v=2yddJwL1Tpg
https://www.youtube.com/watch?v=2yddJwL1Tpg
https://www.youtube.com/watch?v=Cv6gFTZAfFY
https://rapidapi.com/guides/call-apis-in-express-via-node-fetch
*/
