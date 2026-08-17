import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <section className="page-container">
      <div className="hero-card">
        <p className="eyebrow">SPRING SECURITY + JWT</p>

        <h1>Welcome to JWT Auth</h1>

        <p className="hero-description">
          A secure authentication application built with React and Spring
          Security.
        </p>

        <div className="hero-actions">
          <Link to="/profile" className="primary-button">
            View Profile
          </Link>

          <Link to="/admin" className="secondary-button">
            Admin Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;