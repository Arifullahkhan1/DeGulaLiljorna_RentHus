import React from 'react'

export default async function Logout(props) {
    const {setLoggedInCustomer}=props
   
  return (
    <div>
       <button onClick={() => setLoggedInCustomer(null)}>Logout</button>
    </div>
  )
}
