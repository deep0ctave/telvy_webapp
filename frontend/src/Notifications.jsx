import React from "react";

const NotificationsPage = () => {
  const notifications = [
    {
      id: 1,
      title: "New Quiz Available",
      description: "Check out the latest quiz on data structures.",
      labels: ["quiz", "new"],
      date: { day: 17, month: 5, year: 2025 },
    },
    {
      id: 2,
      title: "Account Login Alert",
      description: "Your account was accessed from a new device.",
      labels: ["alert"],
      date: { day: 16, month: 5, year: 2025 },
    },
    {
      id: 3,
      title: "System Maintenance",
      description: "We’ll be down for maintenance tonight from 12–2AM.",
      labels: ["critical", "alert"],
      date: { day: 10, month: 5, year: 2025 },
    },
    {
      id: 4,
      title: "Welcome!",
      description: "Thanks for joining! Get started with a quick tutorial.",
      labels: [""],
      date: { day: 19, month: 3, year: 2024 },
    },
  ];

  const Badge = ({ labels }) => {
    const labelStyleMap = {
      new: "badge badge-soft badge-success",
      quiz: "badge badge-soft badge-info",
      alert: "badge badge-soft badge-warning",
      critical: "badge badge-soft badge-error",
    };

    return (
      <div className="flex flex-wrap gap-2 ">
        {labels.map((label, index) => {
          const style = labelStyleMap[label] || "";
          return (
            <span
              key={index}
              className={`${style} capitalize`}
            >
              {label}
            </span>
          );
        })}
      </div>
    );
  };

  const getTimeAgo = ({ day, month, year }) => {
    const postedDate = new Date(year, month - 1, day);
    const now = new Date();
    const diffMs = now - postedDate;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return "Today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week(s) ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} month(s) ago`;
    return `${Math.floor(diffDays / 365)} year(s) ago`;
  };

  return (
    <div className="flex-1">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-content px-10 py-12">
        <h1 className="text-5xl font-extrabold">Notifications</h1>
        <p className="mt-4 max-w-2xl text-base opacity-90">
          See important messages about your account and updates.
        </p>
      </div>

      {/* Notification List */}
      <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="card bg-base-200 hover:bg-base-300 transition-shadow border border-base-300 rounded-box shadow"
          >
            <div className="card-body">
              <div className="flex justify-between items-start">
                <h2 className="card-title">{notification.title}</h2>
                <Badge labels={notification.labels} />
              </div>
              <p className="text-sm opacity-80">{notification.description}</p>
              <p className="text-xs text-right text-base-content/60 mt-2">
                {getTimeAgo(notification.date)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
