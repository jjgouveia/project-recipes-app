import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

export default function Profile() {
  const { login } = useContext(AppContext);
  return (
    <div>
      <Header title="Profile" />
      <div>
        <h2 data-testid="profile-email">{ login }</h2>
        <a href="/done-recipes">
          <button type="button" data-testid="profile-done-btn">Done Recipes</button>
        </a>
        <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
        <button type="button" data-testid="profile-logout-btn">Logout</button>
      </div>
      <Footer />
    </div>
  );
}
