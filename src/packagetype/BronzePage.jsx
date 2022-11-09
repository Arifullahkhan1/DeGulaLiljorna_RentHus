import { useState } from "react";
// import DatePicker from "react-date-picker";
import { useNavigate } from "react-router-dom";
import TimePicker from "react-time-picker";
import "./pagedesign.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export default function BronzePage(props) {

    const { customer, typePackage, price } = props;

    const [cleaningDate, setCleaningDate] = useState(new Date());
    const [cleaningTime, setCleaningTime] = useState("08:00");
    const [cleanerId, setCleanerId] = useState("");

    const minTime = "07:59";
    const maxTime = "16:00";

    const navigate = useNavigate();

    const handleSave = async (event) => {

        event.preventDefault()

        await fetch(`${process.env.REACT_APP_BASE_URL}/api/bookingslot/addbookingslot`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${customer.token}`
            },

            body: JSON.stringify({
                customerName: customer.username,
                customerAddress: customer.address,
                typePackage: typePackage,
                price: price,
                cleaningDate: cleaningDate,
                cleaningTime: cleaningTime,
                customerId: customer.id,
                cleanerId: cleanerId
            })
        })

        await fetch(`${process.env.REACT_APP_BASE_URL}/api/customer/${customer.id}`, {
            headers: {
                Authorization: `Bearer ${customer.token}`
            }

        })

        navigate('/customer');

    }

    const handleDate = (e) => {
        if (e <= minTime) {
            return (<div className="invalid">invalid time</div>);
        }
        if (e >= maxTime) {
            return (<div className="invalid" >invalid time</div>);
        }
        else {
            return (<div>{e}</div>);
        }
    }


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

          /* showYearDropdown
                    scrollableYearDropdown */
        />
        <div>Date: {cleaningDate.toDateString()}</div>

        <div>CleaningTime</div>

        <TimePicker
          /* onChange={setCleaningTime}
          value={cleaningTime}
          mode="time"
          timeFormat="HH:mm"
          minTime="07:75"
          maxTime="16:00" */
          onChange={setCleaningTime}
                    value={cleaningTime}
                    format="HH:mm"
        />
        <p>Time: {handleDate(cleaningTime)}</p>
        <div>CleanerId</div>
        <input
          className="input"
          placeholder="CleanerId..."
          onChange={(e) => setCleanerId(e.target.value)}
          value={cleanerId}
        />
      </form>

            <br /><br />
            <button className="reserveButton" onClick={handleSave}>Reserve</button>
            <div className="pakage_info">Our BRONZE Package has been designed for multiple cleaning visits per week or for partial cleaning visit. This packaged focuses on maintaining Bathrooms, Kitchen and One Extra room per visit. Our uniquely trained staff focus on a detail cleaning of the difficult area's in your home, while also maintaining your home on a room by room basis. The Bronze package allows you to constantly have a clean kitchen and bathrooms while cleaning a couple of rooms per week. Similar to our SILVER and GOLD package, you will have the choice of having us use our regular products or environmentally friendly products instead. This Package has our friendly trained staff visit your home for a 2 and half hour visit, start at ONLY 1000kr per visit.</div>

        </div>
    )
};