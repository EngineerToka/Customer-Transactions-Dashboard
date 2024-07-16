import React from 'react';
import { CustomerProvider } from './components/Contexts/CustomerContext';
import CustomerTable from './components/customerTable'
import TransactionChart from './components/TransactionChart';
import './App.css';

const App = () => {
  return (
    <CustomerProvider>
      <div className="App">
        <CustomerTable />
      <TransactionChart />
      </div>
    </CustomerProvider>
  );
};

export default App;
