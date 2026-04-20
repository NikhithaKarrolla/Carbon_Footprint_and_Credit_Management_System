import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddEmission from "./pages/AddEmission";
import SelectRole from "./pages/SelectRole";


const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

function App() {
  
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌍 HOME */}
        <Route path="/" element={<Home />} />

        {/* 🎯 ROLE SELECTION */}
        <Route path="/select-role" element={<SelectRole />} />

        {/* 🔐 AUTH (redirect to role if accessed directly) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🔒 PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/add"
          element={
            <PrivateRoute>
              <AddEmission />
            </PrivateRoute>
          }
        />

        {/* 🚫 UNKNOWN ROUTE */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;