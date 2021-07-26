import React, { Fragment } from "react";
import Header from "./header";
const Main = ({ children, ...props }) => {
  return (
    <Fragment>
      <main>
        <Header/>
        <Fragment>{children}</Fragment>
      </main>
    </Fragment>
  );
};

export default Main;