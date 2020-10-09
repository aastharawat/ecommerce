import React from "react";
import MenuHeader from "../../containers/MenuHeader";
import Header from "../Header";

export default function Layout(props) {
  return (
    <div>
      <Header />
      <MenuHeader />
      {props.children}
    </div>
  );
}
