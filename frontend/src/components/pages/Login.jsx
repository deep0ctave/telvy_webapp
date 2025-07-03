import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e, force = false) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ ...form, force });
      toast.success('Login successful');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';

      // If session already exists, ask for confirmation
      if (msg.includes('User already logged in') && !force) {
        const confirmForce = window.confirm(
          'You are already logged in elsewhere. Do you want to force logout other sessions and continue?'
        );
        if (confirmForce) {
          return handleSubmit(e, true);
        } else {
          toast.error('Login cancelled');
          setLoading(false);
          return;
        }
      }

      console.error(err);
      toast.error(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="h-[80vh] overflow-hidden flex items-center justify-center">
    <div className="p-6 max-w-sm w-full">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username or Phone"
          className="input input-bordered w-full"
          value={form.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input input-bordered w-full"
          value={form.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        <div className="text-sm mt-4 text-center">
          <a href="/forgot-password" className="link link-hover">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  </div>
);
}

export default Login;
