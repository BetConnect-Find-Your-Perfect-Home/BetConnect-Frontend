import React from "react";
import { useNavigate } from "react-router-dom";
import "../app.css";

const LandingPage = () => {
  const navigate = useNavigate();

  
  const featuredProperties = [];

  return (
    <div className="landing-wrapper">
     
      <nav className="nav-container">
        <button className="betconnect-btn">BetConnect</button>
        <div className="nav-links">
          <a href="/browse">Browse Properties</a>
          <a href="/login">Login</a>
          <a href="/signup">Sign Up</a>
        </div>
      </nav>

      
      <header className="landing-hero">
        <div className="hero-text">
          <h1>Find Your Perfect Home In Addis</h1>
          <p>Modern real estate marketplace connecting you with trusted agents across Ethiopia</p>
        </div>
        <div className="search-bar-landing">
          <input type="text" placeholder="Location (e.g. Bole)" />
          <div className="search-input-group">
            <select className="type-select">
              <option value="all">All Types</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>
          <button className="btn-search" onClick={() => navigate("/browse")}>Search</button>
        </div>
      </header>

      
      <section className="smart-ai-section">
        <div className="smart-ai-text">
          <h2>Smart AI Chatbot</h2>
          <p>
            Don’t want to search? Chat with our AI to find your perfect match.
            Tell us what you’re looking for, and we’ll do the work for you.
          </p>
        </div>
        <button className="smart-ai-btn">
          <span>Start Chat</span> 🤖
        </button>
      </section>

      <section className="featured-container">
        <div className="featured-top-bar">
          <div>
            <h2>Featured Properties</h2>
            <p className="featured-subtitle">Handpicked properties just for you</p>
          </div>
          <a href="/browse" className="view-all-button">View All</a>
        </div>

        <div className="property-grid">
          {featuredProperties.length > 0 ? (
            featuredProperties.map((property) => (
              <div key={property.id} className="card-ui">
                <div className={`property-tag ${property.status === 'sale' ? 'sale-tag' : 'rent-tag'}`}>
                  {property.status === 'sale' ? 'For Sale' : 'For Rent'}
                </div>
                <img src={property.img} alt={property.title} />
                <div className="card-body">
                  {/* YOUR WORK: Formatting raw numbers from backend */}
                  <p className="price">{Number(property.price).toLocaleString()} ETB</p>
                  <h4>{property.title}</h4>
                  <p className="location">📍 {property.location}</p>
                  <button className="lock-btn">Login to see contact</button>
                </div>
              </div>
            ))
          ) : (
            <p className="loading-text">Fetching featured properties from backend...</p>
          )}
        </div>
      </section>

      
      <section className="how-it-works-section">
        <h2>How BetConnect Works</h2>
        <div className="steps-wrapper">
          <div className="step-card">
            <span className="step-icon-box">🔍</span>
            <h3>Search Properties</h3>
            <p>Find your dream home using our advanced filters.</p>
          </div>
          <div className="step-card">
            <span className="step-icon-box">💬</span>
            <h3>Connect with Agents</h3>
            <p>Directly message verified agents in Ethiopia.</p>
          </div>
          <div className="step-card">
            <span className="step-icon-box">🏠</span>
            <h3>Find Your Home</h3>
            <p>Get the keys to your perfect new living space.</p>
          </div>
        </div>
      </section>

      
      <footer className="footer">
        <h2 style={{ color: "#f97316", marginBottom: "15px" }}>BetConnect</h2>
        <p style={{ opacity: 0.6 }}>© 2026 BetConnect Real Estate Marketplace.</p>
      </footer>
    </div>
  );
};

export default LandingPage;