import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>User Submissions</h1>
            <ul>
                {users.length > 0 ? users.map((user, index) => (
                    <li key={index}>
                        <p>Name: {user.name}</p>
                        <p>Handle: {user.handle}</p>
                        <div>
                            {user.images && user.images.map((image, i) => (
                                <img key={i} src={`http://localhost:5000/${image}`} alt={`Upload ${i}`} width="100" />
                            ))}
                        </div>
                    </li>
                )) : <p>No submissions found.</p>}
            </ul>
        </div>
    );
};

export default AdminDashboard;
