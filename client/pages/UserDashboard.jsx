import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Complaint from '../pages/Complaint';
import Navbar from '../components/Navbar';


const UserDashboard = () => {
    return (
        <div>
           
            <Navbar/>
            <Complaint/>

        </div>
    )
}

export default UserDashboard
