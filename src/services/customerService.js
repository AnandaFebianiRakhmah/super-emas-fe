// src/services/customerService.js
import api from "./api";

export const fetchCustomers = async () => {
  const response = await api.get("/api/customers");
  return response.data;
};

export const createCustomer = async (customerData) => {
  const response = await api.post("/api/customers", customerData);
  return response.data;
};

export const updateCustomer = async (id, customerData) => {
  const response = await api.put(`/api/customers/${id}`, customerData);
  return response.data;
};

export const deleteCustomer = async (id) => {
  await api.delete(`/api/customers/${id}`);
};
