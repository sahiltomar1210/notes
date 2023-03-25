import React, { useState } from "react";
import "./login.css";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState("");
  const handleLogin = (e, p) => {
    const user = {
      email: e,
      password: p,
    };
    if (e !== "") {
      axios
        .post("http://localhost:3000/users", user)
        .then((response) => {
          if (response.data.status === "Success") {
            setAuth(true);
            setUser(response.data.notes.email);
          } else {
            setAuth(false);
            alert(response.data.message);
          }
        })
        .catch((e) => {
          if (e.response.data.status === "Failed") {
            alert(e.response.data.message);
          }
        });
    }
  };
  return (
    <div className="login_container">
      <div className="form_container">
        <h1>Sign In</h1>
        <div className="filling">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={() => handleLogin(email, password)}>Submit</button>
        <span>
          Don't have account <a href="/register">Register</a>
        </span>
      </div>
    </div>
  );
};

export default Login;
