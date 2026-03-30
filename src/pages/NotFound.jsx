import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      
      <h1 className="text-6xl font-bold text-blue-500 mb-4">404</h1>
      
      <h2 className="text-2xl font-semibold mb-2">
        Oops! Page Not Found
      </h2>

      <p className="text-gray-600 mb-6">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;