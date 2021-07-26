import React, { Fragment } from "react";
import { Link } from "react-router-dom";


const Links = ({ url,name }) => {
  return (
    <>
      <a href={url}>{name}</a>
    </>
  );
};

export default Links;