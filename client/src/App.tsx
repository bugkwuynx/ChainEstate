import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages";
import { NavBar } from "./components";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
