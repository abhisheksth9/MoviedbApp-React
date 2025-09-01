import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <div className="text-xl font-bold">
        <Link to="/" className="hover:text-yellow-400 transition">
          Movie App
        </Link>
      </div>

      {/* Links */}
      <div className="flex gap-6">
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
      </div>
    </nav>
  )
}

export default NavBar
