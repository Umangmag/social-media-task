import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';  // Import the unified CSS

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Simulate authentication (replace with real auth logic)
            if (username === 'admin' && password === 'password123') {
                navigate('/admin');
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    }; 

    return (
        <div className="form-container">
            <h1>Admin Login</h1>
            <form onSubmit={handleLogin}>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                />

                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
