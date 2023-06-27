import React from "react";
import Helmet from "../components/shared/Helmet";

const NotfoundPages = () => {
  return (
    <div className="w-full h-full">
      <Helmet title="404" />
      <img
        src="/images/404Page.gif"
        alt="not-found"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default NotfoundPages;
