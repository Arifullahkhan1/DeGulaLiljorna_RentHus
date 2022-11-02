import { useEffect, useState } from "react";
import Register from "../servicepages/register/Register";
import BookingSlots from "./BookingSlots";
import DatePage from "../component/DatePage";
import "./customer.css"


const Customer = (props) => {
   
    const [customers, setCustomers] = useState([{ 
         id: 0,
         username:"username",
         password:"password",
         roles:["USER"],
        }])


        const { customer } = props;
   
    useEffect(() => {

        const fetchCustomers = async () => {

            let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/customer/${customer.id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${customer.token}`
                }
            
            });
            let customers = await response.json();
            setCustomers(customers)
            
        }

        fetchCustomers();


    }, [])

    return (
        <div className="containe">
          {customers.map(user => <BookingSlots customer={customer}  key={user.id} user={user} setCustomers={setCustomers}/>)}
            
        </div>
    )

} 

export default Customer;