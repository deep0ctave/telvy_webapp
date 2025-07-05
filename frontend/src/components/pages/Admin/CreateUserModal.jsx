import React, { useState } from "react";

const initialForm = {
  name: "",
  username: "",
  phone: "",
  user_type: "student",
};

const CreateUserModal = ({ onClose, onCreate }) => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.username || !form.phone) {
      return setError("All fields are required.");
    }

    onCreate(form); // send back to parent
    setForm(initialForm);
    setError("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-lg p-6 relative">
        <h2 className="text-xl font-bold mb-4">Create New User</h2>

        {error && (
          <div className="alert alert-error mb-4 py-2 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <fieldset>
            <legend className="font-medium">Name</legend>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              value={form.name}
              onChange={handleChange}
            />
          </fieldset>

          <fieldset>
            <legend className="font-medium">Username</legend>
            <input
              type="text"
              name="username"
              className="input input-bordered w-full"
              value={form.username}
              onChange={handleChange}
            />
          </fieldset>

          <fieldset>
            <legend className="font-medium">Phone</legend>
            <input
              type="tel"
              name="phone"
              className="input input-bordered w-full"
              value={form.phone}
              onChange={handleChange}
            />
          </fieldset>

          <fieldset>
            <legend className="font-medium">Role</legend>
            <select
              name="user_type"
              className="select select-bordered w-full"
              value={form.user_type}
              onChange={handleChange}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </fieldset>

          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
