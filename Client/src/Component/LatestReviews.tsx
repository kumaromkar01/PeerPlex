import { useState,useEffect } from "react";
import { getLatestReviews } from "../Services/api";
import { useNavigate } from "react-router-dom";
const LatestReviews = () => {
  const [reviews, setReviews] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getLatestReviews();
        setReviews(res.data);
      } catch (err) {
        console.error("Failed to fetch latest reviews:", err);
      }
    };

    fetchReviews();
  }, []);
  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Latest Reviews</h2>
        <a href="#" className="text-sm text-blue-600 hover:underline">
          View All
        </a>
      </div>

      <div className="space-y-4">
        {reviews.map((review:any) => (
          <div
            onClick={()=>{navigate(`/book/${review.book._id}`)}}
            key={review._id}
            className="bg-gray-50 p-3 rounded-lg shadow-sm hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-3 mb-2">
              <img
                src={`https://ui-avatars.com/api/?name=${review.username}`}
                alt={review.username}
                className="w-8 h-8 rounded-full object-cover"
              />
              <p className="font-semibold text-sm text-gray-800">{review.username}</p>
              <p>{review.book.title}</p>
            </div>
            <p className="text-sm text-gray-700 line-clamp-2">{review.comment  }</p>
            <p className="text-xs text-gray-400 mt-2">{new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestReviews;
