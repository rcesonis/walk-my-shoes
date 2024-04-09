import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import "tailwindcss/tailwind.css";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
