import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "./api";

function CreateUser({ onUserCreated }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      await createUser({
        name: formData.name,
        email: formData.email,
        age: parseInt(formData.age),
      });
      alert("✅ User created successfully!");
      onUserCreated();
      navigate("/");
    } catch (error) {
      setErrors({ submit: error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-4 shadow-lg">
        <h2 className="mb-4">➕ Add New User</h2>
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
            <button type="submit" className="btn btn-success btn-lg" disabled={loading}>
              {loading ? "Creating..." : "✅ Create User"}
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

export default CreateUser;