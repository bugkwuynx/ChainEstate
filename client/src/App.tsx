import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage, LoginPage } from "./pages";
import { NavBar } from "./components";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
