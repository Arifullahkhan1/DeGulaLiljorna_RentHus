import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./GoldPage.css"


export default function BronzePage(props) {

    const { customer } = props;

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
            <h2>Silver package</h2>
            <p>Price:2000 kr</p>

            <form>
                <p>CleaningDate</p>
                <input
                    placeholder="CleaningDate..."
                    onChange={(e) => setCleaningDate(e.target.value)}
                    value={cleaningDate}
                />

                <p>CleaningTime</p>
                <input
                    placeholder="CleaningTime..."
                    onChange={(e) => setCleaningTime(e.target.value)}
                    value={cleaningTime}
                />
                <p>CleanerId</p>
                <input
                    placeholder="CleanerId..."
                    onChange={(e) => setCleanerId(e.target.value)}
                    value={cleanerId}
                />
            </form>
            <br /><br />
            <button onClick={handleSave}>Reserve</button>

        </div>
    )
};