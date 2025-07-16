import {
  BookOpenIcon,
  HandThumbUpIcon,
  ChatBubbleLeftEllipsisIcon,
  UsersIcon,
} from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { getInsight } from '../Services/api';

const InsightsAtGlance = () => {
  const [uploads, setUploads] = useState<number>(0);
  const [users, setUsers] = useState<number>(0);
  const [reviews, setReviews] = useState<number>(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await getInsight();
        const { bookCnt, userCnt, reviewCnt } = res.data;

        // Ensure primitive values are set
        setUploads(typeof bookCnt === 'number' ? bookCnt : 0);
        setUsers(typeof userCnt === 'number' ? userCnt : 0);
        setReviews(typeof reviewCnt === 'number' ? reviewCnt : 0);
      } catch (error) {
        console.error('Failed to fetch insights:', error);
      }
    })();
  }, []);

  const stats = [
    {
      icon: <BookOpenIcon className="h-6 w-6 text-pink-500" />,
      label: 'Total Uploads',
      value: uploads,
    },
    {
      icon: <HandThumbUpIcon className="h-6 w-6 text-pink-500" />,
      label: 'Total Likes Received',
      value: '3,567', // hardcoded — update if dynamic in the future
    },
    {
      icon: <ChatBubbleLeftEllipsisIcon className="h-6 w-6 text-pink-500" />,
      label: 'Total Reviews Posted',
      value: reviews,
    },
    {
      icon: <UsersIcon className="h-6 w-6 text-pink-500" />,
      label: 'Active Users Today',
      value: users,
    },
  ];

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white/10 p-4 rounded-xl flex items-center space-x-4 shadow-md"
          >
            <div className="p-3 bg-white/20 rounded-full">{item.icon}</div>
            <div>
              <p className="text-sm text-white/70">{item.label}</p>
              <p className="text-xl font-semibold text-white">{String(item.value)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsAtGlance;
