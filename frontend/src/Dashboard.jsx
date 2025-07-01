import React from "react";

const Dashboard = () => {
  return (
    <div className="flex-1">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-content px-10 py-12">
        <h1 className="text-5xl font-extrabold">Admin Dashboard</h1>
        <p className="mt-4 max-w-2xl text-base opacity-90">
          Manage quizzes, users, groups, and system analytics from this central hub.
        </p>
      </div>

      {/* Dashboard Sections */}
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Users Management */}
        <div className="card bg-base-200 shadow hover:shadow-lg transition cursor-pointer">
          <div className="card-body">
            <h2 className="card-title">User Management</h2>
            <p>View, edit, and remove users. Assign roles or manage access levels.</p>
          </div>
        </div>

        {/* Quiz Management */}
        <div className="card bg-base-200 shadow hover:shadow-lg transition cursor-pointer">
          <div className="card-body">
            <h2 className="card-title">Quiz Management</h2>
            <p>Create, update, and schedule quizzes for different groups.</p>
          </div>
        </div>

        {/* Group Management */}
        <div className="card bg-base-200 shadow hover:shadow-lg transition cursor-pointer">
          <div className="card-body">
            <h2 className="card-title">Group Management</h2>
            <p>Create or assign users to groups, and manage their quiz participation.</p>
          </div>
        </div>

        {/* Reports */}
        <div className="card bg-base-200 shadow hover:shadow-lg transition cursor-pointer">
          <div className="card-body">
            <h2 className="card-title">Reports</h2>
            <p>View activity logs, export data, and generate detailed reports.</p>
          </div>
        </div>

        {/* Settings */}
        <div className="card bg-base-200 shadow hover:shadow-lg transition cursor-pointer">
          <div className="card-body">
            <h2 className="card-title">System Settings</h2>
            <p>Configure app behavior, access controls, and appearance preferences.</p>
          </div>
        </div>

        {/* Support Tickets */}
        <div className="card bg-base-200 shadow hover:shadow-lg transition cursor-pointer">
          <div className="card-body">
            <h2 className="card-title">Support & Tickets</h2>
            <p>Manage FAQs, resolve issues, and respond to user feedback.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
