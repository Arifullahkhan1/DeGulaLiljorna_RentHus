import { useState } from "react";
import DatePicker from "react-date-picker";
import { useNavigate } from "react-router-dom";
import TimePicker from "react-time-picker";
import "./pagedesign.css"


export default function BronzePage(props) {

    const { customer, typePackage, price } = props;

    const [cleaningDate, setCleaningDate] = useState(new Date());
    const [cleaningTime, setCleaningTime] = useState("08:00");
    const [cleanerId, setCleanerId] = useState("");

    const minValue = new Date();
    const maxValue = new Date("12/31/2023 04:00 PM");
    const minTValue = "07:59";
    const maxTValue = "16:00";

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
        if (e <= minTValue) {
            return (<div className="invalid">invalid time</div>);
        }
        if (e >= maxTValue) {
            return (<div className="invalid" >invalid time</div>);
        }
        else {
            return (<div>{e}</div>);
        }
    }


    return (

        <div className="confirmorder">
            <h2>{typePackage}</h2>
            <p>Price: {price}kr</p>

            <form>
                <p>CleaningDate</p>
                <DatePicker
                    onChange={setCleaningDate}
                    value={cleaningDate}
                    minDate={minValue}
                    maxDate={maxValue}
                    format="yyyy-MM-dd"
                />
                <div>Date: {cleaningDate.toDateString()}</div>

                <p>CleaningTime</p>
                <TimePicker
                    onChange={setCleaningTime}
                    value={cleaningTime}
                    format="hh:mm"
                />
                <p>Time: {handleDate(cleaningTime)}</p>
                <p>CleanerId</p>
                <input className="input"
                    placeholder="CleanerId..."
                    onChange={(e) => setCleanerId(e.target.value)}
                    value={cleanerId}
                />
            </form>

            <br /><br />
            <button className="reserveButton" onClick={handleSave}>Reserve</button>

        </div>
    )
};