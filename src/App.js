import React, { useState } from "react";
import axios from "axios";
import querystring from "querystring";
import { useCookies } from "react-cookie";
import "./App.css";

const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

const BACKEND_URL = `http://127.0.0.1:8000`;

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [cookie,setCookie] = useCookies(["Authorization"]);

  const [loginError, setLoginError] = useState(false);

  function handleLogin() {
    const body = {
      username: username,
      password: password,
    };
    // The post request
    axios
      .post(BACKEND_URL.concat("/token"), querystring.stringify(body), config)
      .then((response) => {
        const token = response.data.access_token;
        setCookie("Authorization",`${token}`,{path: "/",maxAge:1800});
        axios
          .get(BACKEND_URL.concat("/docs"), {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            window.location.replace(BACKEND_URL.concat("/docs"));
          });
      })
      .catch((e) => {
        setLoginError(true);
        setTimeout(() => {
          setLoginError(false);
        }, 3000);
      });
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
            <div
              style={{
                display: "flex",
                marginTop: "15px",
                justifyContent: "center",
                fontWeight: "bold",
                color: "red",
              }}
            >
              {loginError ? <div>Login error</div> : null}
            </div>
          </form>
        </div>
      </div>
    );
}

export default App;