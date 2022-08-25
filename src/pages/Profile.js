import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('user')) return localStorage.setItem('user', '');
    const emailObj = localStorage.getItem('user');
    const user = JSON.parse(emailObj);
    setEmail(user.email);
  }, []);

  return (
    <div>
      <Header title="Profile" />
      <div>
        <h2 data-testid="profile-email">{email}</h2>
        <a href="/done-recipes">
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Done Recipes
          </button>
        </a>
        <a href="/favorite-recipes">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </button>
        </a>
        <button
          type="button"
          data-testid="profile-logout-btn"
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}
