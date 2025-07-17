import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { CalendarDaysIcon } from "@heroicons/react/16/solid";

const BookDetailsPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState<any>(); // Replace `any` with a type if available
    const navigate = useNavigate();
    const [comment, setComment] = useState<any>();
    const baseurl = import.meta.env.VITE_API_URL??"http://localhost:5000";
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`${baseurl}/api/book/details/${id}`);
                console.log(res);
                setBook(res.data.book);
            } catch (err) {
                console.error("Error fetching book", err);
            }
        };

        fetchBook();
    }, [id]);

    const handleReview = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error("You must be logged in to add a review.");
                return;
            }

            if (!comment || comment.trim() === '') {
                toast.error("Comment cannot be empty.");
                return;
            }

            const res = await axios.post(
                `${baseurl}/api/book/addreview/${id}`,
                { comment },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            setBook((prev: any) => ({
                ...prev,
                reviews: [...prev.reviews, res.data],
            }));
            toast.success("Review added successfully!");

        } catch (error: any) {
            console.error("Error adding review:", error);
            toast.error(
                error.response?.data?.msg || "Failed to add review. Please try again."
            );
        }
    };




    if (!book) return <div className="min-h-screen flex justify-center items-center"><div className="w-52 h-52 border-2 border-yellow-400 animate-bounce rounded-full"></div></div>
    return (
        <div className="p-6 max-w-6xl mx-auto text-gray-800 font-sans space-y-10">
            <div className="flex flex-col md:flex-row gap-8">

                {/* Book Image & PDF Link */}
                <div className="w-full md:w-[35%] bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center space-y-5 hover:shadow-2xl transition-shadow duration-300">
                    <div className="w-4/5 aspect-[3/4] rounded-xl overflow-hidden shadow-md">
                        <img
                            src={book.image}
                            alt="Book cover"
                            className="w-full h-full object-cover rounded-xl transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                    <a
                        href={book.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm font-semibold py-2 px-5 rounded-full shadow hover:opacity-90 transition-all duration-300"
                    >
                        &#128212; Read Book PDF
                    </a>
                </div>

                {/* Book Details */}
                <div className="relative w-full md:w-2/3 bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
                        title="Go Back"
                    >
                        &#9587;
                    </button>

                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{book.title}</h1>
                        <p className="text-gray-600 text-base leading-relaxed">{book.desc}</p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600 mt-6 border-t pt-4">
                        <span className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full shadow-sm">
                            <CalendarDaysIcon className="w-5 h-5"/> <strong>Published:</strong>{" "}
                            {new Date(book.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </span>

                        <div className="text-right text-sm leading-snug">
                            <p className="font-semibold text-gray-800">Uploaded by</p>
                            <p>{book.user.name}</p>
                            <p className="text-gray-500 text-xs">{book.user.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white shadow-md p-6 rounded-lg mt-8">
                <h2 className="text-xl font-bold mb-2">Customer Reviews</h2>
                <p className="text-gray-600 mb-4">Read what others are saying about this book.</p>
                <div className="mb-6">
                    <p className="text-sm text-gray-500">{`${book.reviews.length} reviews`}</p>
                </div>
                <ul className="space-y-4">
                    {book.reviews.map((review: any, i: number) => (
                        <li key={i} className="border-t pt-4">
                            <p className="font-semibold">{review.username}</p>
                            <p className="text-gray-600 italic">{review.comment}</p>
                            <p className="text-xs text-gray-400 mt-1">
                                {new Date(review.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Add Review Section */}
            <div className="bg-white shadow-md p-6 rounded-lg mt-8">
                <h2 className="text-xl font-bold mb-4">Add Your Review</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleReview();
                    }}
                    className="space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium mb-1">Your Review</label>
                        <input
                            onChange={(e) => setComment(e.target.value)}
                            type="text"
                            max="5"
                            min="1"
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
                    >
                        Submit Review →
                    </button>
                </form>
            </div>
        </div>

    );
};

export default BookDetailsPage;
