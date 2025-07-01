import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="hero bg-base-200" style={{ minHeight: "90vh" }}>
      <div className="hero-content flex-col lg:flex-row-reverse gap-8">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login Now!</h1>
          <p className="py-2">
            Just a step away from your next <strong>BIG</strong> question.
          </p>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input input-bordered w-full"
                  placeholder="Email"
                  required
                />

                <label className="label mt-2">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input input-bordered w-full"
                  placeholder="Password"
                  required
                />

                <div className="flex justify-between mt-4 text-sm">
                  <Link to="/forgotpassword" className="link link-hover ml-2">
                    Forgot password?
                  </Link>
                  <Link to="/register" className="link link-hover mr-2">
                    Register
                  </Link>
                </div>

                <button type="submit" className="btn btn-neutral mt-4 w-full">
                  Login
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
