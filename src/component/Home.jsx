import React, { useState } from 'react';
import { MyCities } from '../helper/Cities';
import { MyStates } from '../helper/States';
import { MyLocality } from '../helper/Locality';
import { My_long_lat } from '../helper/long_lat';

const Home = () => {


  const [formData, setFormData] = useState({
    postedBy: '',
    underConstruction: '',
    rera: '',
    state: '',
    city: '',
    locality: '',
    LONGITUDE: '',
    LATITUDE: '',
    bhkNo: '',
    bhkOrRk: '',
    size: '',
    ready_to_move: '',
    resale: ''

  });

  const states = MyStates;
  const cities = MyCities;
  const localities = MyLocality;
  const long_lat = My_long_lat;

  const bhkTypes = ['1BHK', '2BHK', '3BHK', '4BHK', '1RK'];
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

  const handleCityChange = async (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      city: value,
      locality: '',
    }));
    console.log(formData.city)

  };

  const handleLocalityChange = async (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      locality: value,
    }));
    const { LONGITUDE, LATITUDE } = long_lat[value];
    console.log(formData.locality, " long : ", LONGITUDE, " lat : ", LATITUDE)
    setFormData((prevData) => ({
      ...prevData,
      LONGITUDE: LONGITUDE,
      LATITUDE: LATITUDE
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    try {
      const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
    setFormData({
      postedBy: '',
      underConstruction: '',
      rera: '',
      state: '',
      city: '',
      locality: '',
      LONGITUDE: '',
      LATITUDE: '',
      BHK: '',
      bhkNo: '',
      bhkOrRk: '',
      size: '',
      ready_to_move: '',
      resale: ''
    })
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
                  <option value="" disabled>Select State</option>
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
                  <option value="" disabled>Select City</option>
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
                  <option value="" disabled>Select Locality</option>
                  {formData.city &&
                    localities[formData.city].map((locality, index) => (
                      <option key={index} value={locality}>
                        {locality}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className='w-1/2'>

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


              <div className='flex gap-3 justify-between'>
                {/* BHK Type Dropdown */}
                <div className="mb-4 w-1/3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">BHK Type</label>
                  <select
                    name="BHK"
                    value={formData.BHK}
                    onChange={handleChange}
                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-gray-500"
                  >
                    <option value="" disabled>Select BHK Type</option>
                    {bhkTypes.map((bhk, index) => (
                      <option key={index} value={bhk}>
                        {bhk}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Posted By Dropdown */}
                <div className="mb-4 w-1/3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Posted By</label>
                  <select
                    name="postedBy"
                    value={formData.postedBy}
                    onChange={handleChange}
                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-gray-500"
                  >
                    <option value="" disabled>Posted By</option>
                    <option value={1}>Owner</option>
                    <option value={2}>Dealer</option>
                    <option value={3}>Builder</option>
                  </select>
                </div>
                {/* RERA Dropdown */}
                <div className="mb-4 w-1/3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">RERA Verified</label>
                  <select
                    name="rera"
                    value={formData.rera}
                    onChange={handleChange}
                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-gray-500"
                  >
                    <option value="" disabled>Select</option>
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                  </select>
                </div>
              </div>

              <div className='flex gap-3'>
                <div className="mb-4 w-1/3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Under Construction</label>
                  <select
                    name="underConstruction"
                    value={formData.underConstruction}
                    onChange={handleChange}
                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-gray-500"
                  >
                    <option value="" disabled >Select</option>
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                  </select>
                </div>

                {/* ReadyToMove Input */}
                <div className="mb-4 w-1/3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ready to move</label>
                  <select
                    name="ready_to_move"
                    value={formData.ready_to_move}
                    onChange={handleChange}
                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-gray-500"
                  >
                    <option value="" disabled >Select</option>
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                  </select>
                </div>

                {/* Resale Input */}
                <div className="mb-4 w-1/3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Resale</label>
                  <select
                    name="resale"
                    value={formData.resale}
                    onChange={handleChange}
                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-gray-500"
                  >
                    <option value="" disabled>Resale</option>
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                  </select>
                </div>

              </div>




            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300 disabled:opacity-50 cursor-pointer"
              disabled={!formData.state || !formData.city || !formData.locality || !formData.BHK || !formData.size || !formData.resale
                || !formData.ready_to_move}
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
