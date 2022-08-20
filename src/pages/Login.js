import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import validator from 'email-validator';

function Login({ history }) {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [btnControl, setBtnControl] = useState(true);

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUser({ ...user, [name]: value });
  };

  const saveKeys = () => {
    if (!localStorage.getItem('user')) localStorage.setItem('user', '');
    if (!localStorage.getItem('mealsToken')) localStorage.setItem('mealsToken', '');
    if (!localStorage
      .getItem('cocktailsToken')) localStorage.setItem('cocktailsToken', '');
  };

  const setKeys = () => {
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    history.push('/foods');
    setKeys();
  };

  useEffect(() => {
    saveKeys();

    const passwordMinLength = 6;
    const verifyPassword = user.password.length > passwordMinLength;
    if (validator.validate(user.email) && verifyPassword) {
      setBtnControl(false);
    } else {
      setBtnControl(true);
    }
  }, [user.email, user.password]);

  return (
    <form onSubmit={ onSubmit }>
      <h1>Login</h1>
      <label htmlFor="email-input">
        <input
          type="email"
          data-testid="email-input"
          name="email"
          id="email-input"
          value={ user.email }
          onChange={ handleChange }
          placeholder="email"
          required
        />
      </label>

      <label htmlFor="password-input">
        <input
          type="password"
          data-testid="password-input"
          id="password-input"
          name="password"
          value={ user.password }
          onChange={ handleChange }
          placeholder="password"
          minLength="6"
          required
        />
      </label>

      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ btnControl }
      >
        Entrar
      </button>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
