
import {
  HeartIcon,
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBooks } from '../Services/api';


const Featured = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState<any[]>([]);

  useEffect(() => {
    try {
      (async()=>{
        const res = await getBooks(1,6);
        setResources(res.data.books);
      })()
    } catch (error) {
      
    }
  }, []);
return (


  <div className="bg-gray-900 min-h-screen p-8 lg:col-span-2 col-span-3">
    <div className='flex justify-between m-3 text-pink-500'>
      <button className='text-md'>Featured Resources</button>
      <button onClick={() => (navigate('/allBooks'))} className='text-md'>View All  &#8594;</button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2   gap-6">
      {resources.map((resource) => (
        <div
          key={resource._id}
          className="bg-white/10 text-white p-1 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-4 pb-0  text-center">
            <p className="text-sm  font-medium mb-1">
              {resource.user?.name|| "unanimous"}
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
          <div className="p-4 pt-2 text-sm text-center text-gray-600">
            <p>{resource.desc}</p>
          </div>
          <div className="px-4 pb-4 flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <HeartIcon className="h-4 w-4 text-red-500" />
                {resource.likes}
              </span>
              <span className="flex items-center gap-1">
                <ChatBubbleLeftEllipsisIcon className="h-4 w-4 text-blue-500" />
                {resource.reviews?.length | 0}
              </span>
            </div>
            <button className="text-blue-600 font-medium hover:underline">
              View 
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default Featured;
