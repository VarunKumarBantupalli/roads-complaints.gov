import React from 'react'
import { Link } from 'react-router-dom';
import Resolution from '../pages/Resolution';

const OfficerDashboard = () => {
  return (
    <div>
      <button className="bg-red-500 text-white px-4 py-2 rounded">
        <Link to="/logout">Logout</Link>
      </button>

      <Resolution/>

      <div className="h-screen bg-red-500">
        <h1 className='text-4xl font-bold'>THis is the officer page </h1>
      </div>
    </div>
  )
}

export default OfficerDashboard
