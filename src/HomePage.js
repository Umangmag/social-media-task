import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';  // Import the unified CSS

const HomePage = () => {
    const navigate = useNavigate();

    const goToUser = () => {
        navigate('/user');
    };

    const goToAdmin = () => {
        navigate('/login');
    };

    return (
        <div className="form-container">
            <h1>Welcome</h1>
            <p style={{ textAlign: 'center' }}>Who would you like to log in as?</p>
            <button onClick={goToUser} className="homepage-button">User</button>
            <button onClick={goToAdmin} className="homepage-button">Admin</button>
        </div>
    );
};

export default HomePage;
