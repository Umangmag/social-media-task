const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Added body-parser for form handling

// Initialize Express app
const app = express();

// Use CORS middleware to allow requests from the frontend
app.use(cors());

// Use JSON parser middleware to handle JSON requests
app.use(bodyParser.json()); // Added body-parser to handle form data
app.use(bodyParser.urlencoded({ extended: true })); // To handle form submissions

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  // Ensure this folder exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);  // Unique filenames
    }
});
const upload = multer({ storage });

// MongoDB model for User
const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    handle: String,
    images: [String]
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/social_media_task', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

// Admin login credentials (you should store this securely in production)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password123';

// API route for admin login
app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        return res.json({ success: true, message: 'Admin authenticated successfully' });
    }
    return res.json({ success: false, message: 'Invalid credentials' });
});

// API route to handle user submission
app.post('/submit', upload.array('images'), async (req, res) => {
    const { name, handle } = req.body;
    const imagePaths = req.files.map(file => file.path);

    // Log the form data and image paths to the terminal
    console.log("Form Data Received:", req.body);
    console.log("Image Paths:", imagePaths);

    // Save the user to MongoDB
    const user = new User({ name, handle, images: imagePaths });

    try {
        await user.save();
        console.log("User saved successfully:", user);
        res.status(201).send('User submitted successfully');
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send('Error saving user');
    }
});

// API route to fetch all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();  // Fetch all users from MongoDB
        res.json(users);  // Return users as JSON
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
});

// Serve uploaded images
app.use('/uploads', express.static('uploads'));

// Start the server
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});

app.get('*', (req, res) => {
    res.status(404).send('Route not found');
  });
  
