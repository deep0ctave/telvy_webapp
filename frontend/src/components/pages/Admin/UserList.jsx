// File: components/pages/Admin/UserList.jsx
import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { getAllUsers, createUser, updateUserById, deleteUserById } from "../../../services/api";
import CreateUserModal from "./CreateUserModal";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      toast.error("Failed to fetch users");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <button className="btn btn-primary" onClick={() => setShowCreate(true)}>+ Create User</button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Phone</th>
              <th>School</th>
              <th>Class</th>
              <th>Section</th>
              <th>Type</th>
              <th>DOB</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.username}</td>
                <td>{u.name}</td>
                <td>{u.phone}</td>
                <td>{u.school}</td>
                <td>{u.class}</td>
                <td>{u.section}</td>
                <td>{u.user_type}</td>
                <td>{u.dob ? new Date(u.dob).toLocaleDateString("en-GB") : "-"}</td>
                <td className="flex gap-2">
                  <button className="btn btn-sm btn-info" onClick={() => { setSelectedUser(u); setShowEdit(true); }}>
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button className="btn btn-sm btn-error" onClick={() => { setSelectedUser(u); setShowDelete(true); }}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showCreate && (
        <CreateUserModal
          onClose={() => setShowCreate(false)}
          onCreate={(user) => {
            setUsers((prev) => [...prev, user]);
            toast.success("User created successfully");
          }}
        />
      )}

      {showEdit && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setShowEdit(false)}
          onSave={(updatedUser) => {
            setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
          }}
        />
      )}

      {showDelete && selectedUser && (
        <DeleteUserModal
          user={selectedUser}
          onClose={() => setShowDelete(false)}
          onConfirm={async () => {
            await deleteUserById(selectedUser.id);
            setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
            toast.success("User deleted");
            setShowDelete(false);
          }}
        />
      )}
    </div>
  );
};

export default UserList;
