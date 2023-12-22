import { selectUser } from '@/redux/userDetailsSlice';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EditAddress from './editAddress';
import AddNewAddress from './addNewAddress';

const AddressTab = () => {
  const user = useSelector(selectUser);
  const userAddress = user?.data.addresses;
  const [editAddress, setEditAddress] = useState<any>();
  const [showEditAddress, setShowEditAddress] = useState(false);
  const [showAddNewAddress, setShowAddNewAddress] = useState(false);
  const maxAddressCount = 3;

  const closeEditAddress = () => {
    setShowEditAddress(false);
  };

  const openAddNewAddress = () => {
    if (userAddress && userAddress.length < maxAddressCount) {
      setShowAddNewAddress(true);
    } else {
      alert("You can't add more than 3 addresses. Please delete one of the above first.");
    }
  };

  const closeAddNewAddress = () => {
    setShowAddNewAddress(false);
  };

  return (
    <div className='coins_backgroun rounded-xl'>
      {showEditAddress ? (
        <div>
          <EditAddress ToEditAddress={editAddress} onCancel={closeEditAddress} />
        </div>
      ) : showAddNewAddress ? (
        <div>
          <AddNewAddress onCancel={closeAddNewAddress} />
        </div>
      ) : (
        <>
          {userAddress?.map((address: any, key) => (
            <div key={key}>
              <p className='text-white pl-2 text-lg'>Address {key + 1}</p>
              <address className=''>
                {/* @ts-ignore */}
                <p className='pl-1 mt-4 mb-4 text-white'>{address?.address?.line1}, {address?.address?.line2}, {address?.address?.city}, {address?.address?.state}, {address?.address?.pincode},</p>
              </address>
              <div className='grid grid-cols-2 mt-2 mb-3'>
                <button className='edit' onClick={() => { setEditAddress(address); setShowEditAddress(true); }}>
                  <div className='px-4 py-2 text-yellow-400'>Edit</div>
                </button>
                <button className='delete' onClick={() => console.log('')}>
                  <div className='text-red-600 px-4 py-2'>Delete</div>
                </button>
              </div>
            </div>
          ))}
          <button className='px-2 py-2 text-yellow-400 border-2 border-yellow-400 rounded' onClick={openAddNewAddress}>
            Add New Address
          </button>
        </>
      )}
    </div>
  );
};

export default AddressTab;
