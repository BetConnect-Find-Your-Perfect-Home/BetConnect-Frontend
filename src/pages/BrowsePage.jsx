import React, { useState } from 'react';
import "../app.css";

const BrowsePage = () => {
  
  const [price, setPrice] = useState(12700000);

  const houses = []; 

  return (
    <div style={{width: '100vw'}}>
      <nav className="nav-fixed">
        <div className="nav-logo">BetConnect</div>
        <div className="nav-links"><a href="/browse"> Home Browse</a></div>
      </nav>

      <div className="browse-page-wrapper">
        
        <aside className="sidebar-filters">
          <h3>Filters</h3>
          
          <div className="filter-item">
            <label>Listing Type</label>
            <select><option>All</option><option>For Sale</option><option>For Rent</option></select>
          </div>

          <div className="filter-item">
            <label>Property Type</label>
            <select>
              <option>All Types</option>
              <option>House</option>
              <option>Apartment</option>
              <option>Villa</option>
              <option>Commercial</option>
            </select>
          </div>

          
          <div className="filter-item">
            <label style={{textDecoration: 'underline', fontWeight: 'bold'}}>Price Range</label>
            <div style={{fontSize: '0.85rem', margin: '10px 0', color: '#475569'}}>
              0 - {Number(price).toLocaleString()} ETB
            </div>
            <div className="slider-container">
              <input 
                type="range" 
                className="figma-rate-slider" 
                min="0" 
                max="30000000" 
                step="100000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="filter-item">
            <label>Location</label>
            <select><option>All Subcities</option><option>Bole</option><option>Yeka</option><option>Arada</option></select>
          </div>

          <div className="filter-item">
            <label>Bedrooms</label>
            <select><option>Any</option><option>2+</option><option>3+</option><option>4+</option></select>
          </div>

          
          <div className="filter-item">
            <label>Size (m²)</label>
            <select><option>Any</option><option>100+m²</option><option>200+m²</option><option>500+m²</option></select>
          </div>

          <button style={{width: '100%', background: '#f97316', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'}}>
            Apply Filter
          </button>
        </aside>

        
        <main className="property-main-content">
          <div className="property-grid-display">
            {houses.length > 0 ? (
              houses.map((house) => (
                <div key={house.id} className="card-ui">
                  <img src={house.img} alt="Property" />
                  <div className="card-details">
                    <p className="price" style={{color: '#f97316', fontWeight: '800'}}>
                      {Number(house.price).toLocaleString()} ETB
                    </p>
                    <h4 className="title">{house.title}</h4>
                    <p style={{color: '#64748b'}}>📍 {house.loc}</p>
                    <button className="lock-btn">Login to view contact</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="loading-message">
                <p>Connecting to database... No properties to display yet.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BrowsePage;