import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signup } from "../Services/api";
function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conf, setConf] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSignup = async () => {
    try {
      setLoading(true);
      if (!name || !email || !password || !conf) {
        throw new Error('all feilds mandatory');
        return;
      }

      if (conf != password) {
        throw new Error('password and confirm password not matching ');
      }

      const res = await signup(name, email, password);
      localStorage.setItem('token', res.data.token as string);
      navigate('/');

    } catch (error) {
      toast.error(error as string);
    }
    finally {
      setLoading(false);
    }

  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Account</h2>

        <div className="mb-4">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <input
            onChange={(e) => setConf(e.target.value)}
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 flex justify-center"
        >
          {loading ?
            <div className="w-5 h-5 rounded-full border-2 animate-spin border-white"></div>
            :
            "Sign Up"
          }
        </button>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Login 
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
