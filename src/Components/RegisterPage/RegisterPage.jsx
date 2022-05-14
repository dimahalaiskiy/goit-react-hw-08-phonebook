import React, { useState } from 'react';
import {
  Form,
  Label,
  Input,
  Button,
} from '../PhoneBookField/PhonebookField.styled';
import { useDispatch, useSelector } from 'react-redux';
import authOperations from '../../redux/auth';
import NavBar from 'Components/NavBar/NavBar';

const LoginPage = () => {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputValue = e => {
    const { name, value } = e.target;

    if (name === 'name') {
      setUserData(prevState => {
        return { ...prevState, name: value };
      });
    } else if (name === 'email') {
      setUserData(prevState => {
        return { ...prevState, email: value };
      });
    } else {
      setUserData(prevState => {
        return { ...prevState, password: value };
      });
    }
  };

  const handleRegister = e => {
    e.preventDefault();
    dispatch(authOperations.registerUser(userData));
  };

  return (
    <>
      <NavBar>
        <h2>Register Page</h2>
        <Form onSubmit={e => handleRegister(e)}>
          <Label>
            Name
            <Input
              onChange={handleInputValue}
              name="name"
              value={userData.name}
            />
          </Label>
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
              name="password"
              value={userData.password}
            />
          </Label>
          <Button type="submit">Register</Button>
        </Form>
      </NavBar>
    </>
  );
};

export default LoginPage;
