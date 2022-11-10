import { useEffect, useState } from "react";
import BookingSlots from "./BookingSlots";
import "./customer.css";

const Customer = (props) => {
  const [customers, setCustomers] = useState([
    {
      id: 0,
      username: "username",
      password: "password",
      roles: ["USER"],
    },
    
  ]);
  const { customer } = props;
  const[msg,setMsg]=useState(false);

  useEffect(() => {
    if (localStorage.getItem("customers") !== null) {
      setCustomers(JSON.parse(localStorage.getItem("customers")));
   
    }
    else{
      setMsg('Its Empty!',true)
    }

    const fetchCustomers = async () => {
      let response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/customer/${customer.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${customer.token}`,
          },
        }
      );
      let customers = await response.json();

      setCustomers(customers);
      localStorage.setItem("customers", JSON.stringify(customers));
    };

    fetchCustomers();
  },[]);

  return (
    <>
    <div className="containe">
      {customers.map((user) => (
        <BookingSlots
          customer={customer}
          key={user.id}
          user={user}
          setCustomers={setCustomers}
        />
      ))}
    </div>
   <h1 className="msg">{msg}</h1>
    </>
  );
};

export default Customer;
