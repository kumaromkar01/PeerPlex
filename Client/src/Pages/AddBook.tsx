import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function AddBook() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const baseurl = import.meta.env.URL??"http://localhost:5000";
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return alert('Please select an image');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('desc', desc);
    formData.append('email', email);
    formData.append('url', url);
    formData.append('image', image);

    try {
      const token = localStorage.getItem('token'); 
      setloading(true);
      const res = await axios.post(`${baseurl}/api/book/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token || '',
        },
      });

      toast.success(res.statusText)
      navigate(-1);
    } catch (error) {
      console.error(error);
      toast.error(error as string);
    }
    finally {
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6 bg-black text-[aliceblue]">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 w-full max-w-md rounded-xl shadow-md p-8 space-y-5"
      >
        <div className='flex justify-between'>
          <h2 className="text-3xl font-semibold  text-center">Upload Book</h2>
          <h2 onClick={()=>(navigate(-1))}className='text-blue-600 cursor-pointer'>&#10060;</h2>
        </div>

        <input
          type="text"
          placeholder="Title"
          className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <input
          type="email"
          placeholder="Your Email"
          className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Book URL"
          className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <div className="w-full">
          <label className="block mb-1">Select Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full"
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md flex justify-center items-center"
        >
          {
            loading ? <div className='w-5 h-5 border-2 border-white rounded-full animate-bounce'></div> : "Submit"
          }

        </button>
      </form>
    </div>
  );
}

export default AddBook;
