import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../Services/api";
import toast from "react-hot-toast";

function Login() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  async function handleLogin(): Promise<void> {
    try {
      setloading(true);
      const res = await login(email.current?.value as string, password.current?.value as string);
      const token = res.data.token;
      localStorage.setItem('token', token);
      navigate('/');
    } catch (error) {
      toast.error(`${error}`);
    }
    finally {
      setloading(false);
    }


  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <form onSubmit={(e) =>{e.preventDefault();handleLogin();} } className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login to Your Account</h2>

        <div className="mb-4">
          <input
            ref={email}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-center flex justify-center"
        >
          {loading ? <div
            className="w-5 h-5 border-2 border-white  rounded-3xl animate-bounce"
          ></div>
            : 'Login'
          }
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
