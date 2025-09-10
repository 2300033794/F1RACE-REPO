import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import config from './config.js';



const DriverManager = () => {
  const [drivers, setDrivers] = useState([]);
  const [driver, setDriver] = useState({
    id: '',
    name: '',
    team: '',
    country: '',
    car: '',
    experience: '',
    email: '',
    contact: ''
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedDriver, setFetchedDriver] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${config.url}/f1api`;

  useEffect(() => {
    fetchAllDrivers();
  }, []);

  const fetchAllDrivers = async () => {
    try {
      const res = await axios.get(`${baseUrl}/drivers`);
      setDrivers(res.data);
    } catch (error) {
      setMessage('Failed to fetch drivers.');
    }
  };

  const handleChange = (e) => {
    setDriver({ ...driver, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in driver) {
      if (!driver[key] || driver[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addDriver = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add-driver`, driver);
      setMessage('Driver added successfully.');
      fetchAllDrivers();
      resetForm();
    } catch (error) {
      setMessage('Error adding driver.');
    }
  };

  const updateDriver = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update-driver`, driver);
      setMessage('Driver updated successfully.');
      fetchAllDrivers();
      resetForm();
    } catch (error) {
      setMessage('Error updating driver.');
    }
  };

  const deleteDriver = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete-driver/${id}`);
      setMessage(res.data);
      fetchAllDrivers();
    } catch (error) {
      setMessage('Error deleting driver.');
    }
  };

  const getDriverById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/driver/${idToFetch}`);
      setFetchedDriver(res.data);
      setMessage('');
    } catch (error) {
      setFetchedDriver(null);
      setMessage('Driver not found.');
    }
  };

  const handleEdit = (drv) => {
    setDriver(drv);
    setEditMode(true);
    setMessage(`Editing driver with ID ${drv.id}`);
  };

  const resetForm = () => {
    setDriver({
      id: '',
      name: '',
      team: '',
      country: '',
      car: '',
      experience: '',
      email: '',
      contact: ''
    });
    setEditMode(false);
  };

  return (
    <div className="driver-container">

      {message && (
        <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <h2>🏁 F1 Race Driver Management</h2>

      <div>
        <h3>{editMode ? 'Edit Driver' : 'Add Driver'}</h3>
        <div className="form-grid">
          <input type="number" name="id" placeholder="Driver ID" value={driver.id} onChange={handleChange} />
          <input type="text" name="name" placeholder="Driver Name" value={driver.name} onChange={handleChange} />
          <input type="text" name="team" placeholder="Team" value={driver.team} onChange={handleChange} />
          <input type="text" name="country" placeholder="Country" value={driver.country} onChange={handleChange} />
          <input type="text" name="car" placeholder="Car Model" value={driver.car} onChange={handleChange} />
          <input type="number" name="experience" placeholder="Experience (Years)" value={driver.experience} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={driver.email} onChange={handleChange} />
          <input type="text" name="contact" placeholder="Contact" value={driver.contact} onChange={handleChange} />
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addDriver}>Add Driver</button>
          ) : (
            <>
              <button className="btn-green" onClick={updateDriver}>Update Driver</button>
              <button className="btn-gray" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      <div>
        <h3>Get Driver By ID</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
          placeholder="Enter Driver ID"
        />
        <button className="btn-blue" onClick={getDriverById}>Fetch</button>

        {fetchedDriver && (
          <div>
            <h4>Driver Found:</h4>
            <pre>{JSON.stringify(fetchedDriver, null, 2)}</pre>
          </div>
        )}
      </div>

      <div>
        <h3>All Drivers</h3>
        {drivers.length === 0 ? (
          <p>No drivers found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {Object.keys(driver).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((drv) => (
                  <tr key={drv.id}>
                    {Object.keys(driver).map((key) => (
                      <td key={key}>{drv[key]}</td>
                    ))}
                    <td>
                      <div className="action-buttons">
                        <button className="btn-green" onClick={() => handleEdit(drv)}>Edit</button>
                        <button className="btn-red" onClick={() => deleteDriver(drv.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default DriverManager;
