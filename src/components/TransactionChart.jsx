import React, { useContext, useEffect } from 'react';
import { CustomerContext } from './Contexts/CustomerContext';
import moment from 'moment';
import {LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer,} from 'recharts';




const TransactionChart = () => {
  const { transactions, selectedCustomer } = useContext(CustomerContext);

 
  const filteredTransactions = selectedCustomer
    ? transactions.filter(transaction => transaction.customerId === parseInt(selectedCustomer.id))
    : [];

 

  const data = filteredTransactions.map(transaction => ({
    date: moment(transaction.date).format('MMM Do, YYYY'),
    amount: transaction.amount,
  }));

  return (
    <div className="transactions-section container">
      <h2>Transaction Chart</h2>
      {selectedCustomer ? (
        filteredTransactions.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#82ca9d" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : null
      ) : (
        <p>Please select a customer to view transactions.</p>
      )}
    </div>
  );
};

export default TransactionChart;
