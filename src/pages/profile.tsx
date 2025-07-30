import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/use.redux';
import { updateUserName } from '../context/slices/auth.slice';
import { Link } from 'react-router-dom';

const BackArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [name, setName] = useState(user?.name || '');
  const [successMessage, setSuccessMessage] = useState('');
  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === '') {
      return;
    }
    
    dispatch(updateUserName(name));
    setSuccessMessage('Nama berhasil diperbarui!');
    setTimeout(() => {
      setSuccessMessage('');
    }, 1000);
  };

  return (
    <div className="font-quicksand p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 text-text-light dark:text-text-dark">
        Edit Profil
      </h1>

      <Link 
        to="/" 
        className="inline-flex items-center mb-2 md:mb-4 text-sm font-medium text-primary hover:text-primary-dark transition-colors duration-200"
      >
        <BackArrowIcon />
        Kembali ke Home
      </Link>
      
      <div className="max-w-md mx-auto mt-4 md:mt-6">
        <form 
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md"
        >
          <div className="mb-6">
            <label 
              htmlFor="fullName" 
              className="block mb-2 text-sm font-medium text-text-light dark:text-text-dark"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              id="fullName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors duration-200"
          >
            Simpan Perubahan
          </button>

          {successMessage && (
            <p className="text-success text-center mt-4 text-sm">
              {successMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;