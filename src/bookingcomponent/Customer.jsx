import { useEffect, useState } from "react";
import BookingSlots from "./BookingSlots";
import "./customer.css";

const Customer = (props) => {
  const [bookingSlots, setBookingSlots] = useState(
    []);
     // final version to push
  const {customer}=props

  useEffect(() => {

    if (localStorage.getItem("bookingSlots") !== null && localStorage.getItem("bookingSlots")?.length > 0 ) {
      setBookingSlots(JSON.parse(localStorage.getItem("bookingSlots")));
    }
  
    const fetchBookingSlots = async () => {
      if(customer!=null){
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/customer/${customer?.id}`,{
          
          headers: {
            method: "GET",
            Authorization: `Bearer ${customer?.token}`
          }
        });
        
        
        let fetchedBookingSlots = await response.json();
        setBookingSlots(fetchedBookingSlots);
        localStorage.setItem("bookingSlots", JSON.stringify(fetchedBookingSlots)); 
      }
      
    };

    fetchBookingSlots();
        
  },[customer]);

  
  return (
    <>
    <div className="containe">
      {bookingSlots.length > 0 ? bookingSlots.map((bookingSlot) => (
        <BookingSlots
          customer={customer}
          key={bookingSlot.id}
          bookingSlot={bookingSlot}
          setBookingSlots={setBookingSlots}
        />
      )):  <h1 className="msg">It's Empty</h1> }
    </div>
  

  
    </>
  );
};

export default Customer;
