import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import UserForm from './UserForm';
import AdminDashboard from './AdminDashboard';
import LoginForm from './LoginForm';
import ProtectedRoute from './ProtectedRoute';
import './App.css';  // Make sure your styles are loaded

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);  // Track login state

    return (
        <Router>
            <Routes>
                {/* Home page route */}
                <Route path="/" element={<HomePage />} />

                {/* Route for the UserForm component */}
                <Route path="/user" element={<UserForm />} />

                {/* Route for the AdminLogin component */}
                <Route path="/login" element={<LoginForm />} />

                {/* Protected route for the AdminDashboard */}
                <Route path="/admin" element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                        <AdminDashboard />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;
