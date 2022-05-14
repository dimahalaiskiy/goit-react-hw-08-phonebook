import React, { useEffect } from 'react';
import Contacts from './Components/Contacts/ContactsPage/ContactsPage';
import LoginPage from 'Components/LoginPage/LoginPage';
import RegisterPage from 'Components/RegisterPage/RegisterPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import authOperations from 'redux/auth';
import { fetchContacts } from 'redux/contactsSlice';

const App = () => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector(state => state.auth);

  useEffect(() => {}, [dispatch]);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchContacts());
    }
  }, [isLoggedIn, dispatch]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="contacts" element={<Contacts />} />
          <Route path="register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
