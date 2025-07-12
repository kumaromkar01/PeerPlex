
import {
  BookOpenIcon,
  HandThumbUpIcon,
  ChatBubbleLeftEllipsisIcon,
  UsersIcon,
} from '@heroicons/react/24/solid';

const stats = [
  {
    icon: <BookOpenIcon className="h-6 w-6 text-pink-500" />,
    label: 'Total Uploads',
    value: '124',
  },
  {
    icon: <HandThumbUpIcon className="h-6 w-6 text-pink-500" />,
    label: 'Total Likes Received',
    value: '3,567',
  },
  {
    icon: <ChatBubbleLeftEllipsisIcon className="h-6 w-6 text-pink-500" />,
    label: 'Total Reviews Posted',
    value: '89',
  },
  {
    icon: <UsersIcon className="h-6 w-6 text-pink-500" />,
    label: 'Active Users Today',
    value: '1,200+',
  },
];

const InsightsAtGlance = () => {
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
              <p className="text-xl font-semibold text-white">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsAtGlance;
