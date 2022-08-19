import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Login({ history }) {
  const [user, setUser] = useState({
    email: '',
    password: '',
    isDisabled: true,
  });

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
    localStorage.setItem('mealsToken', JSON.stringify('1'));
    localStorage.setItem('cocktailsToken', JSON.stringify('1'));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    history.push('/foods');
    setKeys();
  };

  useEffect(() => {
    saveKeys();
    const verifyInputs = () => {
      const { email, password } = user;
      const verifyEmail = (/\S+@\S+\.\S+/).test(email);

      const passwordMinLength = 6;
      const verifyPassword = password.length > passwordMinLength;

      if (verifyEmail && verifyPassword) {
        setUser({ ...user, isDisabled: false });
      } else {
        setUser({ ...user, isDisabled: true });
      }
    };
    verifyInputs();
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
        disabled={ user.isDisabled }
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
