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
     
 const {customer}=props





  useEffect(() => {

    if (localStorage.getItem("customers") !== null && localStorage.getItem("customers")?.length > 0 ) {
      setCustomers(JSON.parse(localStorage.getItem("customers")));
    }
     
  
   const fetchCustomers = async () => {
      let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/customer/${customer?.id}`,
        {
         
          headers: {
            method: "GET",
            Authorization: `Bearer ${customer?.token}`
          }
        );
        let customers = [];
        try{
          customers = await response.json();
          setCustomers(customers);
          localStorage.setItem("customers", JSON.stringify(customers)); 
        }
        catch(error){
          console.log(error);
        }
      }
    
    
    };
    fetchCustomers();

        
  },[customer]);

    // console.log("the customers: ",customers);
  return (
    <>
    <div className="containe">
      {customers.length > 0 ? customers.map((user) => (
        <BookingSlots
          customer={customer}
          key={user.id}
          user={user}
          setCustomers={setCustomers}
        />
      )):  <h1 className="msg">Its Empty</h1> }
    </div>
  

  
    </>
  );
};

export default Customer;
