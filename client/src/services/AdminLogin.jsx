import React, { useState } from 'react';

const DoctorsLogin = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">{isSignUp ? 'Sign Up' : 'Sign In'} as Admin</h2>
        <form>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input type="password" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
          )}
          <button type="submit" className="w-full mt-4 p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <p className="text-center">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button onClick={toggleForm} className="text-blue-600 hover:underline">
            {isSignUp ? ' Sign In' : ' Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default DoctorsLogin;