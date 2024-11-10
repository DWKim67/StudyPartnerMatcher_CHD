"use client"
import React, { useState } from 'react';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState<File | null>(null);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfilePic(e.target.files[0]);
    }
  };

  const handleSignUp = () => {
    console.log('Sign-Up Data:', { username, password, profilePic });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      
      {/* Username Input */}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
      />

      {/* Password Input */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
      />

      {/* Profile Picture Upload */}
      <input
        type="file"
        onChange={handleProfilePicChange}
      />

      {/* Sign Up Button */}
      <button onClick={handleSignUp}>Create Account</button>
    </div>
  );
};

export default SignUp;
