import React from "react";

const HelpAndFAQ = () => {
  return (
    <div className="flex-1">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-content px-10 py-12">
        <h1 className="text-5xl font-extrabold">Help & FAQ</h1>
        <p className="mt-4 max-w-2xl text-base opacity-90">
          Find answers to common questions and get support.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="p-10 space-y-4">
        <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
          <input type="checkbox" />
          <div className="collapse-title font-semibold">
            How do I create an account?
          </div>
          <div className="collapse-content text-sm">
            Click the "Sign Up" button in the top right corner and follow the registration process.
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
          <input type="checkbox" />
          <div className="collapse-title font-semibold">
            How can I reset my password?
          </div>
          <div className="collapse-content text-sm">
            Go to the login page and click "Forgot Password". Follow the steps to reset your password via email.
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
          <input type="checkbox" />
          <div className="collapse-title font-semibold">
            How do I change my email address?
          </div>
          <div className="collapse-content text-sm">
            Navigate to Account Settings and update your email address in the provided field.
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
          <input type="checkbox" />
          <div className="collapse-title font-semibold">
            How can I contact support?
          </div>
          <div className="collapse-content text-sm">
            You can reach our support team via the contact form on the Help page or email support@example.com.
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpAndFAQ;
