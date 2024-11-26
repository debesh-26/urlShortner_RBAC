import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = ({ isauthenticated, setisAuthenticated, urlLimit }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("urlLimit");
    localStorage.removeItem("role")
    setisAuthenticated(false);
    navigate("/");
  };

  return (
    <header className="header">
      <h1>ClipLink</h1>
      {role ==="admin" ?(<h2 style={{color:"white"}}>Admin Dashboard</h2>):(<></>)}
      <div className="auth-buttons">
        {isauthenticated ? (
          <>
            {role==="admin" ? (<></>):(urlLimit && <span className="url-limit">Limit : {urlLimit}</span>)}
            <button className="login-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="login-btn" onClick={handleLogin}>
              Login
            </button>
            <button className="register-btn" onClick={handleRegister}>
              Register
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
