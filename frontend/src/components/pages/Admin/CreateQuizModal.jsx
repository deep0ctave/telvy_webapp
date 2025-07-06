import React, { useState } from "react";

const defaultUser = {
  username: "",
  password: "",
  name: "",
  phone: "",
  email: "",
  user_type: "student",
  school: "",
  class: "",
  section: "",
};

const CreateUserModal = ({ onClose, onCreate }) => {
  const [form, setForm] = useState(defaultUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.username || !form.password) return alert("Username and password are required.");
    onCreate(form);
  };

  return (
    <dialog open className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Create User</h3>
        <div className="space-y-3">
          {Object.entries(defaultUser).map(([key]) => (
            <input
              key={key}
              name={key}
              type="text"
              className="input input-bordered w-full"
              placeholder={key}
              value={form[key]}
              onChange={handleChange}
            />
          ))}
        </div>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Create</button>
        </div>
      </div>
    </dialog>
  );
};

export default CreateUserModal;