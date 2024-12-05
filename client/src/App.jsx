import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "./register.jsx";
import SendOTPemail from "./sendOTPemail.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SendOTPemail />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
