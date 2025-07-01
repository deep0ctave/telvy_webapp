import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace this with actual logic to send reset instructions
    console.log("Password reset email sent to:", email);
  };

  return (
    <div className="hero bg-base-200 min-h-[90vh]">
      <div className="hero-content flex-col lg:flex-row gap-10">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold">Forgot Password?</h1>
          <p className="py-2 max-w-md">
            Don’t worry! Just enter your registered email and we’ll send you a
            link to reset your password.
          </p>
        </div>

        <div className="card bg-base-100 max-w-sm w-full shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset">
                <label className="label">Registered Email</label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <button
                  type="submit"
                  className="btn btn-primary mt-4 w-full"
                >
                  Send Reset Link
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
