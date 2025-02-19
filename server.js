import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import cors from "cors"; // Import the cors package

configDotenv();
const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.URI;

app.use(cors()); // Use the cors middleware
app.use(express.json());

mongoose.connect(uri)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

// Define a schema and model for the Recepies
const recepieSchema = new mongoose.Schema({
  name: String,
  description: String,
  ingredients: [{ name: String, quantity: Number, unit: String }],
});
const Recepie = mongoose.model('Recepie', recepieSchema);

// Create
app.post('/api/recepies', async (req, res) => {
  try {
    const newRecepie = new Recepie(req.body);
    const savedRecepie = await newRecepie.save();
    res.status(201).json(savedRecepie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read all
app.get('/api/recepies', async (req, res) => {
  try {
    const recepies = await Recepie.find();
    res.json(recepies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read one
app.get('/api/recepies/:id', async (req, res) => {
  try {
    const recepie = await Recepie.findById(req.params.id);
    if (!recepie) return res.status(404).json({ message: 'Recepie not found' });
    res.json(recepie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update
app.put('/api/recepies/:id', async (req, res) => {
  try {
    const updatedRecepie = await Recepie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRecepie) return res.status(404).json({ message: 'Recepie not found' });
    res.json(updatedRecepie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete
app.delete('/api/recepies/:id', async (req, res) => {
  try {
    const deletedRecepie = await Recepie.findByIdAndDelete(req.params.id);
    if (!deletedRecepie) return res.status(404).json({ message: 'Recepie not found' });
    res.json({ message: 'Recepie deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/api', (req, res) => {
  res.send({ message: 'Hello from the API!' });
});
