import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "./api";

function UpdateUser({ onUserUpdated }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUserById(id);
                setFormData({
                    name: user.name,
                    email: user.email,
                    age: user.age,
                });
                setLoading(false);
            } catch {
                setNotFound(true);
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!formData.age) {
            newErrors.age = "Age is required";
        } else if (formData.age < 1 || formData.age > 120) {
            newErrors.age = "Age must be between 1 and 120";
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setSubmitting(true);
            await updateUser(id, {
                name: formData.name,
                email: formData.email,
                age: parseInt(formData.age),
            });
            alert("✅ User updated successfully!");
            onUserUpdated();
            navigate("/");
        } catch (error) {
            setErrors({ submit: error });
        } finally {
            setSubmitting(false);
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

    if (notFound) {
        return (
            <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
                <div className="bg-white rounded p-4 text-center shadow-lg">
                    <h3 className="text-danger mb-3">⚠️ User Not Found</h3>
                    <p>The user with ID {id} does not exist in the database.</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/")}
                    >
                        Back to Users List
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-4 shadow-lg">
                <h2 className="mb-4">✏️ Update User</h2>
                {errors.submit && (
                    <div className="alert alert-danger mb-3">{errors.submit}</div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-bold">
                            Name
                        </label>
                        <input
                            type="text"
                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter full name"
                        />
                        {errors.name && (
                            <div className="invalid-feedback d-block">{errors.name}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-bold">
                            Email
                        </label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email address"
                        />
                        {errors.email && (
                            <div className="invalid-feedback d-block">{errors.email}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="age" className="form-label fw-bold">
                            Age
                        </label>
                        <input
                            type="number"
                            className={`form-control ${errors.age ? "is-invalid" : ""}`}
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="Enter age"
                        />
                        {errors.age && (
                            <div className="invalid-feedback d-block">{errors.age}</div>
                        )}
                    </div>

                    <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-warning btn-lg" disabled={submitting}>
                            {submitting ? "Updating..." : "✅ Update User"}
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary btn-lg"
                            onClick={() => navigate("/")}
                        >
                            ❌ Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;