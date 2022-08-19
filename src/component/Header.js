import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  return (
    <header>
      <img
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="profile-icon"
      />

      <img
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="profile-icon"
      />

      <h1 data-testid="page-title">Title</h1>

    </header>

  );
}

export default Header;
