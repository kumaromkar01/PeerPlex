
import { BookmarkIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const savedBooks = [
  'The Future of Human-AI Interaction',
  'Mastering React Hooks',
  'The Science of Sleep',
  'Global Climate Change: A Data-Driven Approach',
  'Effective Public Speaking',
];

const SavedBooks = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">My Uploads </h2>
        <Link to='/uploads' className="text-sm text-blue-600 hover:underline">
          View All
        </Link>
      </div>
      <ul className="space-y-3">
        {savedBooks.map((book, index) => (
          <li key={index} className="flex items-center justify-between text-sm text-gray-700 hover:text-black">
            <div className="flex items-center gap-2">
              <BookmarkIcon className="h-4 w-4 text-gray-400" />
              <span>{book}</span>
            </div>
            <ChevronRightIcon className="h-4 w-4 text-gray-400" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedBooks;
