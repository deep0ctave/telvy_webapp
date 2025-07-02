import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {

  return (
    <div className="hero bg-base-200" style={{ minHeight: "90vh" }}>
      <div className="hero-content flex-col lg:flex-row-reverse gap-8">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login Now!</h1>
          <p className="py-2">
            <strong>Landing Page</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
