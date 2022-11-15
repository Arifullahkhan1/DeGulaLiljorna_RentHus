import React from 'react'

export default async function Logout(props) {
    const {setLoggedInCustomer}=props
   
    const handleLogedOut=()=>{
      localStorage.clear(); // clear localStoage from save object
      setLoggedInCustomer(null)
    }
  return (
    <div>
       <button onClick={handleLogedOut}>Logout</button>
    </div>
  )
}
