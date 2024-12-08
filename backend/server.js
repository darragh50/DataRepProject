//Include express
const express = require('express');
const app = express();
//Set port number
const port = 4000;

//Enable CORS for your server
const cors = require('cors');
app.use(cors());

//This middleware setup allows your frontend app (React) to make API requests to the backend (Express) without encountering CORS-related issues
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//After installing body-parser to handle POST requests - Add body-parser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Emable mongoose for your server
const mongoose = require('mongoose');
//Connect to cluster using mongoose
mongoose.connect('mongodb+srv://admin:admin@cluster0.a06sv.mongodb.net/Recipes')

//Define schema and data model from mongoose
const recipeSchema = new mongoose.Schema({
  name:String,
  description:String,
  ingredients:[{type: String}],//Array
  steps:[{type: String}],//Array 
  times:String,//Could be stored as number but should only be used for display rather than any calculations(may change)
  serves:String,//Could be stored as number but should only be used for display rather than any calculations(may change)
  difficult:String,
  maincategory:String
});

//Set a new variable that has the values from above
const recipeModel = new mongoose.model('Recipe',recipeSchema, 'Recipe');

//Return the JSON data when a GET request is made to /api/recipes
app.get('/api/recipes', async (req, res) => {
  const recipes = await recipeModel.find({});
  res.status(200).json({recipes})
});

//Handle incoming POST requests
app.post('/api/recipes',async (req, res)=>{
  //console.log(req.body.name);
  const {name, description, ingredients, steps, times, serves, difficult, maincategory} = req.body;

  const newRecipe = new recipeModel({name, description, ingredients, steps, times, serves, difficult, maincategory});
  await newRecipe.save();

  res.status(201).json({"message":"Recipe Added!",Recipe:newRecipe});
})

//Client listening on port.. (4000)
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
