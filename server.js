require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Database connection failed:", err));

app.get('/', (req, res) => {
  res.json({ message: "Hiiiii My Blog Backend running" });
});

const PORT = 5000;
const postRoutes = require('./routes/posts');
app.use('/api/posts', postRoutes);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});