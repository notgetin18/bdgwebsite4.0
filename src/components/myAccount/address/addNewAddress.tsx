import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const AddNewAddress = ({ onCancel }: { onCancel: () => void }) => {
  const [newAddress, setNewAddress] = useState({
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add logic to handle the submission of the new address
    console.log('New Address:', newAddress);
    // Reset the form or close the component as needed
    onCancel();
  };

  return (
    <div className='coins_backgroun rounded-xl'>
      <form onSubmit={handleSubmit}>
        <div className='text-white text-xl mt-2 cursor-pointer'>
          <FaTimes onClick={onCancel} />
        </div>
        <div className='grid grid-cols-2 gap-4 mt-4 mb-4'>
          <div>
            <label htmlFor='line1' className='text-white block'>
              Line 1:
            </label>
            <input
              type='text'
              id='line1'
              name='line1'
              value={newAddress.line1}
              onChange={handleChange}
              className='border-2 border-yellow-400 rounded px-2 py-1 w-full'
              required
            />
          </div>
          <div>
            <label htmlFor='line2' className='text-white block'>
              Line 2:
            </label>
            <input
              type='text'
              id='line2'
              name='line2'
              value={newAddress.line2}
              onChange={handleChange}
              className='border-2 border-yellow-400 rounded px-2 py-1 w-full'
            />
          </div>
          <div>
            <label htmlFor='city' className='text-white block'>
              City:
            </label>
            <input
              type='text'
              id='city'
              name='city'
              value={newAddress.city}
              onChange={handleChange}
              className='border-2 border-yellow-400 rounded px-2 py-1 w-full'
              required
            />
          </div>
          <div>
            <label htmlFor='state' className='text-white block'>
              State:
            </label>
            <input
              type='text'
              id='state'
              name='state'
              value={newAddress.state}
              onChange={handleChange}
              className='border-2 border-yellow-400 rounded px-2 py-1 w-full'
              required
            />
          </div>
          <div>
            <label htmlFor='pincode' className='text-white block'>
              Pincode:
            </label>
            <input
              type='text'
              id='pincode'
              name='pincode'
              value={newAddress.pincode}
              onChange={handleChange}
              className='border-2 border-yellow-400 rounded px-2 py-1 w-full'
              required
            />
          </div>
        </div>
        <button type='submit' className='px-2 py-2 text-yellow-400 border-2 border-yellow-400 rounded'>
          Save Address
        </button>
      </form>
    </div>
  );
};

export default AddNewAddress;
