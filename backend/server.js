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
  image:String,
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

//Data controlling below
//.get is used when you want to retrieve data
//.post is used when you want to submit data
//.put is used to update or replace an existing resource on a server
//.listen tells server to start accepting requests

//Return the JSON data when a GET request is made to /api/recipes
app.get('/api/recipes', async (req, res) => {
  const recipes = await recipeModel.find({});
  res.status(200).json({recipes})
});

//This route fetches a specific recipe by its ID - _id is found in the MongoDB cluster
app.get('/api/recipes/:id', async (req, res) => {
  let recipe = await recipeModel.findById({ _id: req.params.id });
  res.send(recipe);
});

//This route updates a specific recipe’s information
app.put('/api/recipes/:id', async (req, res) => {
  let recipe = await recipeModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(recipe);
});

//Handles delete requests by removing the specified recipe from the MongoDB database
app.delete('/api/recipes/:id', async (req, res) => {
  //Sends a success or error response based on the outcome of the operation.  
  //console.log('Deleting recipe with ID:', req.params.id);
  const recipe = await recipeModel.findByIdAndDelete(req.params.id);
  res.status(200).send({ message: "Recipe deleted successfully", recipe });
})

//Handle incoming POST requests
app.post('/api/recipes',async (req, res)=>{
  //console.log(req.body.name);
  const {image, name, description, ingredients, steps, times, serves, difficult, maincategory} = req.body;

  const newRecipe = new recipeModel({image, name, description, ingredients, steps, times, serves, difficult, maincategory});
  await newRecipe.save();

  res.status(201).json({"message":"Recipe Added!",Recipe:newRecipe});
})

//Client listening on port.. (4000)
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});







//Dataset in cluster 
/*[
  {
    "image":"https://images.immediate.co.uk/production/volatile/sites/30/2020/08/apple-pie-0fb9ad7.jpg",
    "name":"Easy apple pie",
    "description":"Kids will love to help make and eat this comforting, classic fruity pudding with homemade shortcrust pastry",
    "ingredients":[
       "225g plain flour",
       "140g butter or margarine",
       "3 large cooking apples",
       "2 tbsp honey",
       "pinch of cinnamon",
       "pinch of mixed spice",
       "1 egg, beaten",
       "crème fraîche, vanilla ice cream or natural yogurt, to serve"
    ],
    "steps":[
       "Heat oven to 200C/180C fan/gas 6. To make the pastry, sift the flour into a large mixing bowl and add the butter or margarine. Using your fingers, mix together until the mixture resembles breadcrumbs.",
       "Add about 3 tbsp cold water – 1 tbsp at a time – to bind the mixture into a ball. Then wrap it in cling film and leave to chill in the fridge while you prepare the apples, or for 30 mins if you have time.",
       "While the pastry is chilling, core the apples, then cut into even-sized chunks so they all cook in the same amount of time. Put the apples into the pie dish, drizzle over the honey and add the cinnamon, mixed spice and about 2 tbsp water.",
       "Roll out the pastry on a floured work surface until it is large enough to cover the pie dish. Using the rolling pin, carefully lift the pastry and lay it over the top of the apple mixture. Carefully trim off the excess pastry (this can be rerolled and cut into shapes to decorate the pie crust if you like) and press the pastry edges onto the dish to create a seal.",
       "Make a small cut in the pastry so that the air can escape during cooking, then brush with beaten egg to glaze.",
       "Bake the pie in the oven for 20-30 mins until the pastry is golden and sandy in appearance and the apple filling is bubbling and hot. Serve while still warm with crème fraîche, ice cream or natural yogurt."
    ],
    "times":{
       "Preparation":"30 mins",
       "Cooking":"20 mins - 30 mins"
    },
    "serves":4,
    "difficult":"Easy",
    "maincategory":"baking"
 },
 {
    "image":"https://images.immediate.co.uk/production/volatile/sites/30/2020/08/twirlies-0f396b3.jpg",
    "name":"Curly twirlies",
    "description":"Use ready-to-roll croissant pastry to create these chocolate and toffee-filled treats that are gooey and sticky when eaten warm",
    "ingredients":[
       "140g soft toffee",
       "2 x tubes of 6 ready-to-roll croissants (we used Jus Rol)",
       "100ml milk",
       "50g dark chocolate drops- or use a block of chocolate and roughly chop",
       "golden icing sugar, for dusting"
    ],
    "steps":[
       "Heat oven to 200C/180C fan/gas 6. Put the toffees into a small pan with the milk and melt over a very low heat, stirring occasionally to bring together to a smooth sauce. Cool off the heat for 1-2 mins until a little less molten and thickened slightly.",
       "Cover two baking sheets with baking parchment. Unroll one tube of croissant dough. Pinch together the diagonal perforated seams, but divide the dough into three rectangles along the straight crossing seams. Cut each rectangle into 4 long, thin strips – so you end up with 12. Drizzle a little toffee along the length of each strip, then scatter with some chocolate drops. Unroll the other dough and cut into the same size strips, then sandwich together with the toffee-choc covered ones. Holding the ends of each strip, twist tightly and lay on the prepared baking sheets – they’ll expand a little.",
       "Once all are shaped, bake for 12-15 mins until golden and crisp. Dust with a little golden icing sugar to serve and enjoy best, freshly baked."
    ],
    "times":{
       "Preparation":"20 mins",
       "Cooking":"20 mins"
    },
    "serves":12,
    "difficult":"Easy",
    "maincategory":"baking"
 },
 {
    "image":"https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1136490_11-2de86c5.jpg",
    "name":"Sausage plait",
    "description":"A step-by-step recipe for kids from CBeebies series 'i can cook'- the roll contains peppers and chilli and teaches pastry skills",
    "ingredients":[
       "a little oil, for greasing",
       "400g pack pork and apple sausage - about 6 fat sausages ",
       "1 roasted red pepper from a jar, patted dry with kitchen paper",
       "1 large egg",
       "½ tsp chilli flakes (optional)",
       "2 tbsp tomato puree",
       "flour, for dusting",
       "250g ready-made puff pastry",
       "baked beans or salad, to serve"
    ],
    "steps":[
       "Heat oven to 200C/180C fan/ gas 6. Grease a baking tray with oil using a pastry brush, then cover it with baking parchment. Put to one side. Remove the meat from the sausage skins by snipping off the ends, then squeezing the sausagemeat into a bowl (see step 1).",
       "Cut the pepper into small pieces with scissors. Break the egg into the cup, beat with a fork, and save 2 tbsp for glazing. Add the red pepper and remaining egg to the sausagemeat with the chilli flakes, if using, and puree. Mix well with a fork or clean hands (step 2).",
       "Sprinkle some flour on the work surface. Using a rolling pin, roll out the pastry into a rough square shape, about 30 x 30cm. Put the pastry on the lined baking tray (step 3).",
       "Now spoon the filling down the middle of the pastry in a sausage shape – leave a little gap at the top and bottom (about 3cm) (step 4).",
       "Cut the pastry at a slight diagonal, on either side of the filling, into 1.5cm strips, the same number each side – we cut 12 strips each side. Brush the pastry all over with most of the saved egg (step 5).",
       "Tuck the top and bottom edges of the pastry over the filling. Starting at the top, lay the pastry strips over the filling, taking one from each side, to cross like a plait. Now brush the top all over with the last of the egg. Bake for 35-40 mins or until golden. Serve hot or cold with baked beans or salad (step 6)."
    ],
    "times":{
       "Preparation":"30 mins",
       "Cooking":"40 mins"
    },
    "serves":4,
    "difficult":"Easy",
    "maincategory":"baking"
 },
 {
    "image":"https://images.immediate.co.uk/production/volatile/sites/30/2020/08/cheese-stars-c3c0024.jpg",
    "name":"Cheese stars",
    "description":"Show off your cooking skills and get in the festive spirit with these fun looking easy cheesy treats - they make great party snacks for grazing guests",
    "ingredients":[
       "320g puff pastry sheet",
       "mugful of grated cheese (we mixed 60g cheddar with 25g parmesan)",
       "flour, for dusting",
       "2 tbsp milk",
       "toppings of your choice (optional) - we used poppy seeds, dried oregano and sesame seeds"
    ],
    "steps":[
       "Unroll the pastry and sprinkle most of the cheese over one half of the sheet. Fold the pastry in half to cover the cheese and seal it in.",
       "Dust your rolling pin and work surface with a little flour and put your pastry sheet on it. Roll it out until doubled in size.",
       "Heat oven to 200C/180C fan/gas 6 and line two baking sheets with baking parchment.",
       "Using cookie cutters, cut the pastry into shapes and put them on the prepared baking sheets. (Put the cutters on the dough close together so that less pastry is wasted. You can fold the trimmings back on themselves and re-roll to cut out more shapes.)",
       "Brush the shapes with milk and add a pinch of cheese and a sprinkling of your chosen topping, if using.",
       "Bake in the oven for 10-12 mins or until risen and golden, then transfer to a serving plate. Will keep in an airtight container for 3 days."
    ],
    "times":{
       "Preparation":"15 mins",
       "Cooking":"10 mins - 12 mins"
    },
    "serves":20,
    "difficult":"Easy",
    "maincategory":"baking"
 },
 {
    "image":"https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1090953-7dd7c32.jpg",
    "name":"Vegetable fritters",
    "description":"Crispy vegetable fritters are perfect for lunch or dinner. Easy to make, and great for kids – serve with a tomato or yogurt dip",
    "ingredients":[
       "2 medium potatoes, peeled and grated",
       "2 medium carrots, peeled and grated",
       "2 tbsp plain flour",
       "2 tbsp cornflour",
       "1 tsp baking powder",
       "1 large egg, beaten",
       "2 tbsp vegetable oil"
    ],
    "steps":[
       "Mix all the ingredients together in a bowl and stir with a wooden spoon until the mixture is well combined.",
       "Heat the oil in a large frying pan over a medium-high heat.",
       "Spoon out tablespoonfuls of the mixture and flatten each spoonful with the back of the spoon to form a fritter.",
       "Fry the fritters for 3-4 mins on each side or until golden and crispy.",
       "Drain on kitchen paper before serving. Great with a dollop of tomato ketchup or natural yogurt."
    ],
    "times":{
       "Preparation":"10 mins",
       "Cooking":"10 mins"
    },
    "serves":2,
    "difficult":"Easy",
    "maincategory":"baking"
 }
]*/
