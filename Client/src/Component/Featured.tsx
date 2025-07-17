import {
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBooks } from '../Services/api';

const Featured = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getBooks(1, 6);
        setResources(res.data.books);
        console.log(res.data.books);
      } catch (error) {
        console.error("Failed to fetch books", error);
      }
    })();
  }, []);

  return (
    <div className="bg-[#3f29ed33] rounded-xl min-h-screen p-5 lg:col-span-2 col-span-3">
      <div className='flex justify-between mb-4 text-[aliceblue]'>
        <h2 className='text-xl font-bold'>Featured Resources</h2>
        <button
          onClick={() => navigate('/allBooks')}
          className='text-md text-blue-200 hover:text-white transition'
        >
          View All &rarr;
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {resources.length === 0 ? (
          <div className="w-full h-full flex flex-col justify-center items-center gap-6 py-12">
            <div className="w-52 h-52 border-4 border-yellow-400 animate-bounce rounded-full"></div>
            <p className="text-white text-lg">Nothing to display</p>
          </div>
        ) : (
          resources.map((resource) => (
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
                  {resource.desc.split(" ").slice(0, 10).join(" ")}...
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
          ))
        )}
      </div>
    </div>
  );
};

export default Featured;
