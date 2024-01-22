// App.js

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ChooseAccountType from "./pages/Auth/ChooseAccountType";
import { useSelector } from "react-redux";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/choose-account-type" element={<ChooseAccountType />} />
        <Route path="/" element={<PrivateRoute />} />
      </Routes>
    </Router>
  );
};

const PrivateRoute = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? <div>Private Route</div> : <Navigate to="/login" />;
};
export default App;
