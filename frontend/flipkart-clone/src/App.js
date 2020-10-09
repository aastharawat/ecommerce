import React from "react";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import Homepage from "./containers/HomePage/Homepage";
import ProductListPage from "./containers/ProductListPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Homepage}></Route>
          <Route path="/:slug" exact component={ProductListPage}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
