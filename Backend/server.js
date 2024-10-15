const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    handle: String,
    images: [String]
}));

mongoose.connect(`${process.env.MONGO_URL}/social_media_task`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password123';

app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        return res.json({ success: true, message: 'Admin authenticated successfully' });
    }
    return res.json({ success: false, message: 'Invalid credentials' });
});

app.post('/submit', upload.array('images'), async (req, res) => {
    const { name, handle } = req.body;
    const imagePaths = req.files.map(file => file.path);

    console.log("Form Data Received:", req.body);
    console.log("Image Paths:", imagePaths);

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

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
});

app.use('/uploads', express.static('uploads'));

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
