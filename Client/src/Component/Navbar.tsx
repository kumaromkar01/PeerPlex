import { useNavigate } from "react-router-dom";
import { UserCircleIcon } from '@heroicons/react/24/solid'
import {  useState } from "react";

interface props {
  name : string,
  email : string,
}
function Navbar({name,email}:props) {
  const navigate = useNavigate();
  const [display, setDisplay] = useState(false);
  
  return (
    <nav className="bg-black text-white px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-6 w-fit">
        <h1 className="md:text-xl text-sm font-bold tracking-wide">PeerPlex</h1>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => navigate('/allBooks')}
          className="hover:bg-blue-700 text-white py-1 px-2 rounded-md text-sm"
        >
          Explore
        </button>
        <button
          onClick={() => navigate('/add-book')}
          className="hover:bg-blue-700 text-white px-2 py-1 rounded-md text-sm"
        >
          Add Resource
        </button>

        <div >
          <button onClick={() => setDisplay(!display)}>
            <UserCircleIcon className="w-10 h-10" />
          </button>

          {display && (
            <div className="absolute right-0 mt-2 w-48 bg-green-700 text-white rounded-md shadow-lg z-50 p-4">
              <p className="font-semibold text-center ">{name}</p>
              <p className="text-sm  mb-2 text-center">{email}</p>
              <button
                className=" hover:text-red-800 bg-white/30 w-[100%] p-1 text-sm font-medium"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
