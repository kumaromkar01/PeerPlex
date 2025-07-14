import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AddBook() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);

    // Simulated logged-in user
    const uploadedBy = 'omkar@domain.com';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // TODO: You can replace this with actual API call
        console.log({
            title,
            description,
            image,
            uploadedBy,
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg space-y-6"
            >
                <div  className='flex justify-between'>
                    <h6 className="text-md font-bold text-pink-900">Add a New Book</h6>
                    <Link to={'/'}className="text-md font-bold text-pink-900">&larr; Back</Link>
                </div>

                {/* Title */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Book Title</label>
                    <input
                        type="text"
                        placeholder="Enter book title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">One-line Description</label>
                    <input
                        type="text"
                        placeholder="Write a short description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Uploaded By (read-only) */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Uploaded By</label>
                    <input
                        type="text"
                        value={uploadedBy}
                        disabled
                        className="w-full px-4 py-2 border bg-gray-100 rounded-md text-gray-600 cursor-not-allowed"
                    />
                </div>

                {/* Upload Image */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Book Cover Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Upload Book
                </button>
            </form>
        </div>
    );
}

export default AddBook;
