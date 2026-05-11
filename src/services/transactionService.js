// src/services/transactionService.js

import axios from "axios";

/**
 * 1) Fetch all transactions with status="initialization"
 *    GET /api/transactions/initialization
 */
export async function fetchInitializationTransactions() {
  const resp = await axios.get("/api/transactions/initialization", {
    withCredentials: true,
  });
  return resp.data;
}

/**
 * 2) Create a new "initialization" transaction.
 *    POST /api/transactions/initialization
 */
export const createInitializationTransaction = async (payload) => {
  if (payload instanceof FormData) {
    const resp = await axios.post(
      "/api/transactions/initialization",
      payload,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return resp.data; 
  } else {
    const resp = await axios.post(
      "/api/transactions/initialization",
      payload,
      { withCredentials: true }
    );
    return resp.data;
  }
};

/**
 * 3) Update an existing "initialization" transaction.
 *    PUT /api/transactions/initialization/:id
 */
export async function updateInitializationTransaction(id, payload) {
  if (payload instanceof FormData) {
    const resp = await axios.put(
      `/api/transactions/initialization/${id}`,
      payload,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return resp.data;
  } else {
    const resp = await axios.put(
      `/api/transactions/initialization/${id}`,
      payload,
      { withCredentials: true }
    );
    return resp.data;
  }
}

/**
 * 4) Delete an "initialization" transaction.
 *    DELETE /api/transactions/initialization/:id
 */
export async function deleteInitializationTransaction(id) {
  const resp = await axios.delete(
    `/api/transactions/initialization/${id}`,
    { withCredentials: true }
  );
  return resp.data;
}
