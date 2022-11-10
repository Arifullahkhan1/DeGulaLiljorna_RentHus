import React from "react";

export default function Contact() {
  return (
    <div className="contact pakage_info">
      <div className="address">
        <ul className="list">
          <h3>
            {" "}
            <li>Address</li>
          </h3>
          <br />
          <h4>
            {" "}
            <li>STADA FINT</li>
          </h4>
          <li>Eddagatan 3, Stockhom</li>
        </ul>
      </div>

      <div className="callus">
        <ul className="list">
          <h3>
            {" "}
            <li>Call us</li>
          </h3>
          <br />
          <li>(08)123456</li>
          <li>Email</li>
          <li>info@stadafina.se</li>
        </ul>
      </div>
      <div className="callus">
        <ul className="list">
          <h3>
            {" "}
            <li>Opening Time</li>
          </h3>
          <br />
          <span>Mon -Fri </span>
          <span>&nbsp; &nbsp;</span>
          <span>09:00am - 17:00pm</span>
          <br />
          <span>
            Sat &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span>&nbsp; &nbsp;</span>
          <span>09:00am - 13:00pm</span>
          <br />
          <span>Sun &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
          <span>&nbsp; &nbsp;</span>
          <span>Closed</span>
        </ul>
      </div>
    </div>
  );
}
