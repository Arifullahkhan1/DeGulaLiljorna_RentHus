import "./bookingslot.css";

//mattiral ui class

import { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

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
  const { bookingSlot, setBookingSlots, customer } = props;
  const current = new Date();
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [cleaningDate, setCleaningDate] = useState(bookingSlot.cleaningDate);
  const [cleaningTime, setCleaningTime] = useState(bookingSlot.cleaningTime);
  const [customerName, setCustomerName] = useState(bookingSlot.customerName);
  const [customerAddress, setCustomerAddress] = useState(bookingSlot.customerAddress);
  const refClose = useRef(null);
  //***************************

  const refreshBookingSlots = async () => {
    let response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/customer/${customer.id}`,
      {
        headers: {
          Authorization: `Bearer ${customer.token}`,
        },
      }
    );
    let fetchedBookingSlots = await response.json();
    setBookingSlots(fetchedBookingSlots);
    localStorage.setItem("bookingSlots", JSON.stringify(fetchedBookingSlots));
  };

  const handleDelete = async (id) => {
    localStorage.removeItem("bookingSlots");
    await fetch(`${process.env.REACT_APP_BASE_URL}/api/bookingslot/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${customer.token}`,
      },
    });

    refreshBookingSlots();
  };

  // Declare and call of put
  const handleUpdate = async (id) => {
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

    refreshBookingSlots();
  };

  const handleSatisfying = async (id) => {
    await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/bookingslot/rate/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${customer.token}`,
        },
        body: JSON.stringify({
          status: "SATISFYING",
        }),
      }
    );

    refreshBookingSlots();
  };

  const handleUnsatisfying = async (id) => {
    await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/bookingslot/rate/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${customer.token}`,
        },
        body: JSON.stringify({
          status: "NOT_SATISFYING",
        }),
      }
    );

    refreshBookingSlots();
  };

  return (
    <div className="container">
      <div className="content">
        <div className="text">
          <h4>Name: {bookingSlot.customerName}</h4>
          <p>Address: {bookingSlot.customerAddress}</p>
          <p>Date: {bookingSlot.cleaningDate}</p>
          <p>Time: {bookingSlot.cleaningTime}</p>
          <p>Type: {bookingSlot.typePackage}</p>
          <p>Price: {bookingSlot.price} kr</p>
        </div>

        <div className="dropdown">
          {bookingSlot.cleaningDate >= date ? (
            <></>
          ) : bookingSlot.status === "NOT_RATED" || bookingSlot.status === null ? (
            <div>
              <button className="dropdown-btn">Rate This Cleaning</button>
              <div className="dropdown-content">
                <button
                  className="s-button"
                  onClick={() => handleSatisfying(bookingSlot.id)}
                >
                  Satisfying
                </button>
                <button
                  className="u-button"
                  onClick={() => handleUnsatisfying(bookingSlot.id)}
                >
                  Not satisfying
                </button>
              </div>
            </div>
          ) : bookingSlot.status === "NOT_SATISFYING" || bookingSlot.status === null ? (
            <div>
              <button className="dropdown-btn-n">Not satisfying</button>
              <div className="dropdown-content">
                <button
                  className="s-button"
                  onClick={() => handleSatisfying(bookingSlot.id)}
                >
                  Satisfying
                </button>
                <button
                  className="u-button"
                  onClick={() => handleUnsatisfying(bookingSlot.id)}
                >
                  Not satisfying
                </button>
              </div>
            </div>
          ) : bookingSlot.status === "SATISFYING" || bookingSlot.status === null ? (
            <div>
              <button className="dropdown-btn-s">SATISFYING</button>
              <div className="dropdown-content">
                <button
                  className="s-button"
                  onClick={() => handleSatisfying(bookingSlot.id)}
                >
                  Satisfying
                </button>
                <button
                  className="u-button"
                  onClick={() => handleUnsatisfying(bookingSlot.id)}
                >
                  Not satisfying
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>

        {
          <div>
            <Button className="editButton" onClick={handleOpen}>
              Edit
            </Button>

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
                <Button onClick={() => handleUpdate(bookingSlot.id)}>update</Button>
                <Button ref={refClose} onClick={handleClose}>
                  close
                </Button>
              </Box>
            </Modal>
          </div>
        }
      </div>
      <button className="cancel-button" onClick={() => handleDelete(bookingSlot.id)}>
        Cancel booking{" "}
      </button>
    </div>
  );
}
