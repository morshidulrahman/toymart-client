import React, { useEffect } from "react";

const Helmet = ({ title }) => {
  useEffect(() => {
    document.title = `Toy | ${title}`;
  }, [title]);
};

export default Helmet;
