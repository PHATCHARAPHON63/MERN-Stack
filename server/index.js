const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');


const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();

mongoose.connect(process.env.DATA)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));




app.get('/users', async (req, res) => {  // Correct endpoint
    try {
        const users = await UserModel.find({}); 
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/getUser/:id',(req,res) => {
  const id = req.params.id;
  UserModel.findById({_id:id})
  . then(users => res. json(users))
  .catch(err => res.json(err))
})

app.put('/updateUser/:id', (req, res) => {
  const id = req.params.id;

  UserModel.findByIdAndUpdate(
    { _id: id }, 
    {
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      nickname: req.body.nickname,
      birthdate: req.body.birthdate,
      age: req.body.age,
      gender: req.body.gender
    },
    { new: true } // เพิ่ม option new: true เพื่อ return document ที่อัปเดตแล้ว
  )
  .then(updatedUser => {
    if (!updatedUser) { 
      return res.status(404).json({ message: "User not found" }); // ถ้าไม่พบ user ให้ส่ง 404
    }
    res.json(updatedUser);
  })
  .catch(err => {
    console.error("Error updating user:", err); // log error ที่ console
    res.status(500).json({ message: "Internal server error" }); // ส่ง 500 internal server error
  });
});


app.post("/createUser", async (req, res) => {
    UserModel.create(req.body)
    .then(users => res. json(users))
    .catch(err => res. json(err))
});

app.delete('/deleteUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({_id: id})
  .then(res => res. json(res))
  .catch(err => res.json(err))
})

app.listen(3001, () => {
  console.log("Server is Running");
});

// In your Express index.js file:
app.use(cors({
    origin: 'http://localhost:5173' // Replace with your frontend's URL
}));