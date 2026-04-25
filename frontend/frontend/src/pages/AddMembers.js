import { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Toast({ message, type, onDone }) {
  return (
    <div className={`toast toast-${type}`} onAnimationEnd={onDone}>
      {type === "success" ? "✓" : "✕"} {message}
    </div>
  );
}

function AddMember() {
  const [form, setForm] = useState({ name: "", role: "", email: "", image: null });
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setForm({ ...form, image: file });
      setFileName(file ? file.name : "");
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.role || !form.email) {
      setToast({ message: "Please fill in all required fields.", type: "error" });
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append("name", form.name);
    data.append("role", form.role);
    data.append("email", form.email);
    if (form.image) data.append("image", form.image);

    try {
      await axios.post(`${API_URL}/api/members`, data);
      setToast({ message: "Member added successfully!", type: "success" });
      setForm({ name: "", role: "", email: "", image: null });
      setFileName("");
      e.target.reset();
    } catch (err) {
      console.error(err);
      setToast({ message: "Something went wrong. Try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      <div className="page-header">
        <h1>Add Member</h1>
        <p>Fill in the details below to add a new team member.</p>
      </div>

      <div className="card form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Full Name *</label>
            <input
              id="name"
              className="form-input"
              name="name"
              placeholder="e.g. Alex Johnson"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="role">Role *</label>
            <input
              id="role"
              className="form-input"
              name="role"
              placeholder="e.g. Frontend Developer"
              value={form.role}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address *</label>
            <input
              id="email"
              className="form-input"
              name="email"
              type="email"
              placeholder="e.g. alex@company.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Profile Photo</label>
            <div className="file-upload-wrapper">
              <label htmlFor="image-upload" className="file-upload-label">
                <span>📎</span>
                <span>{fileName || "Choose a photo (optional)"}</span>
              </label>
              <input
                id="image-upload"
                className="file-upload-input"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Member"}
          </button>
        </form>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDone={() => setToast(null)}
        />
      )}
    </main>
  );
}

export default AddMember;