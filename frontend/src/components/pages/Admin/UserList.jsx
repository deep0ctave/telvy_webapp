import React, { useState, useEffect } from "react";
import { Pencil, Trash2, ChevronUp, ChevronDown, Filter } from "lucide-react";
import CreateUserModal from "./CreateUserModal";
import EditUserModal from "./EditUserModal";

const mockUsers = [
  {
    id: 1,
    username: "aryan",
    name: "Aryan Sharma",
    phone: "1234567890",
    user_type: "student",
    school: "XYZ Public School",
    class: "10",
    section: "C",
  },
  {
    id: 2,
    username: "teacher01",
    name: "Meera Singh",
    phone: "9876543210",
    user_type: "teacher",
    school: "ABC School",
    class: "12",
    section: "A",
  },
  {
    id: 3,
    username: "adminboss",
    name: "Super Admin",
    phone: "9999999999",
    user_type: "admin",
    school: "System",
    class: "",
    section: "",
  },
];

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
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
    setTimeout(() => {
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
    }, 300);
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

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (confirm) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
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
          {["school", "user_type", "name", "class", "section"].map((field) => (
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
                      onClick={() => handleDelete(user.id)}
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
          onCreate={(newUser) => {
            setUsers((prev) => [...prev, { id: Date.now(), ...newUser }]);
            setShowCreateModal(false);
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
          onSave={(updated) => {
            setUsers((prev) =>
              prev.map((u) => (u.id === updated.id ? { ...u, ...updated } : u))
            );
            setShowEditModal(false);
          }}
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
