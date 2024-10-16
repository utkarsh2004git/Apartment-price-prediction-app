import React, { useState } from 'react';
import { MyCities } from '../helper/Cities';
import { MyStates } from '../helper/States';

const Home = () => {
  const [formData, setFormData] = useState({
    state: '',
    city: '',
    locality: '',
    bhkType: '',
    size: '',
    age: '',
    parking: '',
    security: '',
    lift: '',
    furnishingStatus: '',
    balcony: '',
    propertyType: '',
  });

  const states = MyStates;
  const cities = MyCities;

  const bhkTypes = ['1BHK', '2BHK', '3BHK'];
  const furnishingOptions = ['Furnished', 'Semi-Furnished', 'Unfurnished'];
  const yesNoOptions = ['Yes', 'No'];
  const propertyTypes = ['Apartment', 'Villa'];

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
    setFormData({ state: '',
      city: '',
      locality: '',
      bhkType: '',
      size: '',
      age: '',
      parking: '',
      security: '',
      lift: '',
      furnishingStatus: '',
      balcony: '',
      propertyType: '',})
    // You can send the formData to your Flask API here
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg  w-2/3 ">
        <h1 className="text-2xl font-semibold mb-6 text-center">Predict Home Price</h1>
        <form onSubmit={handleSubmit}>
          {/* State Dropdown */}
          <div className='flex flex-row gap-10  justify-around'>
            <div className=' w-1/2'>
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

              {/* Locality Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Locality</label>
                <input
                  type="text"
                  name="locality"
                  value={formData.locality}
                  onChange={handleChange}
                  className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-gray-500"
                  placeholder="Enter Locality"
                />
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

              {/* Size Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Size (sq ft)</label>
                <input
                  type="number"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-gray-500"
                  placeholder="Enter Size in sq ft"
                />
              </div>

              {/* Age Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Age (years)</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-gray-500"
                  placeholder="Enter Age in years"
                />
              </div>
            </div>
            <div className='w-1/2'>


              {/* Parking Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Parking</label>
                <select
                  name="parking"
                  value={formData.parking}
                  onChange={handleChange}
                  className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-gray-500"
                >
                  <option value="">Do you want parking?</option>
                  {yesNoOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Security Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Security</label>
                <select
                  name="security"
                  value={formData.security}
                  onChange={handleChange}
                  className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-gray-500"
                >
                  <option value="">Do you want security?</option>
                  {yesNoOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Lift Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Lift</label>
                <select
                  name="lift"
                  value={formData.lift}
                  onChange={handleChange}
                  className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-gray-500"
                >
                  <option value="">Do you want a lift?</option>
                  {yesNoOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Furnishing Status Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Furnishing Status</label>
                <select
                  name="furnishingStatus"
                  value={formData.furnishingStatus}
                  onChange={handleChange}
                  className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-gray-500"
                >
                  <option value="">Select Furnishing Status</option>
                  {furnishingOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Balcony Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Balcony</label>
                <select
                  name="balcony"
                  value={formData.balcony}
                  onChange={handleChange}
                  className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-gray-500"
                >
                  <option value="">Do you want a balcony?</option>
                  {yesNoOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Property Type Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-gray-500"
                >
                  <option value="">Select Property Type</option>
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300 disabled:opacity-50"
              disabled={!formData.state || !formData.city || !formData.bhkType}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
