import React from "react";
import { Link } from "react-router-dom";

function Users({ users, deleteUser, loading, error, refreshUsers }) {
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUser(id);
            } catch {
                alert("Failed to delete user");
            }
        }
    };

    if (loading) {
        return (
            <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
                <div className="spinner-border text-white" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center p-3">
            <div className="w-100 bg-white rounded p-4 shadow-lg" style={{ maxWidth: "900px" }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="mb-0">📋 User Management System</h2>
                    <div>
                        <button className="btn btn-info btn-sm me-2" onClick={refreshUsers}>
                            🔄 Refresh
                        </button>
                        <Link to="/create" className="btn btn-success btn-lg">
                            ➕ Add New User
                        </Link>
                    </div>
                </div>

                {error && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        ⚠️ {error}
                        <button
                            type="button"
                            className="btn-close"
                            onClick={refreshUsers}
                        ></button>
                    </div>
                )}

                {users.length === 0 ? (
                    <div className="alert alert-info text-center py-5">
                        <h5>📭 No users found</h5>
                        <p>Click "Add New User" button to create your first user</p>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-hover table-striped align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Age</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>
                                            <span className="badge bg-secondary">{user._id.slice(-6)}</span>
                                        </td>
                                        <td className="fw-bold">{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.age} years</td>
                                        <td>
                                            <Link
                                                to={`/update/${user._id}`}
                                                className="btn btn-sm btn-primary me-2"
                                            >
                                                ✏️ Edit
                                            </Link>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDelete(user._id)}
                                            >
                                                🗑️ Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="mt-4 text-muted d-flex justify-content-between">
                    <small>Total Users: <strong>{users.length}</strong></small>
                    <small className="text-success">✅ Connected to MongoDB</small>
                </div>
            </div>
        </div>
    );
}

export default Users;