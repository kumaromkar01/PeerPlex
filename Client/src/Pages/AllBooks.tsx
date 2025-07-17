import {
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
    <div className="bg-[#3f29ed33] min-h-screen p-8 lg:col-span-2 col-span-3">
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
              onClick={() => navigate(`/book/${resource._id}`)}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition hover:shadow-xl p-3"
            >
              
              {/* Image Section */}
              <div className="w-full h-60 bg-white p-1">
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-full object-contain rounded-md"
                />
              </div>

              {/* Content Area */}
              <div className="p-1 space-y-2">

                <h3 className="font-semibold text-lg text-gray-900 text-center">
                  {resource.title}
                </h3>

                <p className="text-sm text-gray-600 leading-snug text-center">
                  {resource.desc.split(" ").slice(0, 6).join(" ")}...
                </p>
                <div className="flex flex-row items-center justify-between gap-2 mt-1 text-center">
                {/* Avatar and Name */}
                <div className="flex items-center gap-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(resource.user?.name || "Anonymous")}&background=0D8ABC&color=fff&size=32`}
                    alt="Avatar"
                    className="w-5 h-5 rounded-full shadow"
                  />
                  <span className="text-sm font-semibold text-gray-800">
                    {(resource.user?.name?.toUpperCase()) || "ANONYMOUS"}
                  </span>
                </div>

                {/* Contact Info */}
                <div className="text-sm text-gray-600">
                  {resource?.user?.email
                    ? `${resource.user.email}`
                    : "No Contact Info Available"}
                </div>
              </div>
              <hr className="my-4 border-t border-gray-300 w-full" />

                <div className="flex items-center justify-between text-sm text-gray-500 pt-2">
                  <span className="flex items-center gap-1">
                    <ChatBubbleLeftEllipsisIcon className="h-4 w-4 text-blue-500" />
                    {resource.reviews?.length ?? 0}
                  </span>
                  <span className="text-blue-600 font-medium hover:underline">
                    View
                  </span>
                </div>
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
