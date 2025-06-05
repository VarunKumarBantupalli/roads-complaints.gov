import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    return (
        <div>
            <button className="bg-red-500 text-white px-4 py-2 rounded">
                <Link to="/logout">Logout</Link>
            </button>

            <div className="h-screen bg-yellow-500">
                <h1 className='text-4xl font-bold'>This is the User page </h1>
            </div>
        </div>
    )
}

export default UserDashboard
