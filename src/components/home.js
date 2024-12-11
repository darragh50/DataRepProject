import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  //Navigation
  const navigate = useNavigate(); 

  const handleExploreClick = () => {
      navigate('/read'); 
  };

  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Welcome to My Recipe App</h1>
        <p>Discover, create, and share your favorite recipes!</p>
        <button className="explore-button" onClick={handleExploreClick}>Explore Recipes</button>
      </header>

      <section className="features">
        <div className="feature-card">
          <h3>Discover</h3>
          <p>Browse through a variety of recipes tailored to your taste.</p>
        </div>
        <div className="feature-card">
          <h3>Create</h3>
          <p>Add and organize your own recipes for easy access.</p>
        </div>
        <div className="feature-card">
          <h3>Share</h3>
          <p>Share your favorite recipes with friends and family.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
