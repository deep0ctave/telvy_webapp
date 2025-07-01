import React, { useState } from "react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handlePasswordChange = () => {
    if (currentPassword && newPassword) {
      setShowOtpModal(true);
    }
  };

  const handleOtpSubmit = () => {
    setShowOtpModal(false);
    alert("Password updated successfully!");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex-1">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-content px-10 py-12">
        <h1 className="text-5xl font-extrabold">Settings</h1>
        <p className="mt-4 max-w-2xl text-base opacity-90">
          Customize your preferences, privacy, and profile.
        </p>
      </div>

      {/* Tabs */}
      <div className="max-w-5xl mx-auto mt-10 px-4">
        <div className="tabs tabs-lift w-full mb-6">
          {["Profile", "Auth", "Notifications", "Data", "Avatar"].map((tab) => (
            <input
              key={tab}
              type="radio"
              name="settings_tabs"
              className="tab"
              aria-label={tab}
              checked={activeTab === tab}
              onChange={() => setActiveTab(tab)}
            />
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-base-300 border-base-300 border rounded-box p-6 m-8">
          {activeTab === "Profile" && (
            <>
              <fieldset className="mb-4">
                <label className="label">Full Name</label>
                <input type="text" className="input input-bordered w-full" defaultValue="John Doe" />
              </fieldset>

              <fieldset className="mb-4">
                <label className="label">Username</label>
                <input type="text" className="input input-bordered w-full" defaultValue="johndoe" />
              </fieldset>

              <fieldset className="mb-4">
                <label className="label">Bio</label>
                <textarea className="textarea textarea-bordered w-full" rows={3} placeholder="Tell us something about you..." />
              </fieldset>

              <fieldset>
                <label className="label">Language</label>
                <select className="select select-bordered w-full">
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </fieldset>
            </>
          )}

          {activeTab === "Auth" && (
            <>
              <fieldset className="mb-4">
                <label className="label">Email Address</label>
                <input type="email" className="input input-bordered w-full" defaultValue="john@example.com" />
              </fieldset>

              <fieldset className="mb-4">
                <label className="label">Phone Number</label>
                <input type="tel" className="input input-bordered w-full" placeholder="+91 9876543210" />
              </fieldset>

              <fieldset>
                <label className="label">Change Password</label>
                <input
                  type="password"
                  className="input input-bordered mb-2 w-full"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <input
                  type="password"
                  className="input input-bordered w-full"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button className="btn btn-sm btn-primary mt-2" onClick={handlePasswordChange}>
                  Change Password
                </button>
              </fieldset>
            </>
          )}

          {activeTab === "Notifications" && (
            <>
              <fieldset className="mb-4">
                <legend className="font-bold mb-2">Email Notifications</legend>
                <label className="flex items-center gap-2 mb-2">
                  <input type="checkbox" className="checkbox" defaultChecked />
                  Updates & newsletters
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="checkbox" />
                  Security alerts
                </label>
              </fieldset>

              <fieldset className="mb-4">
                <legend className="font-bold mb-2">Push Notifications</legend>
                <label className="flex items-center gap-2 mb-2">
                  <input type="checkbox" className="checkbox" />
                  App reminders
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="checkbox" defaultChecked />
                  New message alerts
                </label>
              </fieldset>

              <fieldset>
                <legend className="font-bold mb-2">SMS Notifications</legend>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="checkbox" />
                  Important announcements
                </label>
              </fieldset>
            </>
          )}

          {activeTab === "Data" && (
            <>
              <fieldset className="mb-4">
                <legend className="font-bold mb-2">Privacy Settings</legend>
                <label className="flex items-center gap-2 mb-2">
                  <input type="checkbox" className="checkbox checkbox-primary" defaultChecked />
                  Show my profile publicly
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="checkbox checkbox-primary" />
                  Allow search indexing
                </label>
              </fieldset>

              <fieldset>
                <legend className="font-bold mb-2 text-error">Danger Zone</legend>
                <p className="text-sm mb-2">This action cannot be undone.</p>
                <button className="btn btn-sm btn-error">Delete My Account</button>
              </fieldset>
            </>
          )}

          {activeTab === "Avatar" && (
            <>
              <fieldset className="mb-4">
                <legend className="font-bold mb-2">Profile Picture</legend>
                {avatarPreview ? (
                  <div className="mb-2">
                    <img src={avatarPreview} alt="Avatar preview" className="w-32 h-32 rounded-full object-cover" />
                    <button className="btn btn-sm mt-2" onClick={() => setAvatarPreview(null)}>
                      Remove
                    </button>
                  </div>
                ) : (
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                )}
              </fieldset>
            </>
          )}

          {/* Update Button */}
          <div className="mt-8 text-right">
            <button className="btn btn-primary">Update Settings</button>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <dialog id="otp_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">OTP Verification</h3>
            <p className="py-2">Enter the OTP sent to your email.</p>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleOtpSubmit}>
                Submit
              </button>
              <button className="btn" onClick={() => setShowOtpModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default SettingsPage;
