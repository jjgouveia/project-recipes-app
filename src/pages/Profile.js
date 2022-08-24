import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const emailObj = localStorage.getItem('user');
  const user = JSON.parse(emailObj);

  return (
    <div>
      <Header title="Profile" />
      <div>
        <h2 data-testid="profile-email">{user.email}</h2>
        <button type="button" data-testid="profile-done-btn">Done Recipes</button>
        <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
        <button type="button" data-testid="profile-logout-btn">Logout</button>
      </div>
      <Footer />
    </div>
  );
}
