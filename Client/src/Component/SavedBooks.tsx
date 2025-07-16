
import { BookmarkIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUploads } from '../Services/api';
import toast from 'react-hot-toast';


interface book {
  _id : string,
  title: string,
  desc: string
}
const SavedBooks = () => {
  const navigate = useNavigate();
  const [UploadedBooks, setUploads] = useState([]);
  useEffect(() => {
    try {
      (async () => {
        const token = localStorage.getItem('token') as string;
        const res = await getUploads(token);
        setUploads(res.data.uploads);
      })()
    } catch (error) {
      toast.error(error as string);
    }

  }, [])
  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">My Uploads </h2>
        <Link to='/uploads' className="text-sm text-blue-600 hover:underline">
          View All
        </Link>
      </div>
      <ul className="space-y-3">
        {UploadedBooks.length==0?
        <div className='text-center'>No book uploaded</div>:  
        UploadedBooks.map((book : book, index) => (
          <li key={index} onClick={()=>{navigate(`/book/${book._id}`)}} className="flex items-center justify-between text-sm text-gray-700 hover:text-black">
            <div  className="flex items-center gap-2">
              <BookmarkIcon className="h-4 w-4 text-gray-400" />
              <span>{book.title}</span>
            </div>
            <ChevronRightIcon className="h-4 w-4 text-gray-400" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedBooks;
