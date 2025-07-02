import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { registerUser, verifyOtp } from '../services/auth';

export default function Register() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    school: '',
    class: '',
    section: '',
    username: '',
    password: '',
    confirmPassword: '',
    otp: '',
    user_type: 'student',
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleInitiate = async () => {
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      setSubmitting(true);
      await registerUser(form);
      toast.success('OTP sent to phone');
      document.getElementById('otp_modal').showModal();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerify = async () => {
    try {
      setSubmitting(true);
      await verifyOtp({ phone: form.phone, otp: form.otp });
      toast.success('Registration complete');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.error || 'OTP verification failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="hero bg-base-200 flex flex-col justify-center min-h-screen">
      <ul className="steps pb-8 pt-8 w-1/2 mx-auto">
        <li className={`step ${step >= 1 ? 'step-primary' : ''}`}>Personal</li>
        <li className={`step ${step >= 2 ? 'step-primary' : ''}`}>School</li>
        <li className={`step ${step === 3 ? 'step-primary' : ''}`}>Account</li>
      </ul>

      <form className="mx-auto w-full max-w-md px-4">
        {step === 1 && (
          <div className="space-y-4">
            <input name="name" type="text" placeholder="Full Name" className="input input-bordered w-full" value={form.name} onChange={handleChange} required />
            <input name="dob" type="date" className="input input-bordered w-full" value={form.dob} onChange={handleChange} required />

            <select name="gender" className="select select-bordered w-full" value={form.gender} onChange={handleChange} required>
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <input name="phone" type="tel" placeholder="Phone Number" className="input input-bordered w-full" value={form.phone} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" value={form.email} onChange={handleChange} required />

            <select name="user_type" className="select select-bordered w-full" value={form.user_type} onChange={handleChange} required>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>

            <button type="button" className="btn btn-primary w-full" onClick={next}>Next</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <input name="school" type="text" placeholder="School" className="input input-bordered w-full" value={form.school} onChange={handleChange} required />
            <input name="class" type="text" placeholder="Class" className="input input-bordered w-full" value={form.class} onChange={handleChange} required />
            <input name="section" type="text" placeholder="Section" className="input input-bordered w-full" value={form.section} onChange={handleChange} required />

            <div className="flex justify-between">
              <button type="button" className="btn btn-outline" onClick={prev}>Prev</button>
              <button type="button" className="btn btn-primary" onClick={next}>Next</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <input name="username" type="text" placeholder="Username" className="input input-bordered w-full" value={form.username} onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" value={form.password} onChange={handleChange} required />
            <input name="confirmPassword" type="password" placeholder="Confirm Password" className="input input-bordered w-full" value={form.confirmPassword} onChange={handleChange} required />

            <div className="flex justify-between">
              <button type="button" className="btn btn-outline" onClick={prev}>Prev</button>
              <button type="button" className="btn btn-primary" onClick={handleInitiate} disabled={submitting}>Submit</button>
            </div>
          </div>
        )}
      </form>

      <dialog id="otp_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Verify OTP</h3>
          <p className="py-2">An OTP has been sent to your phone.</p>
          <input name="otp" type="text" maxLength="6" placeholder="Enter OTP" className="input input-bordered w-full" onChange={handleChange} value={form.otp} />
          <div className="modal-action">
            <form method="dialog" className="w-full">
              <button type="submit" className="btn btn-primary w-full" onClick={handleVerify} disabled={submitting}>Confirm & Submit</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
