
import {useState } from "react";
import TimePicker from "react-time-picker";
import DatePicker from 'react-date-picker';
import "./DatePage.css"
import BronzePage from "../packagetype/BronzePage";

export default function DatePage() {
          

         const dateValue=new Date("01/01/2022 08:00 AM")
         const minValue=new Date()
         const maxValue=new Date("12/31/2023 04:00 PM")

         
         const minTValue="07:59"
         const maxTValue="16:00"
        
       
     
         const [dValue,setDValue]=useState(new Date());
         const [tValue,setTValue]=useState('08:00');

         const handleDate=(e)=>{
            if (e<=minTValue) {
            return(<div className="invalid">invalid time</div>);
           } 
           if (e>=maxTValue) {
            return(<div className="invalid" >invalid time</div>);
           }
           else{
               return(<div>{e}</div>);
           }
         }
        

       
    return(
    <div>          
      <TimePicker
       onChange={setTValue}
        value={tValue}   
        /> 
       <h2>{handleDate(tValue)}</h2> 
     
         <DatePicker
         onChange={setDValue}
         format="yyyy-mm-dd"
         value={dValue}
         minDate={minValue}
         maxDate={maxValue}
         />
         <h2>{dValue.toDateString()}</h2>
         

       </div>
    )
   }