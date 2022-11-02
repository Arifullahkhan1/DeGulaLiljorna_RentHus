import DatePage from "../component/DatePage";
import  "./bookingslot.css";


const BookingSlots = (props) => {
    const { user, setCustomers, customer } = props;

const handleDelete = async (id) => {

    await fetch(`${process.env.REACT_APP_BASE_URL}/api/bookingslot/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${customer.token}`
        }
    })

    let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/customer/${customer.id}`, {
        headers: {
            Authorization: `Bearer ${customer.token}`
        }
    })
    let customers = await response.json()

    console.log("customers", customers)

    setCustomers(customers)

}

return (
    <div className="container">
        <div className="content">
        <div className="text">
            <h2>{user.customerName}</h2>
            <p>{user.customerAddress}</p>
            <p>{user.cleaningDate}</p>
            <p>{user.cleaningTime}</p>
          
       </div>
      
        </div>
            <button className="button" onClick={() => handleDelete(user.id)}>Ta bort user</button>
    </div>
)

}

export default BookingSlots;
