import React, { useEffect, useState } from 'react';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
    isDisabled: true,
  });

  useEffect(() => {
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

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUser({ ...user, [name]: value });
  };

  return (
    <form>
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
        type="button"
        data-testid="login-submit-btn"
        disabled={ user.isDisabled }
        // onClick={ handleClickSubmit }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
