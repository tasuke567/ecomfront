// src/components/profile/AddressList.js

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import AddressForm from './AddressForm';

const AddressList = () => {
    const [addresses, setAddresses] = useState([]);
    const [isAddingNew, setIsAddingNew] = useState(false);
  
    const handleAddAddress = async (newAddress) => {
      try {
        const response = await axios.post('/api/addresses', newAddress);
        setAddresses([...addresses, response.data]);
        setIsAddingNew(false);
        toast.success('Address added successfully');
      } catch (error) {
        toast.error('Failed to add address');
      }
    };
  
    const handleDeleteAddress = async (addressId) => {
      try {
        await axios.delete(`/api/addresses/${addressId}`);
        setAddresses(addresses.filter(addr => addr.id !== addressId));
        toast.success('Address deleted successfully');
      } catch (error) {
        toast.error('Failed to delete address');
      }
    };
  
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Shipping Addresses</h2>
          <button
            onClick={() => setIsAddingNew(true)}
            className="text-blue-600 hover:text-blue-800"
          >
            Add New Address
          </button>
        </div>
  
        <div className="space-y-4">
          {addresses.map((address) => (
            <div key={address.id} className="border rounded-lg p-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{address.name}</h3>
                  <p className="text-sm text-gray-600">{address.street}</p>
                  <p className="text-sm text-gray-600">
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  <p className="text-sm text-gray-600">{address.phone}</p>
                </div>
                <button
                  onClick={() => handleDeleteAddress(address.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
  
        {isAddingNew && (
          <AddressForm
            onSubmit={handleAddAddress}
            onCancel={() => setIsAddingNew(false)}
          />
        )}
      </div>
    );
  };

  export default AddressList;