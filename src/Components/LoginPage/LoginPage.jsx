import React, { useState, useEffect } from 'react';
import {
  Form,
  Label,
  Input,
  Button,
} from '../PhoneBookField/PhonebookField.styled';
import { useDispatch, useSelector } from 'react-redux';
import authOperations from '../../redux/auth';
import NavBar from 'Components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [userData, setUserData] = useState({ email: '', password: '' });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector(state => state.auth);

  const handleInputValue = e => {
    const { name, value } = e.target;

    if (name === 'email') {
      setUserData(prevState => {
        return { ...prevState, email: value };
      });
    } else {
      setUserData(prevState => {
        return { ...prevState, password: value };
      });
    }
  };

  const handleLogin = async e => {
    e.preventDefault();
    dispatch(authOperations.logInUser(userData));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/contacts', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <NavBar>
        <h2>LoginPage</h2>
        <Form onSubmit={handleLogin}>
          <Label>
            Email
            <Input
              onChange={handleInputValue}
              name="email"
              type="email"
              value={userData.email}
            />
          </Label>
          <Label>
            Password
            <Input
              onChange={handleInputValue}
              type="password"
              name="password"
              value={userData.password}
            />
          </Label>
          <Button type="submit">Log In</Button>
        </Form>
      </NavBar>
    </>
  );
};

export default LoginPage;
