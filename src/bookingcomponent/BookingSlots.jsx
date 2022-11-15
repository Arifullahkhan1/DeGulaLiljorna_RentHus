import "./bookingslot.css";

//mattiral ui class
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  disply: "none",
};
//****** */

export default function BookingSlots(props) {
  const { user, setCustomers, customer} = props;
 

  //matrialUl conts *****************
  const [state, setState] = useState({
    gilad: true,
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [cleaningDate, setCleaningDate] = useState(user.cleaningDate);
  const [cleaningTime, setCleaningTime] = useState(user.cleaningTime);
  const [customerName, setCustomerName] = useState(user.customerName);
  const [customerAddress, setCustomerAddress] = useState(user.customerAddress);
  const refClose = useRef(null);
  //*************************** */

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const handleDelete = async (id) => {
    localStorage.removeItem("customers");
    await fetch(`${process.env.REACT_APP_BASE_URL}/api/bookingslot/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${customer.token}`,
      },
    });
    
    let response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/customer/${customer.id}`,
      {
        headers: {
          Authorization: `Bearer ${customer.token}`,
        },
      }
    );
    let customers = await response.json();
    //console.log(customers);
    setCustomers(customers);
  };
  // Declear and call of put
  const hadleUpdate = async (id) => {
    refClose.current.click();

    await fetch(`${process.env.REACT_APP_BASE_URL}/api/bookingslot/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${customer.token}`,
      },
      body: JSON.stringify({
        customerName: customerName,
        customerAddress: customerAddress,
        cleaningDate: cleaningDate,
        cleaningTime: cleaningTime,
      }),
    });

    let response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/customer/${customer.id}`,
      {
        headers: {
          Authorization: `Bearer ${customer.token}`,
        },
      }
    );
    let customers = await response.json();
          
          
    setCustomers(customers);
  };

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
       
        <div>
          {/* Mattarial Ui Mpdel*/}

          <Button onClick={handleOpen}>Edit</Button>
          <FormControlLabel
            control={
              <Switch
                checked={state.gilad}
                onChange={handleChange}
                name="gilad"
              />
            }
            label="Booking Status"
          />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Update Todo
              </Typography>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="euname"
                  label="username"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
                <TextField
                  id="eaddress"
                  label="CustomerAdress"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                />
                <TextField
                  id="edate"
                  label="CleaningDate"
                  value={cleaningDate}
                  onChange={(e) => setCleaningDate(e.target.value)}
                />
                <TextField
                  id="etime"
                  label="CustomerTime"
                  value={cleaningTime}
                  onChange={(e) => setCleaningTime(e.target.value)}
                />
              </Box>

              <br></br>
              <Button onClick={() => hadleUpdate(user.id)}>update</Button>
              <Button ref={refClose} onClick={handleClose}>
                close
              </Button>
            </Box>
          </Modal>
        </div>
      </div>
      <button className="button" onClick={() => handleDelete(user.id)}>
        Cancel booking{" "}
      </button>
    </div>
  );
}
