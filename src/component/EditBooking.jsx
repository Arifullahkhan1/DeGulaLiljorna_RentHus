
import { useState,useRef } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  disply:'none'
};

 


export const EditBooking = (props) => {
    //matrialUl conts *****************
    const {customer,setCustomers}=props
 const [open, setOpen] = useState(false);
 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);
 const [cleaningDate, setCleaningDate] = useState(new Date());
 const [cleaningTime, setCleaningTime] = useState("08:00");
 const [customerName, setCustomerName] = useState(customer.username);
 const [customerAddress, setCustomerAddress] = useState(customer.address);



  //const ref = useRef(null);
  const refClose = useRef(null);
   
 // Handale update
    const hadleUpdate = async (id) => {

    refClose.current.click();
       
          
    
        await fetch(`${process.env.REACT_APP_BASE_URL}/api/bookingslot/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${customer.token}`
            },
            body: JSON.stringify({ 
                customerName: customerName,
                customerAddress: customerAddress,
                cleaningDate: cleaningDate,
                cleaningTime: cleaningTime,
                
            })
        })
    
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/customer/${customer.id}`, {
            headers: {
                Authorization: `Bearer ${customer.token}`
            }
        })
        let customers = await response.json()
       
        setCustomers(customers);
    
        
    }
    

    return (
    
        <div >
           
          {/* Mattarial Ui Mpdel*/}
         
          <Button   onClick={handleOpen}>Edit</Button>
          
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
            '& > :not(style)': { m: 1, width: '25ch' },
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
            <Button    onClick={()=>hadleUpdate(customer.id)} >update</Button>
            <Button ref={refClose} onClick={handleClose}>close</Button>
            </Box>
          </Modal>
          
          
        </div>
       
      );
    };