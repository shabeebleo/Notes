
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const cors = require("cors")
const app = express();

const port = 3001;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Adjust as needed
  allowedHeaders: ['Content-Type', 'Authorization'], // Include the necessary headers
  credentials: true  // Allow credentials
}));



app.use('/users', userRoutes);
app.use('/notes', noteRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
