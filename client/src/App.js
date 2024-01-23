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
import ProfileSettings from "./pages/Auth/ProfileSettings";
import { useSelector } from "react-redux";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* These are private routes */}
        <Route
          path="/choose-account-type"
          element={<PrivateRoute component={ChooseAccountType} />}
        />
        <Route
          path="/profile-settings"
          element={<PrivateRoute component={ProfileSettings} />}
        />
        <Route path="/" element={<PrivateRoute component={Home} />} />
      </Routes>
    </Router>
  );
};

const PrivateRoute = ({ component: Component }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? <Component /> : <Navigate to="/login" />;
};

export default App;
