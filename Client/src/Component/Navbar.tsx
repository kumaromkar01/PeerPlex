import { useNavigate } from "react-router-dom";
import {UserCircleIcon} from '@heroicons/react/24/solid'


function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="bg-black text-white px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-6 w-fit">
        <h1 className="md:text-xl text-sm font-bold tracking-wide">PeerPlex</h1>
      </div>

      <div className="flex gap-3">
        <button
          onClick={()=>navigate('/allBooks')}
          className=" hover:bg-blue-700  text-white py-1 px-2 rounded-md text-sm "
        >
          Explore
        </button>
        <button
          onClick={()=>navigate('/add-book')}
          className=" hover:bg-blue-700  text-white px-2 py-1 rounded-md text-sm "
        >
          Add Resource
        </button>
        <button>
          <UserCircleIcon className="w-10 h-10"/>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
