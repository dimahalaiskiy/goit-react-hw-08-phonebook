import React, { useEffect } from 'react';
import Title from '../../Title';
import Phonebook from '../../PhoneBookField';
import Contacts from '../../Contacts';
import FilterContactsInput from '../../FilterContactsInput';
import { Container } from '../../Title/Title.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterContacts,
  addContactToServer,
} from '../../../redux/contactsSlice';
import NavBar from 'Components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, status } = useSelector(state => state.contacts);
  const { isLoggedIn } = useSelector(state => state.auth);

  const setContactName = (e, name, number) => {
    e.preventDefault();

    let isUniq = items?.some(
      contact => contact.name?.toLowerCase() === name.toLowerCase()
    );
    if (isUniq) {
      toast('Контакт с таким именем уже существует!');
      return;
    }

    dispatch(addContactToServer({ name, number }));
  };

  const setFilteredContact = e => {
    const { value } = e.target;
    dispatch(filterContacts(value));
  };

  useEffect(() => {
    if (isLoggedIn) {
      // navigate('login', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return (
    <NavBar>
      {isLoggedIn ? (
        <Container>
          <Title title="Phonebook">
            <Phonebook addContact={setContactName} />
          </Title>
          <Title title="Contacts"></Title>
          <FilterContactsInput setFilter={setFilteredContact} />
          {status === 'loading' && <h1>Loading...</h1>}
          <Contacts />
          <ToastContainer />
        </Container>
      ) : (
        <button>
          <NavLink to="/login">Login Page</NavLink>
        </button>
      )}
    </NavBar>
  );
};

export default App;
