import { Link } from "react-router-dom";
import "./MainPage.css";
import React from "react";

export default function MainPage() {
  return (
    <div>
      <div className="package-container">
        <div>
          <Link style={{ textDecoration: "none" }} to={"/goldpackage/"}>
            <img
              className="package"
              src="./Images/gold.png"
              alt="Gold"
              style={{ marginTop: 10 }}
            />
            <p>Gold package</p>
          </Link>
        </div>
        <div>
          <Link style={{ textDecoration: "none" }} to={"/silverpackage/"}>
            <img className="package" src="./Images/silver.png" alt="silver" />
            <p>Silver package</p>
          </Link>
        </div>

        <div>
          <Link style={{ textDecoration: "none" }} to={"/bronzepackage/"}>
            <img className="package" src="./Images/bronze.png" alt="bronze" />
            <p>Bronze package</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
