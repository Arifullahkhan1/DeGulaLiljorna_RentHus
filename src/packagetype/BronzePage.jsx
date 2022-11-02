import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./GoldPage.css"


export default function BronzePage(props) {

    const{setCustomers, customer}=props;


    const customerAddress=customer.address
    const username=customer.username

    const [cleaningDate, setCleaningDate] = useState("");
    const [cleaningTime, setCleaningTime] = useState("");
    const [cleanerId, setCleanerId] = useState("");

    const navigate=useNavigate();
   
    console.log("address",customerAddress)
    console.log("name",username)

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
                customerAddress:customerAddress,
                cleaningDate:cleaningDate,
                cleaningTime:cleaningTime,
                customerId:customer.id,
                cleanerId:cleanerId
            })
        })

        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/customer/${customer.id}`, {
            headers: {
                Authorization: `Bearer ${customer.token}`
            }
          
        })
        
        navigate('/customer');

    }


    return(

<div className="confirmorder">
                 <h2>Bronze package</h2>
                 <p>Price:1000 kr</p>
            <form>
               
                <p>CustomerAddress</p>
                <span>{customerAddress}</span>
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
                <br /><br />
                <button onClick={handleSave}>Reserve</button>

            </form>

        </div>
)
};
