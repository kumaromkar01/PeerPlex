import {
  HeartIcon,
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBooks, getUploads } from '../Services/api';
import toast from 'react-hot-toast';

interface Props {
  types: 'all' | 'uploads' | 'liked';
}

const AllBooks = ({ types }: Props) => {
  const navigate = useNavigate();
  const [resources, setResources] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  // const limit = 9;
  const totalPages = Math.ceil(totalBooks / 9);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (types === 'all') {
          const res = await getBooks(page,9); // ✅ Use correct page
          setResources(res.data.books);
          setTotalBooks(res.data.count);
        } 
        else if(types==='uploads'){
          const token = localStorage.getItem('token');
          const res = await getUploads(token as string);
          setResources(res.data.uploads);
          setTotalBooks(res.data.uploads.length);
        }
        else {
          setResources([]);
        }
      } catch (err) {
        console.error('Failed to fetch books:', err);
        toast.error(err as string);
      }
    };

    fetchBooks();
  }, [types, page]);

  return (
    <div className="bg-gray-900 min-h-screen p-8 lg:col-span-2 col-span-3">
      <div className="flex justify-between m-3 text-pink-500">
        <button className="text-md">All Books</button>
        <button onClick={() => navigate(-1)} className="text-md">
          &larr; Back
        </button>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div
            key={resource._id}
            className="bg-white/10 text-white p-1 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-4 pb-0 text-center">
              <p className="text-sm font-medium mb-1">
                {resource.user?.name || 'Unknown'}
              </p>
              <h3 className="font-semibold text-md leading-tight">
                {resource.title}
              </h3>
            </div>
            <img
              src={resource.image}
              alt={resource.title}
              className="w-full h-48 object-contain mt-3"
            />
            <div className="p-4 pt-2 text-sm text-center text-gray-300">
              <p>{resource.desc}</p>
            </div>
            <div className="px-4 pb-4 flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <HeartIcon className="h-4 w-4 text-red-500" />
                  {resource.likes}
                </span>
                <span className="flex items-center gap-1">
                  <ChatBubbleLeftEllipsisIcon className="h-4 w-4 text-blue-500" />
                  {resource.reviews?.length || 0}
                </span>
              </div>
              <button className="text-blue-400 font-medium hover:underline">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-3 mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`px-3 py-1 rounded text-sm 
      ${page === 1 ? 'bg-gray-500 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          Prev
        </button>

        <span className="text-white text-sm">
          {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className={`px-3 py-1 rounded text-sm 
      ${page === totalPages ? 'bg-gray-500 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          Next
        </button>
      </div>


    </div>
  );
};

export default AllBooks;
