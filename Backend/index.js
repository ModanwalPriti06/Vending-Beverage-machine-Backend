
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Beverage = require('./models/beverage');
const Inventory = require('./models/inventory');

const app = express();
app.use(cors());

mongoose.connect('mongodb://localhost:27017/Vending_Machine', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

app.use(express.json());

// Get beverages
app.get("/api/beverage", async (req, res) => {
    try {
        const response = await Beverage.find();
        return res.status(200).send(response);
    }
    catch (err) {
        console.error(err);
        return res.status(400).send(err);
    }
});

// Get Inventory
app.get("/api/inventory", async (req, res) => {
    try {
        const response = await Inventory.find();
        return res.status(200).send(response);
    }
    catch (err) {
        console.error(err);
        return res.status(400).send(err);
    }
});

// add ingredient
app.post("/api/add_ingredient", async (req, res) => {
    try {
        const {id, value} = req.body;
        const response = await Inventory.findOneAndUpdate({ _id: id } ,{$inc: {value : value}}, {new: true});
        return res.status(200).send('Added Successfully!');
    }
    catch (err) {
        console.error(err);
        return res.status(400).send(err);
    }
});

//depense beverage
app.post("/api/dispense_beverage", async (req, res) => {
    try {
        const {beverageId} = req.body;
        const bev = await Beverage.findById(beverageId);
        const ingredient = bev.ingredients;
        
  // 2️⃣ Build a bulkWrite array of decrement ops
  const ops = Object.entries(ingredient).map(([name, qty]) => ({
    updateOne: {
      filter: { name },              
      update: { $inc: { value: -qty } } 
    }
  }));
  // 3️⃣ Execute all decrements in one go
  const bulkResult = await Inventory.bulkWrite(ops);

        return res.status(200).send(ingredient);
    }

    catch (err) {
        console.error(err);
        return res.status(400).send(err);
    }
});



app.listen(5000, () => {
    console.log('Server listening on 5000...');
})