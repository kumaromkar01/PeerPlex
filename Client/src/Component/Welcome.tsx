
interface props{
  name : string
}
export default function WelcomeBanner({name}:props) {
  return (
    <div className="flex justify-between min-w-full rounded-xl p-8 bg-gradient-to-r from-indigo-900 via-purple-900 to-gray-900 text-white shadow-lg mx-auto">
      <div >
      <h1 className="text-2xl font-bold mb-2">
        Welcome back, {name}!
      </h1>
      <p className="text-gray-300 mb-6">
        Discover thousands of books and PDFs, tailored just for you. Dive into new topics or revisit your favorites!
      </p>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition">
        Explore New Resources
      </button>
    </div>
    <div>

    </div>
    <div>
      
    </div>
    </div>
    
  );
}
