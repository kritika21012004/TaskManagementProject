import clsx from "clsx";
import React from "react";
import "../styles/Title.css"

const Title = ({ title, className }) => {
  return (
    <h2 className={clsx("title-class", className)}>
      {title}
    </h2>
  );
};

export default Title;