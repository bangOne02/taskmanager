const express = require('express');
const cors = require('cors');
// require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(3000, () => {
    console.log('Server running di port 3000');
});

//token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZ3VzQGdtYWlsLmNvbSIsImlhdCI6MTc4MDA0MzMwMCwiZXhwIjoxNzgwMTI5NzAwfQ.47DORbfVQctQUOZfkzAyNJ1ranDrw-H8SxhXUkXwN7Q