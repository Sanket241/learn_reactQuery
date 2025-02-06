import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <div>
        Header
      </div>
      <div > 

        <NavLink to="/" style={{padding:"2px",margin:"3px"}} >Home</NavLink>
        <NavLink to="/new" style={{padding:"2px",margin:"3px"}}>New</NavLink>
        <NavLink to="/old" style={{padding:"2px",margin:"3px"}}>Old</NavLink>
        {/* <NavLink to="/:id" style={{padding:"2px",margin:"3px"}}>ID</NavLink> */}
      </div>

    </>
  )
}

export default Header