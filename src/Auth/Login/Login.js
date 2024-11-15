import React, { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { username, password, rememberMe });
    // Add your login logic here (API call, etc.)
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://via.placeholder.com/1920x1080.png?text=Background+Image)' }}>
      {/* Overlay for contrast */}
      <div className="bg-black bg-opacity-50 min-h-screen flex justify-center items-center">
        {/* Login Box */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="https://via.placeholder.com/150x50.png?text=Logo" // Replace with your logo
              alt="Logo"
              className="h-12"
            />
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Username or Email */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username or Email</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">Remember me</label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Log in
              </button>
            </div>
          </form>

          {/* Links */}
          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-blue-600 hover:underline">Forgot your password?</a>
            <p className="mt-4 text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="text-blue-600 hover:underline">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
