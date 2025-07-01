import React, { useState } from "react";

export default function Register() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    dob: "",
    phone: "",
    email: "",
    school: "",
    grade: "",
    section: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const next = () => setStep(s => Math.min(s + 1, 3));
  const prev = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = e => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Submitted:", form);
  };

  return (
    <div className="hero bg-base-200 flex flex-col justify-center" style={{ minHeight: "100vh" }}>
      {/* Steps */}
      <ul className="steps pb-8 pt-8 w-1/2 mx-auto">
        <li className={`step ${step >= 1 ? "step-primary" : ""}`}>Personal Details</li>
        <li className={`step ${step >= 2 ? "step-primary" : ""}`}>School Details</li>
        <li className={`step ${step === 3 ? "step-primary" : ""}`}>Verify</li>
      </ul>

      <form onSubmit={handleSubmit} className="mx-auto w-xs">
        {/* Step 1 */}
        {step === 1 && (
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 mb-6" style={{direction: 'ltr'}}>
            <legend className="fieldset-legend">Signup 1/3</legend>

            <label className="label">Full Name:</label>
            <label className="input validator">
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>

            <label className="label">Date of Birth:</label>
            <label className="input validator">
              {/* Added inline style to ensure LTR for date input calendar */}
              <input
                name="dob"
                type="date"
                value={form.dob}
                onChange={handleChange}
                required
                style={{ direction: "ltr" }}
              />
            </label>

            <label className="label">Phone Number:</label>
            <div className="join">
              <span className="join-item btn btn-disabled">+91</span>
              <input
                name="phone"
                type="tel"
                className="input join-item tabular-nums"
                placeholder="1234567890"
                value={form.phone}
                onChange={handleChange}
                pattern="[0-9]*"
                minLength="10"
                maxLength="10"
                required
              />
            </div>

            <label className="label">Email:</label>
            <label className="input validator">
              <input
                name="email"
                type="email"
                placeholder="mail@site.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>

            <div className="flex justify-end mt-4">
              <button type="button" className="btn btn-neutral w-1/3" onClick={next}>
                Next
              </button>
            </div>
          </fieldset>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 mb-6">
            <legend className="fieldset-legend">Signup 2/3</legend>

            <label className="label">Enter School Name :</label>
            <input
              name="school"
              type="text"
              className="input"
              placeholder="Which School do you study in?"
              list="schools"
              value={form.school}
              onChange={handleChange}
              required
            />
            <datalist id="schools">
              <option value="Greenfield Public School" />
              <option value="Springdale High" />
              <option value="Riverdale Academy" />
            </datalist>

            <label className="label">Select Grade/Class :</label>
            <select
              name="grade"
              className="select"
              value={form.grade}
              onChange={handleChange}
              required
            >
              <option disabled value="">
                select
              </option>
              <option>1st</option>
              <option>2nd</option>
              <option>3rd</option>
            </select>

            <label className="label">Select Section :</label>
            <select
              name="section"
              className="select"
              value={form.section}
              onChange={handleChange}
              required
            >
              <option disabled value="">
                select
              </option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>

            <div className="flex justify-between mt-6">
              <button type="button" className="btn btn-neutral w-1/3" onClick={prev}>
                Prev
              </button>
              <button type="button" className="btn btn-neutral w-1/3" onClick={next}>
                Next
              </button>
            </div>
          </fieldset>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 mb-6">
            <legend className="fieldset-legend">Signup 3/3</legend>

            <label className="label">Enter Username :</label>
            <label className="input validator">
              <input
                name="username"
                type="text"
                required
                placeholder="Username"
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minLength="3"
                maxLength="30"
                value={form.username}
                onChange={handleChange}
              />
            </label>
            <p className="validator-hint hidden">
              Must be 3 to 30 characters
              <br />
              containing only letters, numbers or dash
            </p>

            <label className="label">Enter Password :</label>
            <label className="input validator">
              <input
                name="password"
                type="password"
                required
                placeholder="Password"
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                value={form.password}
                onChange={handleChange}
              />
            </label>
            <p className="validator-hint hidden">
              Must be more than 8 characters, including
              <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
            </p>

            <label className="label">Confirm Password :</label>
            <label className="input validator">
              <input
                name="confirmPassword"
                type="password"
                required
                placeholder="Re-enter Password"
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </label>
            <p className="validator-hint hidden">Password does not match</p>

            <div className="flex justify-between mt-6">
              <button type="button" className="btn btn-neutral w-1/3" onClick={prev}>
                Prev
              </button>
              <button className="btn btn-primary w-1/3" onClick={()=>document.getElementById('my_modal_1').showModal()}>
                Submit
              </button>
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Verify OTP</h3>
                            <p className="py-2">An OTP has been sent to your mobile number ending in ***1234.</p>

                            <form method="dialog">
                                <label className="label mt-4">
                                    <span className="label-text">Enter OTP:</span>
                                </label>
                                <input
                                    type="text"
                                    name="otp"
                                    maxLength="6"
                                    className="input input-bordered w-full"
                                    placeholder="123456"
                                    required
                                    onChange={handleChange}
                                />

                                <div className="modal-action">
                                    <button type="submit" className="btn btn-primary w-full">
                                        Confirm & Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </dialog>
            </div>
          </fieldset>
        )}
      </form>
    </div>
  );
}
