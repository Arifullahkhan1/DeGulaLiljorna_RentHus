import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TimePicker from "react-time-picker";
import "./pagedesign.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function GoldPage(props) {
  const { customer, typePackage, price } = props;

  const [cleaningDate, setCleaningDate] = useState(new Date());
  const [cleaningTime, setCleaningTime] = useState("08:00");
  const [cleanerId, setCleanerId] = useState("");

  const minTime = "07:59";
  const maxTime = "16:00";

  const navigate = useNavigate();

  const handleSave = async (event) => {
    event.preventDefault();

    await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/bookingslot/addbookingslot`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${customer.token}`,
        },

        body: JSON.stringify({
          customerName: customer.username,
          customerAddress: customer.address,
          typePackage: typePackage,
          price: price,
          cleaningDate: cleaningDate,
          cleaningTime: cleaningTime,
          customerId: customer.id,
          cleanerId: cleanerId,
          status:customer.status,
        }),
      }
    );

    await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/customer/${customer.id}`,
      {
        headers: {
          Authorization: `Bearer ${customer.token}`,
        },
      }
    );

    navigate("/customer");
  };

  const handleDate = (e) => {
    if (e <= minTime) {
      return <div className="invalid">invalid time</div>;
    }
    if (e >= maxTime) {
      return <div className="invalid">invalid time</div>;
    } else {
      return <span>{e}</span>;
    }
  };

  return (
    <div className="confirmorder">
      <h2>{typePackage}</h2>
      <span>Price: {price}kr</span>

      <form>
        <div className="form-date">
          <div>Cleaning Date</div>
          <DatePicker
            selected={cleaningDate}
            onChange={(date) => setCleaningDate(date)}
            value={cleaningDate}
            minDate={new Date()}
            maxDate={new Date("12/31/2022")}
            filterDate={(date) => date.getDay() !== 0}
            dateFormat="yyyy/MM/dd"
          />
          <div>Date: {cleaningDate.toDateString()}</div>
        </div>
        <div className="form-time">
          <div>Cleaning Time</div>

          <TimePicker
            onChange={setCleaningTime}
            value={cleaningTime}
            format="HH:mm"
          />
          <div></div>
          <span>Time: {handleDate(cleaningTime)}</span>
        </div>
        <div className="form-cleaner">
          <div>Cleaner ID</div>
          <input
            className="input"
            placeholder="Cleaner ID..."
            onChange={(e) => setCleanerId(e.target.value)}
            value={cleanerId}
          />
        </div>
      </form>
      <br />
      <br />
      <button className="reserveButton" onClick={handleSave}>
        Book
      </button>
      <div className="pakage_info">
        {" "}
        Our GOLD Package has been created for a deep, detailed clean of your
        home. This package is prepared to leave a perfectly clean home from top
        to bottom. The Gold Service has all the great things from our SILVER
        Service but are enhanced. Our uniquely trained staff will focus on a
        more detailed cleaning of items all around the house. While setting up
        this service, you will have the choice of having us use our regular
        products or environmentally friendly products instead. This Package has
        our friendly trained staff visit your home for a 5 and half hour visit,
        50% longer than our SILVER service and start at ONLY 3000kr per visit{" "}
      </div>
    </div>
  );
}
