import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../../config/routes";
import styled from "styled-components";
import Container from "../../../UI/Container";

const Head = styled.header`
  background: #efefef;
  height: 50px;
  ul {
    margin-bottom: 0;
    margin-left: 0;
    padding-inline-start: 0;
  }
  nav {
    padding: 0 1rem;
  }
  ul::after {
    content: "";
    clear: both;
    display: table;
  }
  ul li {
    float:left;
    padding: 1rem 1rem;
    list-style: none;
  }
  ul li:not(:last-child) {
    border-right: 1px solid rgba(0,0,0, 0.1);
  }
`;

const Header = () => {
  const links = routes.map((route) => route.subRoutes);
  return (
    <Head>
      <Container>
        <nav>
        <ul>
          {links[0].map((link, i) => (
            <Fragment key={i}>
              {link.init  && (
                <li>
                  <a href={link.path}>{`${link.name ? link.name : link.path.replace("/", "")}`}</a>
                </li>
              )}
            </Fragment>
          ))}
        </ul>
        </nav>
      </Container>
    </Head>
  );
};

export default Header;
