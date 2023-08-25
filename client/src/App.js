// App.js
import "./stylesheets/theme.css";
import "./stylesheets/alignments.css";
import "./stylesheets/textelements.css";
import "./stylesheets/custom-components.css";
import "./stylesheets/form-elements.css";
import "./stylesheets/layout.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/common/Register";
import Login from "./pages/common/login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/common/Home";
import Exams from "./pages/admin/Exams";
import AddEditExam from "./pages/admin/Exams/AddEditExam";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Common Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User Routes */}
          <Route path="/" element={<Home />} />

          {/* Admin Routes */}
          <Route
            path="/admin/exams"
            element={<ProtectedRoute element={<Exams />} />} // Wrapped in ProtectedRoute
          />
          <Route
            path="/admin/exams/add"
            element={<ProtectedRoute element={<AddEditExam />} />} // Wrapped in ProtectedRoute
          />

          <Route
            path="/admin/exams/edit/:id"
            element={<ProtectedRoute element={<AddEditExam />} />} // Wrapped in ProtectedRoute
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
