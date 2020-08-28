import React, { useState } from "react";
import axios from "axios";
import querystring from "querystring";
import "./App.css";

const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

const BACKEND_URL = "http://127.0.0.1:8000/login/token/acces-token";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    const body = {
      username: username,
      password: password,
    };
    // The post request
    axios
      .post(BACKEND_URL, querystring.stringify(body), config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => console.log("Login failed"));
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="container">
      <div className="card">
        <form>
          <div>
            <label className="label" htmlFor="username">
              Username
            </label>
            <input
              className="input"
              id="username"
              name="username"
              placeholder="Username"
              onChange={handleUsernameChange}
            />
          </div>

          <div>
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="input"
              id="password"
              name="password"
              placeholder="************"
              type="password"
              onChange={handlePasswordChange}
            />
          </div>

          <div className="button-container">
            <button className="button" type="button" onClick={handleLogin}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
