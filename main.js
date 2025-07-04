const express = require('express');
const app = express();
const port = 4000;

// Middleware to parse JSON body
app.use(express.json());

// In-memory user data
let users = [
  { id: 1, name: 'Amulya',email:'amulyaanapuram03@gmail.com'},
  { id: 2, name: 'anju' ,email:'anju@gmail.com'}
  
];

// READ all users
app.get('/users', (req, res) => {
  res.json(users);
});

// READ one user by ID

app.get('/users/:id', (req, res) => {
    //const id=parseInt(req.parse.id) 
    const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id)
  if (!user) return res.status(404).json({message :'User not found'});
  res.json(user);
});
//add a new student
app.post('/users',(req,res) => {
    const { name, email } = req.body;
    const newuser = {id: users.length + 1,name,email};
    users.push(newuser);
    res.status(201).json(newuser);
});
// update student by id
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    const user = users.find(u => u.id === id);

    if (!user)  return res.status(404).json({ message: 'student not found' });

    user.name = name || user.name;
    user.email = email || user.email;

    res.json(user);
});
// Delete student by ID
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) return res.status(404).json({ message: 'Student not found' });

    const removedUser = users.splice(userIndex, 1);
    res.json(removedUser[0]);
});


app.listen(port, ()=> {
    console.log('server is running at http://localhost:${port}');
});