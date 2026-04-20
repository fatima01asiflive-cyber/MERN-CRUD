import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Users from "./Users";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
import { getUsers, deleteUser as deleteUserAPI } from "./api";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError("Failed to fetch users. Is the server running on port 5000?");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch users on mount
  useEffect(() => {
    // eslint-disable-next-line
    fetchUsers();
  }, [fetchUsers]);

  const deleteUser = async (id) => {
    try {
      await deleteUserAPI(id);
      // Since we're using mock data, refresh the list
      await fetchUsers();
    } catch (err) {
      setError("Failed to delete user");
      console.error(err);
    }
  };

  const refreshUsers = () => {
    fetchUsers();
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Users
            users={users}
            deleteUser={deleteUser}
            loading={loading}
            error={error}
            refreshUsers={refreshUsers}
          />
        }
      />
      <Route
        path="/create"
        element={<CreateUser onUserCreated={refreshUsers} />}
      />
      <Route
        path="/update/:id"
        element={<UpdateUser onUserUpdated={refreshUsers} />}
      />
    </Routes>
  );
}

export default App;