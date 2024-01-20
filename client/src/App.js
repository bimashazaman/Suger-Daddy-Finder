// App.js

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import { useAuthContext } from "./AuthContext";
import Register from "./pages/Auth/Register";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute />} />
      </Routes>
    </Router>
  );
};

const PrivateRoute = () => {
  const { isLoggedIn } = useAuthContext();
  return isLoggedIn ? <div>Private Route</div> : <Navigate to="/login" />;
};

export default App;
