import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/customers');
        setCustomers(response.data);
  
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchCustomers();
    fetchTransactions();
  }, []);

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);

  };

  return (
    <CustomerContext.Provider value={{
      customers,
      transactions,
      selectedCustomer,
      handleCustomerClick,
    }}>
      {children}
    </CustomerContext.Provider>
  );
};
