import React, { useState } from "react";

const initialGroups = [
  {
    id: 1,
    name: "React Learners",
    createdAt: "2025-01-15",
    owner: "Alice",
    members: ["Alice", "Bob", "You", "David"],
  },
  {
    id: 2,
    name: "JavaScript Fans",
    createdAt: "2024-12-20",
    owner: "Charlie",
    members: ["Charlie", "You", "Eve"],
  },
  {
    id: 3,
    name: "CSS Artists",
    createdAt: "2025-03-05",
    owner: "Bob",
    members: ["Bob", "You", "Frank", "Grace", "Helen"],
  },
];

// Badge component to display number of members
const Badge = ({ count }) => (
  <span className="badge badge-info badge-sm">{count} members</span>
);

// Modal component with OTP input and confirm/cancel buttons
const LeaveModal = ({ groupName, isOpen, onCancel, onConfirm }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const correctOtp = "1234"; // For demo: fixed OTP. Replace with real backend logic

  const handleConfirm = () => {
    if (otp === correctOtp) {
      setError("");
      onConfirm();
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <input type="checkbox" id="leave-modal" className="modal-toggle" checked readOnly />
      <div className="modal modal-open">
        <div className="modal-box max-w-md">
          <h3 className="font-bold text-lg mb-2">Leave Group "{groupName}"?</h3>
          <p className="mb-4">
            Please enter the OTP to confirm you want to leave this group.
          </p>
          <input
            type="text"
            maxLength={6}
            placeholder="Enter OTP"
            className="input input-bordered w-full mb-2"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          {error && <p className="text-error text-sm mb-2">{error}</p>}
          <div className="modal-action">
            <button className="btn" onClick={onCancel}>
              Cancel
            </button>
            <button className="btn btn-error" onClick={handleConfirm}>
              Confirm Leave
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const GroupPage = () => {
  const [groups, setGroups] = useState(initialGroups);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingLeave, setPendingLeave] = useState(null);

  const onRequestLeave = (group) => {
    setPendingLeave(group);
    setModalOpen(true);
  };

  const onCancelLeave = () => {
    setPendingLeave(null);
    setModalOpen(false);
  };

  const onConfirmLeave = () => {
    setGroups((prev) =>
      prev
        .map((group) => {
          if (group.id === pendingLeave.id) {
            // Remove current user "You" from members
            const filteredMembers = group.members.filter(
              (member) => member !== "You"
            );
            return { ...group, members: filteredMembers };
          }
          return group;
        })
        .filter((group) => group.members.includes("You")) // Keep only groups where user is still a member
    );
    setPendingLeave(null);
    setModalOpen(false);
  };

  return (
    <div className="flex-1">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-content px-10 py-12">
        <h1 className="text-5xl font-extrabold">Your Groups</h1>
        <p className="mt-4 max-w-2xl text-base opacity-90">
          Manage groups you're part of. See group details or leave any group.
        </p>
      </div>

      {/* Groups List */}
      <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.length === 0 ? (
          <div className="text-center col-span-full opacity-70 text-lg">
            You are not part of any groups.
          </div>
        ) : (
          groups.map((group) => (
            <div
              key={group.id}
              className="card bg-base-200 hover:bg-base-300 transition-shadow border border-base-300 rounded-box shadow"
            >
              <div className="card-body flex flex-col justify-between">
                <div>
                  <h2 className="card-title">{group.name}</h2>
                  <p className="text-sm opacity-80 mb-1">
                    Created on:{" "}
                    <span className="font-semibold">{group.createdAt}</span>
                  </p>
                  <p className="text-sm opacity-80 mb-1">
                    Owner (Admin):{" "}
                    <span className="font-semibold">{group.owner}</span>
                  </p>
                  <p className="text-sm opacity-80 mb-3">
                    Members:{" "}
                    <span className="font-semibold">{group.members.join(", ")}</span>
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <Badge count={group.members.length} />
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => onRequestLeave(group)}
                  >
                    Leave Group
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Leave Confirmation Modal with OTP */}
      {pendingLeave && (
        <LeaveModal
          groupName={pendingLeave.name}
          isOpen={modalOpen}
          onCancel={onCancelLeave}
          onConfirm={onConfirmLeave}
        />
      )}
    </div>
  );
};

export default GroupPage;
