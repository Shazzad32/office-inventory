import { useState, useEffect } from "react";
import axios from "axios";

const CustomerDropdown = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        ); // Replace with your API URL
        setCustomers(response.data.title);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div>
      <label
        htmlFor="customer-dropdown"
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        Select a Customer:
      </label>
      <select
        id="customer-dropdown"
        className="border border-gray-300 rounded px-4 py-2"
        value={selectedCustomer}
        onChange={(e) => setSelectedCustomer(e.target.value)}
      >
        <option value="">-- Select a Customer --</option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.name}>
            {customer.name}
          </option>
        ))}
      </select>
      {selectedCustomer && (
        <p className="mt-4">Selected Customer: {selectedCustomer}</p>
      )}
    </div>
  );
};

export default CustomerDropdown;
