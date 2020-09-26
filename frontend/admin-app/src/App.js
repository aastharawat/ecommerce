import React, { useEffect } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Signin from "./container/Signin";
import Signup from "./container/Signup";
import Home from "./container/Home";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./action/auth.actions";

import PrivateRoute from "./components/HOC/PrivateRoute";
import Products from "./container/Products";
import Orders from "./container/Orders";
import Category from "./container/Category";
function App() {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  });
  return (
    <div>
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/products" exact component={Products} />
        <PrivateRoute path="/orders" exact component={Orders} />
        <PrivateRoute path="/category" exact component={Category} />

        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
