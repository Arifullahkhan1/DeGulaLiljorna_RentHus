import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../login/Login";
import "./register.css"

export default function Register(props) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState(["USER"]);
  const [address, setAddress] = useState([""]);

  const {setCustomers}=props;

  const navigate=useNavigate();

  const handleRegister = async (event) => {
        event.preventDefault();

       let response=await fetch(`${process.env.REACT_APP_BASE_URL}/api/customer/addcustomer`, {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password,
                roles: roles,
                address: address
            }),

            headers: {
                'Content-Type': 'application/json',
                withCredentials:true

            }
        })
       /*  let customers = await response.json();
        setCustomers(setCustomers); */
        navigate('/login');
      }
    
    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm">
        <label>Username</label>
        <input className="registerInput" 
        type="text" 
        placeholder="Enter your username..." 
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        />
        <label>Address</label>
        <input className="registerInput" 
        type="text" 
        placeholder="Enter your address..." 
        onChange={(e) => setAddress(e.target.value)}
        value={address}
        />
        <label>Password</label>
        <input className="registerInput" 
        type="password" 
        placeholder="Enter your password..." 
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        />
        <button className="registerButton" onClick={handleRegister}>Register</button>
      </form>
      <Link to={"/login"}>
        <button className="registerLoginButton" >Login</button>
      </Link>
        
    </div>
    )
}