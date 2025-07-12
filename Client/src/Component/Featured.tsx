
import {
  HeartIcon,
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/react/24/solid';

const resources = [
  {
    id: 1,
    title: "The Algorithm's Art",
    author: 'Alex Morgan',
    image: '/images/resource1.jpg',
    description: 'An in-depth look into the idea.',
    likes: 125,
    reviews: 132,
  },
  {
    id: 2,
    title: 'Quantum Computing for Beginners',
    author: 'Dr. Evelyn Reed',
    image: '/images/resource2.jpg',
    description: 'Demystifying the complex world of QC.',
    likes: 98,
    reviews: 95,
  },
  {
    id: 3,
    title: 'Sustainable Living Handbook',
    author: 'Maria Lopez',
    image: '/images/resource3.jpg',
    description: 'A comprehensive guide to eco-friendly habits.',
    likes: 210,
    reviews: 148,
  },
  {
    id: 4,
    title: 'Mindfulness in the Digital Age',
    author: 'Sophia Miller',
    image: '/images/resource4.jpg',
    description: 'Strategies for cultivating balance.',
    likes: 187,
    reviews: 190,
  },
  {
    id: 5,
    title: 'Introduction to Blockchain Technology',
    author: 'Tom Green',
    image: '/images/resource5.jpg',
    description: 'A foundational text for newcomers.',
    likes: 172,
    reviews: 211,
  },
  {
    id: 6,
    title: 'The Art of Data Visualization',
    author: 'Sarah Kim',
    image: '/images/resource6.jpg',
    description: 'Learn how to transform complex data.',
    likes: 155,
    reviews: 155,
  },
];

const Featured = () => {
  return (

    
    <div className="bg-gray-900 min-h-screen p-8 lg:col-span-2 col-span-3">
      <div className='flex justify-between m-3 text-pink-500'>
        <button className='text-md'>Featured Resources</button>
        <button className='text-md'>View All  &#8594;</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-4 pb-0">
              <p className="text-sm text-gray-500 font-medium mb-1">
                {resource.author}
              </p>
              <h3 className="font-semibold text-lg text-gray-800 leading-tight">
                {resource.title}
              </h3>
            </div>
            <img
              src={resource.image}
              alt={resource.title}
              className="w-full h-48 object-cover mt-3"
            />
            <div className="p-4 pt-2 text-sm text-gray-600">
              <p>{resource.description}</p>
            </div>
            <div className="px-4 pb-4 flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <HeartIcon className="h-4 w-4 text-red-500" />
                  {resource.likes}
                </span>
                <span className="flex items-center gap-1">
                  <ChatBubbleLeftEllipsisIcon className="h-4 w-4 text-blue-500" />
                  {resource.reviews}
                </span>
              </div>
              <button className="text-blue-600 font-medium hover:underline">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
