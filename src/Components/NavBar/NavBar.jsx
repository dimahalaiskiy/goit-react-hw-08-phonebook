import React from 'react';
import { NavContainer, Button } from './NavBar.styled';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import authOperations from '../../redux/auth';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector(state => state.auth);

  const handleLogOut = () => {
    if (isLoggedIn) {
      navigate('/login', { replace: true });
      dispatch(authOperations.logOut());
    }
  };
  return (
    <>
      <NavContainer>
        <p>NavBar</p>
        <div>
          {isLoggedIn ? (
            <>
              <Button onClick={handleLogOut}>Log Out</Button>
              <Button>
                <NavLink
                  style={({ isActive }) =>
                    isActive ? { color: 'red' } : { color: 'blue' }
                  }
                  to="/contacts"
                >
                  Contacts
                </NavLink>
              </Button>
            </>
          ) : (
            <>
              <Button>
                <NavLink
                  style={({ isActive }) =>
                    isActive ? { color: 'red' } : { color: 'blue' }
                  }
                  to="/login"
                >
                  Log In
                </NavLink>
              </Button>
              <Button>
                <NavLink
                  style={({ isActive }) =>
                    isActive ? { color: 'red' } : { color: 'blue' }
                  }
                  to="/register"
                >
                  Register
                </NavLink>
              </Button>
            </>
          )}
        </div>
      </NavContainer>
      {children}
    </>
  );
};

export default NavBar;
