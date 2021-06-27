import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../../config/routes";
import styled from "styled-components";
import Container from "../../../UI/Container";

const Head = styled.header`
  background: #efefef;
`;

const Header = () => {
  const links = routes.map((route) => route.subRoutes);
  return (
    <Head>
      <Container>
        <ul>
          {links[0].map((link, i) => (
            <Fragment key={i}>
              {link.path !== "/" && link.init  && (
                <li>
                  <Link to={link.path}>{`${link.path.replace("/", "")}`}</Link>
                </li>
              )}
            </Fragment>
          ))}
        </ul>
      </Container>
    </Head>
  );
};

export default Header;
