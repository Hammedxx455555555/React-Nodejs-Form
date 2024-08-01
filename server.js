import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';

const app = express();
const port = 4000;

mongoose.connect('mongodb://localhost:27017/React')
  .then(() => {
    console.log('Database connected...');
  })
  .catch((err) => {
    console.log('Failed to connect', err);
  });

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('reactut', userSchema);

app.use(cors({ origin: true }));
app.use(express.json());
app.use(bodyParser.json({ urlencoded: true }));

app.get('/', (req, res) => {
  res.send('Hello from express');
});

app.post('/sign', async (req, res) => {
  try {
    const { email, fname, lname, password } = req.body;

    const oldSignee = await User.findOne({ email });
    if (oldSignee) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fname,
      lname,
      email,
      password: encryptedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: { fname, lname, email } });
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({ message: 'Error saving user', error: err.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Error during login', error: err.message });
  }
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Listening on ${port}...`);
});
