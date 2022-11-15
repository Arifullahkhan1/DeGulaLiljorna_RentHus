import "./App.css";
import { useState, useEffect } from "react";
import Login from "./servicepages/login/Login";
import Topbar from "./component/Topbar";
import MainPage from "./bookingcomponent/MainPage";
import Register from "./servicepages/register/Register";
import Home from "./Pages/Home";
import About from "./Pages/About";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Contact from "./Pages/Contact";
import BookingSlots from "./bookingcomponent/BookingSlots";
import Customer from "./bookingcomponent/Customer";
import GoldPage from "./packagetype/GoldPage";
import SilverPage from "./packagetype/SilverPage";
import BronzePage from "./packagetype/BronzePage";

function App() {
  const [customer, setLoggedInCustomer] = useState(null);
  
  useEffect(() => {
    let newcustomer = localStorage.getItem("customer");

    setLoggedInCustomer(JSON.parse(newcustomer));
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Topbar
              customer={customer}
              setLoggedInCustomer={setLoggedInCustomer}
            />
          }
        >
          <Route index element={<MainPage />}></Route>
          <Route
            path="/login"
            element={<Login setLoggedInCustomer={setLoggedInCustomer} />}
          ></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/mainpage" element={<MainPage />}></Route>
          <Route
            path="/customer"
            element={<Customer customer={customer}  />}
          ></Route>
          <Route path="/bookingSlots" element={<BookingSlots />}></Route>
          <Route
            path="/goldpackage"
            element={
              <GoldPage
                customer={customer}
                typePackage="GoldPackage"
                price="3000"
              />
            }
          ></Route>

          <Route
            path="/silverpackage"
            element={
              <SilverPage
                customer={customer}
                typePackage="SilverPackage"
                price="2000"
              />
            }
          ></Route>

          <Route
            path="/bronzepackage"
            element={
              <BronzePage
                customer={customer}
                typePackage="BronzePackage"
                price="1000"
              />
            }
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
