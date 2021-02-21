import React from "react";
import styled from "styled-components";

import { NavLink } from "react-router-dom";

const Navbar = styled.nav`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  ul {
    display: flex;
    list-style: none;
    margin-right: 20px;
    li {
      padding: 10px;
    }
  }
`;

const StyledLink = styled(NavLink)`
    color: #005588;

    &.active {
        font-weight: 800;
    }

    ::visited {
        color: #aabbaa;
    }
`

export default function Nav() {
  return (
    <Navbar>
      <ul>
      <li>
          <StyledLink exact to="/">Home</StyledLink>
        </li>
        <li>
          <StyledLink to="/study">Study</StyledLink>
        </li>
        <li>
          <StyledLink to="/manage">Manage</StyledLink>
        </li>
      </ul>
    </Navbar>
  );
}
