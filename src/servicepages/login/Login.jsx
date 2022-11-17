import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [roles, setRoles] = useState(["USER"]);

  const { setLoggedInCustomer } = props;
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    let response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/auth/login`,
      {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password
          // roles: roles,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let token = await response.text();
    response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/auth/whoami?token=${token}`
    );
    let customer = await response.json();
    setLoggedInCustomer(customer);
    localStorage.setItem("customer", JSON.stringify(customer)); //save customer in localstorage

    navigate("/customer");
  };

  return (
    <>
      <div className="login">
        <span className="loginTitle">Log in</span>
        <form className="loginForm">
          <label>Username</label>
          <input
            className="loginInput"
            type="text"
            placeholder="Enter your username..."
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />

          <label>Password</label>
          <input
            className="loginInput"
            type="password"
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <button className="loginButton" onClick={handleLogin}>
            Log in
          </button>
        </form>
      </div>

      <Link to={"/register"}>
        <button className="loginRegisterButton">Register</button>
      </Link>
    </>
  );
}
