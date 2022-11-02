import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePage from "../component/DatePage";
import "./GoldPage.css"


export default function BronzePage(props) {

    const { customer,tValue,dValue } = props;

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
                cleaningDate: dValue,
                cleaningTime: tValue,
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
            <h2>Bronze package</h2>
            <p>Price:1000 kr</p>

            <form>
                <p>CleaningDate</p>
                
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