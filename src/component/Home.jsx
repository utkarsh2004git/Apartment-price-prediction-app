import React, { useState } from 'react';
import { MyCities } from '../helper/Cities';
import { MyStates } from '../helper/States';
const Home = () => {
  const [formData, setFormData] = useState({
    state: '',
    city: '',
    bhkType: '',
  });

  const states =MyStates;
  const cities = MyCities;

  const bhkTypes = ['1BHK', '2BHK', '3BHK'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // You can send the formData to your Flask API here
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Predict Home Price</h1>
        <form onSubmit={handleSubmit}>
          {/* State Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-gray-500"
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* City Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-gray-500"
              disabled={!formData.state}
            >
              <option value="">Select City</option>
              {formData.state &&
                cities[formData.state].map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </div>

          {/* BHK Type Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">BHK Type</label>
            <select
              name="bhkType"
              value={formData.bhkType}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-gray-500"
            >
              <option value="">Select BHK Type</option>
              {bhkTypes.map((bhk) => (
                <option key={bhk} value={bhk}>
                  {bhk}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300`}
            disabled={!formData.state || !formData.city || !formData.bhkType}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
