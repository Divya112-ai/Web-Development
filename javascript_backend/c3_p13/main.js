import express from 'express';
import mongoose from 'mongoose';
import Employee from './models/employee.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

// Connect to MongoDB
await mongoose.connect('mongodb://localhost:27017/company');
console.log('MongoDB connected');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Home route
app.get('/', (req, res) => {
  res.render('index');
});

// Generate employees route
app.get('/generate', async (req, res) => {
  try {
    for (let i = 1; i <= 10; i++) {
      const emp = new Employee({
        name: "manpreet",
        position: "manager",
        department: "employeeee"
      });
      await emp.save();
    }
    res.json({ message: '10 Employees Generated' }); // ✅ send JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error generating employees' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});