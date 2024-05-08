import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLogin from "./components/User/UserLogin"
import UserRegistration from "./components/User/UserRegister"
import Home from "./components/Notes/home"
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserRegistration  />} />
        <Route path="/Login" element={<UserLogin  />} />
        <Route path="/Home" element={<Home  />} />
      
      </Routes>
    </Router>
  );
}