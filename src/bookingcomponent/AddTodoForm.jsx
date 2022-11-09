/* import { useState } from "react";

const AddTodoForm = (props) => {

    const { setTodos, customer} = props;

    /* const [customerName, setCustomerName] = useState("") */
  /*   const [customerAddress, setCustomerAddress] = useState("");
    const [cleaningDate, setCleaningDate] = useState("");
    const [cleaningTime, setCleaningTime] = useState("");
    const [cleanerId, setCleanerId] = useState("");
   
 

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
                customerAddress: customerAddress,
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
        let todos = await response.json()

        setTodos(todos)

    }

    return (

      <div className="confirmorder">
                 <h2>Bronze package</h2>
                 <p>Price:1000 kr</p>
            <form>
               
                <p>CustomerAddress</p>
                <input
                    placeholder="CustomerAddress..."
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    value={customerAddress}
                />
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
                <button onClick={handleSave}>Save</button>

            </form>

        </div>
    )
}
 */
/* export default AddTodoForm;
 */