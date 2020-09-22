import React from "react";
import Header from "../Header/index";

export default function Layout(props) {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
}
