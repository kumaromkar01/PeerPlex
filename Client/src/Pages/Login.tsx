import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <form className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login to Your Account</h2>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
