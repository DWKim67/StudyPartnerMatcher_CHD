"use client"
// app/page.tsx

export default function SignUpPage() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Sign Up</h2>
          
          {/* Username Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Preferred Name (Username)</label>
            <input
              type="text"
              placeholder="Enter username"
              required
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
  
          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              required
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
  
          {/* Profile Picture Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Profile Picture (Optional)</label>
            <input
              type="file"
              className="w-full mt-1 text-sm text-gray-500"
            />
          </div>
  
          {/* Submit Button */}
          <button
            type="button"
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
          >
            Create Account
          </button>
        </div>
      </div>
    );
}
