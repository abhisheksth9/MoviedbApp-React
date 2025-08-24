import { Link } from "react-router-dom";
import '../css/Navbar.css'

function NavBar() {
    return <nav className="navbar">
        <div className="navbar-logo">
            <Link to="/">Movie App</Link>
        </div>
        <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/Profile">Profile</Link>
        </div>
    </nav>
}

export default NavBar