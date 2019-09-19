  import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'antd'

const SignedOut = () => {
  return (
    <div>
      <ul className="right">
        <li><NavLink to='/signup'>Signup</NavLink></li>
        <li><NavLink to='/signin'>Login</NavLink></li>
      </ul>
    </div>
  )
}

export default SignedOut