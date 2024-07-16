import React, { useContext, useState } from 'react';
import { CustomerContext } from './Contexts/CustomerContext';
import '../App.css'; 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


const CustomerTable = () => {
  const { customers, transactions, handleCustomerClick } = useContext(CustomerContext);
  const [nameFilter, setNameFilter] = useState('');
  const [transactionFilter, setTransactionFilter] = useState('');

  // Filter customers based on name
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  // Filter transactions based on amount and customer ID
  const filteredTransactions = (customer) => {
    return transactions.filter(transaction => {
      return (
        String(transaction.customerId) === String(customer.id) &&
        transaction.amount.toString().includes(transactionFilter)
      );
    });
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name"
                onChange={(e) => setNameFilter(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Filter by transaction amount"
                onChange={(e) => setTransactionFilter(e.target.value)}
              />
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Transactions</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody className="cursor-pointer">
                {filteredCustomers.map(customer => (
                  <tr className="cursor-pointer" key={customer.id} onClick={() => handleCustomerClick(customer)} >
                    <td className="cursor-pointer">{customer.name}</td>
                    <td className="cursor-pointer">
                      {filteredTransactions(customer).length > 0 ? (
                        filteredTransactions(customer).map(transaction => (
                          <div key={transaction.id}>
                            {transaction.amount}
                          </div>
                        ))
                      ) : (
                        <div className="text-muted">No transactions</div>
                      )}
                    </td>
                    <td>
                      {filteredTransactions(customer).length > 0 ? (
                        filteredTransactions(customer).map(transaction => (
                          <div key={transaction.id}>
                            {new Date(transaction.date).toLocaleDateString()}
                          </div>
                        ))
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerTable;
