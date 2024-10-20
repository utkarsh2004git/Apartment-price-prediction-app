import React, { useState } from 'react';
import { MyCities } from '../helper/Cities';
import { MyStates } from '../helper/States';
import { MyLocality } from '../helper/Locality';
import { My_long_lat } from '../helper/long_lat';

const Home = () => {


  const [formData, setFormData] = useState({
    state: '',
    city: '',
    locality: '',
    LONGITUDE:'',
    LATITUDE:'',
  });

  const states = MyStates;
  const cities = MyCities;
  const localities = MyLocality;
  const long_lat=My_long_lat;

  const bhkTypes = ['1BHK', '2BHK', '3BHK'];
  // const furnishingOptions = ['Furnished', 'Semi-Furnished', 'Unfurnished'];
  // const yesNoOptions = ['Yes', 'No'];
  // const propertyTypes = ['Apartment', 'Villa'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleStateChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      state: value,
      city: '', 
      locality: '', 
    }));
  };

  const handleCityChange =async (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      city: value,
      locality: '', 
    }));
    console.log(formData.city)
    
  };
  
  const handleLocalityChange =async (e) => {
    const { value } = e.target;
     setFormData((prevData) => ({
      ...prevData,
      locality: value,
    }));
     const { LONGITUDE, LATITUDE } = long_lat[value];
    console.log(formData.locality," long : ",LONGITUDE," lat : ",LATITUDE)
    setFormData((prevData) => ({
      ...prevData,
      LONGITUDE:LONGITUDE,
      LATITUDE:LATITUDE
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    setFormData({     state: '',
      city: '',
      locality: '',
      LONGITUDE:'',
      LATITUDE:'',
})
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
                  onChange={handleStateChange}
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
                  onChange={handleCityChange}
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
            <select
              name="locality"
              value={formData.locality}
              onChange={handleLocalityChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-gray-500"
              disabled={!formData.city}
            >
              <option value="">Select Locality</option>
              {formData.city &&
                localities[formData.city].map((locality,index) => (
                  <option key={index} value={locality}>
                    {locality}
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
