const express = require('express');
const app = express();
const port = 3000;

//Middleware to parse JSON bodies
app.use(express.json());

app.post('/', (req, res) => {
  console.log(req.body); // Log the posted data
  res.send('POST request received');
});

// app.post('/adduser', (req, res) => {
//   res.send('User added');
// });


//Import database connection
const pool = require('./db');

//Import routes
const userRoutes = require('./routes/user');

//Use user routes
app.use('/api/user', userRoutes);

//Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the Express PostgreSQL CRUD API!');
});

//Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
