import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddPropertyPage, DashboardPage, LandingPage, PropertiesPage } from "./pages";
import { NavBar, PropertyCard } from "./components";
import { ProtectedRoute } from "./hooks/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/properties" element={<PropertiesPage />}></Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/property/0" element={<PropertyCard />}></Route>
          <Route
            path="/property/add"
            element={
              <ProtectedRoute>
                <AddPropertyPage />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
