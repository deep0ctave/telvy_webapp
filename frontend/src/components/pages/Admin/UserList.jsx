// File: components/pages/Admin/UserList.jsx
import React, { useState, useEffect } from "react";
import { Pencil, Trash2, ChevronUp, ChevronDown, Filter } from "lucide-react";
import CreateUserModal from "./CreateUserModal";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";
import {
  getAllUsers,
  createUser,
  updateUserById,
  deleteUserById,
} from "../../../services/api"; // adjust path if needed

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [filters, setFilters] = useState({
    school: "",
    user_type: "",
    name: "",
    class: "",
    section: "",
  });
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersFromServer = await getAllUsers();
        setUsers(usersFromServer);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    filterAndSortUsers();
  }, [search, filters, sortConfig, users]);

  const filterAndSortUsers = () => {
    let data = [...users];

    if (search) {
      const lower = search.toLowerCase();
      data = data.filter(
        (u) =>
          u.username.toLowerCase().includes(lower) ||
          u.name.toLowerCase().includes(lower) ||
          u.phone.includes(search)
      );
    }

    if (advancedSearch) {
      Object.entries(filters).forEach(([key, val]) => {
        if (val.trim() !== "") {
          data = data.filter((u) =>
            u[key]?.toLowerCase().includes(val.toLowerCase())
          );
        }
      });
    }

    if (sortConfig.key) {
      data.sort((a, b) => {
        const aVal = a[sortConfig.key] || "";
        const bVal = b[sortConfig.key] || "";

        if (sortConfig.direction === "asc") {
          return aVal.localeCompare(bVal);
        } else {
          return bVal.localeCompare(aVal);
        }
      });
    }

    setFilteredUsers(data);
  };

  const toggleSort = (key) => {
    if (sortConfig.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSortConfig({ key, direction: "asc" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUserById(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete user.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap justify-between gap-4 items-center">
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <div className="flex gap-2">
          <button className="btn btn-outline" onClick={() => setAdvancedSearch((s) => !s)}>
            <Filter className="w-4 h-4" /> Advanced Search
          </button>
          <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
            + Create User
          </button>
        </div>
      </div>

      <input
        type="text"
        className="input input-bordered w-full max-w-md"
        placeholder="Search by name, username, or phone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {advancedSearch && (
        <div className="grid md:grid-cols-3 gap-4 bg-base-200 p-4 rounded-md">
          {Object.keys(filters).map((field) => (
            <input
              key={field}
              type="text"
              className="input input-bordered w-full"
              placeholder={`Filter by ${field}`}
              value={filters[field]}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, [field]: e.target.value }))
              }
            />
          ))}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              {["username", "name", "phone", "user_type", "school", "class", "section"].map(
                (col) => (
                  <th key={col} onClick={() => toggleSort(col)} className="cursor-pointer">
                    <div className="flex items-center gap-1 capitalize">
                      {col}
                      {sortConfig.key === col &&
                        (sortConfig.direction === "asc" ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        ))}
                    </div>
                  </th>
                )
              )}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="99" className="text-center py-6 text-base-content/60">
                  No matching users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>
                    <span className={`badge badge-${getBadgeColor(user.user_type)}`}>
                      {user.user_type}
                    </span>
                  </td>
                  <td>{user.school}</td>
                  <td>{user.class}</td>
                  <td>{user.section}</td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowEditModal(true);
                      }}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowDeleteModal(true);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showCreateModal && (
        <CreateUserModal
          onClose={() => setShowCreateModal(false)}
          onCreate={async (newUser) => {
            try {
              const res = await createUser(newUser);
              setUsers((prev) => [...prev, res.user]);
              setShowCreateModal(false);
            } catch (err) {
              console.error("Create failed:", err);
              alert("Failed to create user");
            }
          }}
        />
      )}

      {showEditModal && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => {
            setShowEditModal(false);
            setSelectedUser(null);
          }}
          onSave={async (updated) => {
            try {
              await updateUserById(selectedUser.id, updated);
              setUsers((prev) =>
                prev.map((u) => (u.id === selectedUser.id ? { ...u, ...updated } : u))
              );
              setShowEditModal(false);
            } catch (err) {
              console.error("Update failed:", err);
              alert("Failed to update user");
            }
          }}
        />
      )}

      {showDeleteModal && selectedUser && (
        <DeleteUserModal
          isOpen={true}
          user={selectedUser}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

const getBadgeColor = (type) => {
  if (type === "admin") return "neutral";
  if (type === "teacher") return "primary";
  return "accent";
};

export default UserList;
