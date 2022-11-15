import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TimePicker from "react-time-picker";
import "./pagedesign.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SilverPage(props) {
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
      return <div>{e}</div>;
    }
  };

  return (
    <div className="confirmorder">
      <h2>{typePackage}</h2>
      <span>Price: {price}kr</span>

      <form>
        <div>CleaningDate</div>
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

        <div>CleaningTime</div>

        <TimePicker
          onChange={setCleaningTime}
          value={cleaningTime}
          format="HH:mm"
        />
        <span>Time: {handleDate(cleaningTime)}</span>
        <div>CleanerId</div>
        <input
          className="input"
          placeholder="CleanerId..."
          onChange={(e) => setCleanerId(e.target.value)}
          value={cleanerId}
        />
      </form>

      <br />
      <br />
      <button className="reserveButton" onClick={handleSave}>
        Reserve
      </button>
      <div className="pakage_info">
        {" "}
        Our SILVER Package has been designed for residential maintenance. This
        package is ideal for good overall clean house, as our extensively
        trained staff look after the most trafficked spots in the house while
        ensuring a dust free residence all around. While setting up this
        package, it's your choice of having us use our regular products or if
        you are worried about harsh chemicals, we can use environmentally
        friendly products instead. This Package has our highly trained staff
        visit your home for a 3 and half hour visit and start at ONLY 2000kr per
        visit.
      </div>
    </div>
  );
}
