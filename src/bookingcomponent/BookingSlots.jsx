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
  const { user, setCustomers, customer } = props;
  const current = new Date();
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [cleaningDate, setCleaningDate] = useState(user.cleaningDate);
  const [cleaningTime, setCleaningTime] = useState(user.cleaningTime);
  const [customerName, setCustomerName] = useState(user.customerName);
  const [customerAddress, setCustomerAddress] = useState(user.customerAddress);
  const refClose = useRef(null);
  //***************************

  const refreshBookings = async () => {
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

  const handleDelete = async (id) => {
    localStorage.removeItem("customers");
    await fetch(`${process.env.REACT_APP_BASE_URL}/api/bookingslot/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${customer.token}`,
      },
    });

    refreshBookings();
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

    refreshBookings();
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

    refreshBookings();
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

    refreshBookings();
  };

  return (
    <div className="container">
      <div className="content">
        <div className="text">
          <h4>Name: {user.customerName}</h4>
          <p>Address: {user.customerAddress}</p>
          <p>Date: {user.cleaningDate}</p>
          <p>Time: {user.cleaningTime}</p>
          <p>Type: {user.typePackage}</p>
          <p>Price: {user.price} kr</p>
        </div>

        <div className="dropdown">
          {user.cleaningDate >= date ? (
            <div>no reating</div>
          ) : user.status === "NOT_RATED" || user.status === null ? (
            <div>
              <button className="dropdown-btn">Rate This Cleaning</button>
              <div className="dropdown-content">
                <button
                  className="s-button"
                  onClick={() => handleSatisfying(user.id)}
                >
                  Satisfying
                </button>
                <button
                  className="u-button"
                  onClick={() => handleUnsatisfying(user.id)}
                >
                  Not satisfying
                </button>
              </div>
            </div>
          ) : user.status === "NOT_SATISFYING" || user.status === null ? (
            <div>
              <button className="dropdown-btn-n">Not satisfying</button>
              <div className="dropdown-content">
                <button
                  className="s-button"
                  onClick={() => handleSatisfying(user.id)}
                >
                  Satisfying
                </button>
                <button
                  className="u-button"
                  onClick={() => handleUnsatisfying(user.id)}
                >
                  Not satisfying
                </button>
              </div>
            </div>
          ) : user.status === "SATISFYING" || user.status === null ? (
            <div>
              <button className="dropdown-btn-s">SATISFYING</button>
              <div className="dropdown-content">
                <button
                  className="s-button"
                  onClick={() => handleSatisfying(user.id)}
                >
                  Satisfying
                </button>
                <button
                  className="u-button"
                  onClick={() => handleUnsatisfying(user.id)}
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
                <Button onClick={() => handleUpdate(user.id)}>update</Button>
                <Button ref={refClose} onClick={handleClose}>
                  close
                </Button>
              </Box>
            </Modal>
          </div>
        }
      </div>
      <button className="cancel-button" onClick={() => handleDelete(user.id)}>
        Cancel booking{" "}
      </button>
    </div>
  );
}
