import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state

function ProtectedRoute({ element: Component, ...rest }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Replace with your actual authentication state property

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/login" />}
    />
  );
}

export default ProtectedRoute; // Make sure to export the component
