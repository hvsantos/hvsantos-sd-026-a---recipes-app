import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { saveItem } from '../components/localStorage';

const NUMBER6 = 6;

function Login() {
  const [login, setInput] = useState({ userEmail: '', password: '' });
  const [isBtnDisabled, setBtnDisable] = useState(true);
  const history = useHistory();

  const handleChange = ({ target }) => {
    setInput({ ...login, [target.name]: target.value });
  };

  useEffect(() => {
    const validEmail = login.userEmail.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
    const validLogin = validEmail && login.password.length > NUMBER6;
    setBtnDisable(!validLogin);
    console.log(validEmail);
  }, [login]);

  const handleSubmit = () => {
    saveItem('user', { email: login.userEmail });
    history.push('/meals');
  };

  return (
    <div>
      <div>
        <input
          type="email"
          name="userEmail"
          value={ login.userEmail }
          onChange={ handleChange }
          data-testid="email-input"
        />
        <input
          type="password"
          name="password"
          value={ login.password }
          onChange={ handleChange }
          data-testid="password-input"
        />
        <button
          type="button"
          onClick={ handleSubmit }
          data-testid="login-submit-btn"
          disabled={ isBtnDisabled }
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
