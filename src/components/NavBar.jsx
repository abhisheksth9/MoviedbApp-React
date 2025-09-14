import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/search/${encodeURIComponent(searchQuery)}`);
    setSearchQuery(""); // clear input
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold tracking-wide">
        <Link to="/" className="hover:text-yellow-400 transition">
          Movie App
        </Link>
      </div>

      {/* Nav Links */}
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-yellow-400 transition">
          Home
        </Link>
        <Link to="/Profile" className="hover:text-yellow-400 transition">
          Profile
        </Link>
        <Link to="/SignIn" className="hover:text-yellow-400 transition">
          Sign In
        </Link>
        <Link to="/SignUp" className="hover:text-yellow-400 transition">
          Sign Up
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center border border-yellow-400 px-3 py-1 rounded-lg bg-gray-800"
        >
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-white outline-none placeholder-gray-400 w-40 sm:w-64"
          />
          <button
            type="submit"
            className="ml-2 text-yellow-400 hover:text-yellow-500 transition"
          >
            🔍
          </button>
        </form>
      </div>
    </nav>
  );
}

export default NavBar;
