function Login() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form className="max-w-sm space-y-4">
        <input type="text" placeholder="Phone number" className="input input-bordered w-full" />
        <input type="password" placeholder="Password" className="input input-bordered w-full" />
        <button type="submit" className="btn btn-primary w-full">Login</button>
      </form>
    </div>
  );
}

export default Login;
