
const reviews = [
  {
    id: 1,
    name: 'Alice Wonderland',
    avatar: '/avatars/alice.jpg',
    text: "Absolutely fantastic! 'The Algorithm’s Art' opened my eyes to a whole new dimension of creativity. Highly",
    time: '2 hours ago',
  },
  {
    id: 2,
    name: 'Bob The Builder',
    avatar: '/avatars/bob.jpg',
    text: 'Quantum Computing for Beginners is surprisingly accessible. I finally feel like I understand the basics. Some',
    time: '1 day ago',
  },
  {
    id: 3,
    name: 'Charlie Chaplin',
    avatar: '/avatars/charlie.jpg',
    text: 'The Sustainable Living Handbook is a game-changer! Practical tips and inspiring ideas. My family has already',
    time: '3 days ago',
  },
  {
    id: 4,
    name: 'Diana Prince',
    avatar: '/avatars/diana.jpg',
    text: 'Mindfulness in the Digital Age provided much-needed strategies. It’s challenging to stay focused, but the',
    time: '5 days ago',
  },
];

const LatestReviews = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mt-5 w-full max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Latest Reviews</h2>
        <a href="#" className="text-sm text-blue-600 hover:underline">
          View All
        </a>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-gray-50 p-3 rounded-lg shadow-sm hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-3 mb-2">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <p className="font-semibold text-sm text-gray-800">{review.name}</p>
            </div>
            <p className="text-sm text-gray-700 line-clamp-2">{review.text}</p>
            <p className="text-xs text-gray-400 mt-2">{review.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestReviews;
