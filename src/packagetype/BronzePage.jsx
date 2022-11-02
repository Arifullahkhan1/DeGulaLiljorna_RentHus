import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePage from "../component/DatePage";
import "./pagedesign.css"


export default function BronzePage(props) {

    const { customer,typePackage,price} = props;

    const [cleaningDate, setCleaningDate] = useState("");
    const [cleaningTime, setCleaningTime] = useState("");
    const [cleanerId, setCleanerId] = useState("");

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
                typePackage:typePackage.typePackage,
                price:price.price,
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


    return (

        <div className="confirmorder">
           <h2>{typePackage}</h2>
            <p>Price: {price}kr</p>

            <form>
                <p>CleaningDate</p>
                <input className="input"
                    placeholder="CleaningDate..."
                    onChange={(e) => setCleaningDate(e.target.value)}
                    value={cleaningDate}
                />

                <p>CleaningTime</p>
                <input className="input"
                    placeholder="CleaningTime..."
                    onChange={(e) => setCleaningTime(e.target.value)}
                    value={cleaningTime}
                />
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