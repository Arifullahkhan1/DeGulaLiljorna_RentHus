import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { FaPinterestSquare } from "react-icons/fa";

import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
} from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";
import "./topbar.css";

export default function Topbar(props) {
  const { customer, setLoggedInCustomer } = props;

  const handleLogedOut = () => {
    localStorage.clear(); // clear localStoage from save object
    setLoggedInCustomer(null);
  };

  return (
    <>
      <header>
        <div className="top">
          <nav className="topLeft">
            <i>
              <AiFillFacebook className="topIcon" />
            </i>
            <i>
              <AiFillInstagram className="topIcon" />
            </i>
            <i>
              <AiFillTwitterSquare className="topIcon" />
            </i>
            <i>
              <FaPinterestSquare className="topIcon" />
            </i>
          </nav>

          <nav className="topCenter">
            <ul className="topList">
              <li className="topListItem">
                <Link className="link" to={"/"}>
                  Home
                </Link>
              </li>
              <li className="topListItem">
                <Link className="link" to={"/contact"}>
                  Contact
                </Link>
              </li>
              <li className="topListItem">
                <Link className="link" to={"/about"}>
                  About
                </Link>
              </li>
              {customer && (
                <li className="topListItem">
                  <Link className="link" to={"/"} onClick={handleLogedOut}>
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          <nav className="topRight">
            {customer ? (
              <nav className="topRight">
                <Link className="link" to={"/customer"}>
                  <button className="history">History</button>
                </Link>
              </nav>
            ) : (
              <ul className="topList">
                <li className="topListItem">
                  <Link className="link" to="/login">
                    LOGIN
                  </Link>
                </li>
                <li className="topListItem">
                  <Link className="link" to="/register">
                    REGISTER
                  </Link>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
