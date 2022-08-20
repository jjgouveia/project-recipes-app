import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title }) {
  return (
    <header>
      <Link to="/profile">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Ícone do perfil"
        />
      </Link>
      {(title !== 'Profile'
      && title !== 'Done Recipes'
      && title !== 'Favorite Recipes')
      && <img
        src={ searchIcon }
        data-testid="search-top-btn"
        alt="Ícone de pesquisa"
      />}
      <h1 data-testid="page-title">{title}</h1>
    </header>
  );
}

export default Header;

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;
