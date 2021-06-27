import React, { Fragment } from "react";
import { Link } from "react-router-dom";


const Links = ({ url,name }) => {
  return (
    <>
      <Link to={url}>{name}</Link>
    </>
  );
};

export default Links;