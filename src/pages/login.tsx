import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/use.redux';
import { loginSuccess } from '../context/slices/auth.slice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const STATIC_USERNAME = 'admin';
  const STATIC_PASSWORD = 'password';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === STATIC_USERNAME && password === STATIC_PASSWORD) {
      dispatch(loginSuccess({ name: 'Admin User' }));
      navigate('/');
    } else {
      setError('Username atau password salah!');
    }
  };

  return (
    <div className="px-3 md:px-0 font-quicksand flex items-center justify-center min-h-screen bg-bg-light dark:bg-bg-dark">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-lg lg:max-w-md"
      >
        <h1 className="text-xl md:text-2xl font-bold mb-6 text-center text-text-light dark:text-text-dark">
          Login
        </h1>
        {error && <p className="text-error text-sm mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-text-light dark:text-text-dark mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full text-text-light dark:text-text-dark px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="mb-6">
          <label className="block text-text-light dark:text-text-dark mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-text-light dark:text-text-dark px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-2 bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;