
import "./bookingslot.css";


export default function BookingSlots(props) {
    const { user, setCustomers, customer, typePackage, price } = props;

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
        setCustomers(customers)

    }

    return (
        <div className="container">
                <div className="content">
                    <div className="text">
                        <h4>Name: {user.customerName}</h4>
                        <p>Address: {user.customerAddress}</p>
                        <p>Date: {user.cleaningDate}</p>
                        <p>Time:{user.cleaningTime}</p>
                        <p>Type:{user.typePackage}</p>
                        <p>Price:{user.price}</p>
                    </div>
                </div>
                <button className="button" onClick={() => handleDelete(user.id)}>Delete</button>
        </div>
    )

}

