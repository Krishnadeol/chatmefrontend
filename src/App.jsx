import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import SetAvatar from "../pages/SetAvatar";
import Home from "../pages/Home";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setavatar" element={<SetAvatar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
export default App;
