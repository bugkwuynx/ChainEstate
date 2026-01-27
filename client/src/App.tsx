import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardPage, LandingPage } from "./pages";
import { NavBar } from "./components";
import { ProtectedRoute } from "./hooks/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
