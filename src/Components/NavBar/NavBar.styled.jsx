import styled from 'styled-components';

export const NavContainer = styled.nav`
  height: 70px;
  width: 100%;
  background-color: blueviolet;
  display: flex;
  justify-content: space-around;
  align-items: center;
  p {
    font-size: 26px;
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
`;

export const Button = styled.button`
  outline: none;
  border: 1px solid transparent;
  cursor: pointer;
  padding: 10px;
  font-size: 16px;
  margin-right: 15px;
  background-color: orange;
  color: white;
  :hover {
    border: 1px solid white;
    background-color: transparent;
  }

  a {
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }
`;

export const OuterLayout = styled.section`
  padding: 0px 40px;
`;
