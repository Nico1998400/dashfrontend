import "./App.css";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AccountPage from "./pages/AccountPage";
import EditWebsite from "./pages/EditWebiste";
import ScrollToTop from "./components/ScrollToTop";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/account" element={<PrivateRoute><AccountPage /></PrivateRoute>} />
          <Route path="/editwebsite" element={<PrivateRoute><EditWebsite /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
