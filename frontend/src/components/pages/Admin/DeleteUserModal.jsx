// File: components/pages/Admin/DeleteUserModal.jsx

import React from "react";

const DeleteUserModal = ({ isOpen, user, onClose, onConfirm }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-base-100 rounded-box p-6 w-full max-w-md shadow-xl space-y-4">
        <h3 className="text-xl font-bold text-error">Delete User</h3>
        <p>
          Are you sure you want to delete user{" "}
          <span className="font-semibold">{user.name}</span> (
          <code>{user.username}</code>)?
        </p>

        <div className="flex justify-end gap-2 mt-4">
          <button className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-error" onClick={() => onConfirm(user.id)}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
