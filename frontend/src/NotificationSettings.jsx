import React from "react";

const NotificationSettings = () => {
  return (
    <div className="flex-1">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-content px-10 py-12">
        <h1 className="text-5xl font-extrabold">Notification Settings</h1>
        <p className="mt-4 max-w-2xl text-base opacity-90">
          Choose how and when you receive notifications.
        </p>
      </div>

      {/* Content Placeholder */}
      <div className="p-10">
        <p className="text-lg opacity-70">Notification preferences will be configured here.</p>
      </div>
    </div>
  );
};

export default NotificationSettings;
