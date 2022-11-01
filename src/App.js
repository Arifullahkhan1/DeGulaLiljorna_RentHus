import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Login from './servicepages/login/Login';
import Topbar from './component/Topbar';
import MainPage from './bookingcomponent/MainPage';
import Register from './servicepages/register/Register';
import Home from './Pages/Home';
import About from './Pages/About';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Logout from './Pages/Logout';
import Contact from './Pages/Contact';
import BookingSlots from './bookingcomponent/BookingSlots';
import Customer from './bookingcomponent/Customer';
import GoldPage from './packagetype/GoldPage';
import SilverPage from './packagetype/SilverPage';
import BronzePage from './packagetype/BronzePage';

function App() {
  
  const [customer, setLoggedInCustomer] = useState(null);
  return(

    <BrowserRouter>
    <Routes>
      
    <Route  path='/' element={<Topbar customer={customer} setLoggedInCustomer={setLoggedInCustomer} />}>
        <Route index element={<MainPage customer={customer} />}></Route>
        <Route path='/login' element={<Login setLoggedInCustomer={setLoggedInCustomer} />}></Route>
        <Route path='/register' element={<Register  />}></Route>
        <Route path='/home' element={<Home  />}></Route>
        <Route path='/contact' element={<Contact  />}></Route>
        <Route path='/about' element={<About  />}></Route>
        <Route path='/mainpage' element={<MainPage  />}></Route>
        <Route path='/customer' element={<Customer customer={customer} />}></Route>
        <Route path='/bookingSlots' element={<BookingSlots />}></Route>
        <Route path='/goldpackage' element={<GoldPage />}></Route>
        <Route path='/silverpackage' element={<SilverPage />}></Route>
        <Route path='/bronzepackage' element={<BronzePage />}></Route>
        </Route>
    </Routes>
  </BrowserRouter>
  
  );
}

export default App;


/*     

const [loggedInCustomer, setLoggedInCustomer] = useState(null);
    {loggedInCustomer

      ?

      <div>
     <h1>{loggedInCustomer.username}´s todo sida</h1>
        <Test customer={loggedInCustomer}/>
      </div>

      :

      <Login setLoggedInCustomer={setLoggedInCustomer}/>

    } */
       /* <RegisterCustomer/> */
   
      /*  <BrowserRouter>
       <Routes>
         <Route path='/' element={<Layout />}>
           <Route index element={<Register />}></Route>
           <Route path='/contact' element={<Contact />}></Route>
           <Route path='/about' element={<About />}></Route>
         </Route>
       </Routes>
     </BrowserRouter> 
     
     <BrowserRouter>
    <Routes>
      <Route  path='/' element={<Topbar />}>
        <Route index element={<MainPage />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/about' element={<About />}></Route>
        </Route>
        <Route path='login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        
       
     
    </Routes>
  </BrowserRouter>
     */