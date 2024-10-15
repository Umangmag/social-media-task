import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Import the unified CSS

const UserForm = () => {
    const [name, setName] = useState('');
    const [handle, setHandle] = useState('');
    const [images, setImages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('handle', handle);
        images.forEach(image => formData.append('images', image));

        try {
            await axios.post('http://localhost:5000/submit', formData);
            alert('Submission successful');
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    };

    return (
        <div className="form-container">
            <h1>User Submission Form</h1>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Enter your name" 
                    required 
                />

                <label>Social Media Handle:</label>
                <input 
                    type="text" 
                    value={handle} 
                    onChange={(e) => setHandle(e.target.value)} 
                    placeholder="Enter your social media handle" 
                    required 
                />

                <label>Upload Images:</label>
                <input 
                    type="file" 
                    multiple 
                    onChange={(e) => setImages([...e.target.files])} 
                    required 
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default UserForm;
