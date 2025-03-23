// src/pages/SignInPage.jsx
import React from 'react';
import { SignIn } from '@clerk/clerk-react';

function SignInPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
        <SignIn />
    </div>
  );
}

export default SignInPage;