import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-black">404</h1>

        <h2 className="text-3xl font-semibold mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-3 max-w-md">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-black text-white px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;