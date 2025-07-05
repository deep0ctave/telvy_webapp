import React, { useState } from "react";
import { X } from "lucide-react";

const EditUserModal = ({ user, onClose, onSave, onBan }) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    username: user.username || "",
    phone: user.phone || "",
    user_type: user.user_type || "student",
    school: user.school || "",
    class: user.class || "",
    section: user.section || "",
    newPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!formData.name.trim()) err.name = "Name is required";
    if (!formData.phone.match(/^\d{10}$/)) err.phone = "Enter a valid 10-digit phone number";
    if (!formData.user_type) err.user_type = "User type is required";
    return err;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const err = validate();
    if (Object.keys(err).length) return setErrors(err);
    onSave(formData);
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Edit User</h3>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Name */}
          <fieldset>
            <legend className="label">Full Name</legend>
            <input
              type="text"
              className="input input-bordered w-full"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && <p className="text-sm text-error">{errors.name}</p>}
          </fieldset>

          {/* Username (read-only) */}
          <fieldset>
            <legend className="label">Username</legend>
            <input
              type="text"
              className="input input-bordered w-full"
              value={formData.username}
              readOnly
            />
          </fieldset>

          {/* Phone */}
          <fieldset>
            <legend className="label">Phone</legend>
            <input
              type="tel"
              className="input input-bordered w-full"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
            {errors.phone && <p className="text-sm text-error">{errors.phone}</p>}
          </fieldset>

          {/* User Type */}
          <fieldset>
            <legend className="label">User Type</legend>
            <select
              className="select select-bordered w-full"
              value={formData.user_type}
              onChange={(e) => handleChange("user_type", e.target.value)}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
            {errors.user_type && <p className="text-sm text-error">{errors.user_type}</p>}
          </fieldset>

          {/* Optional Fields */}
          <fieldset>
            <legend className="label">School</legend>
            <input
              type="text"
              className="input input-bordered w-full"
              value={formData.school}
              onChange={(e) => handleChange("school", e.target.value)}
            />
          </fieldset>

          <div className="flex gap-4">
            <fieldset className="flex-1">
              <legend className="label">Class</legend>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.class}
                onChange={(e) => handleChange("class", e.target.value)}
              />
            </fieldset>

            <fieldset className="flex-1">
              <legend className="label">Section</legend>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.section}
                onChange={(e) => handleChange("section", e.target.value)}
              />
            </fieldset>
          </div>

          {/* Password */}
          <fieldset>
            <legend className="label">New Password (optional)</legend>
            <input
              type="password"
              className="input input-bordered w-full"
              value={formData.newPassword}
              onChange={(e) => handleChange("newPassword", e.target.value)}
            />
          </fieldset>
        </div>

        <div className="modal-action justify-between mt-6">
          <button className="btn btn-error btn-outline" onClick={() => onBan(user)}>
            Ban Account
          </button>
          <div className="space-x-2">
            <button className="btn" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
