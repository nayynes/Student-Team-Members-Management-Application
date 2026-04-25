import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/add", label: "Add Member" },
    { to: "/members", label: "Members" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-brand-icon">👥</div>
        <span>TeamHub</span>
      </div>

      <div className="navbar-links">
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`navbar-link ${location.pathname === to ? "active" : ""}`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;