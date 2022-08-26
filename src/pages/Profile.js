import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const history = useHistory();
  const [email, setEmail] = useState('');

  function logoutUser() {
    localStorage.clear();
    history.push('/');
  }

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
          onClick={ logoutUser }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}
