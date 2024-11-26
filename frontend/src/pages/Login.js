import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setisAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const[loading,setloading]=useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setloading(true)
    try {
      const response = await axios.post("https://urlshortner-rbac.onrender.com/auth/login", {
        email,
        password,
      });
      console.log(response);
      
      const token=response.data.token;
      const role=response.data.user.role;
      localStorage.setItem("token", token);
      localStorage.setItem('role', role);
      localStorage.setItem("urlLimit",response.data.user.urlLimit)
      
      
      setisAuthenticated(true);
      navigate("/");
      
      
    } catch (error) {
      
      setError((error.response.data.msg+" Please Register").toUpperCase());
    }finally{
      setloading(false);
    }
  };
  const goToRegisterinPage=()=>{
    navigate('/register')
  }

  return (
    <div className="body">
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="loginFailed" style={{ color: "red" }}>{error}</p>}

        {loading && <div className="loader-overlay">
          <div className="loader"></div>
        </div>}

        <form onSubmit={handleLogin} className={loading ? "dimmed" : ""}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              className="in"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              className="in"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button type="submit" className="button" disabled={loading}>
            Login
          </button>
          <button type="submit" className="button" onClick={goToRegisterinPage} disabled={loading}>
            Don't have a account ? Register Here
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
