import React from 'react';
 import { useParams } from 'react-router-dom';
 import { useState, useEffect } from 'react';
 import axios from 'axios';
 import { useNavigate } from "react-router-dom";

 export default function EditRecipe(props) {
   //Is used to get the id of the movie from the URL
   let { id } = useParams();
   //Set all variables
   const [name, setName] = useState('')
   const [image, setImage] = useState('')
   const [description, setDescription] = useState('')
   const [ingredients, setIngredients] = useState([])//Array
   const [steps, setSteps] = useState([])//Array
   const [times, setTimes] = useState('')
   const [serves, setServes] = useState('')
   const [difficult, setDifficult] = useState('')
   const [maincategory, setMainCategory] = useState('')
   //This hook, also provided by React Router, returns a function that enables navigation to different routes programmatically
   const navigate = useNavigate();

//useEffect hook allows you to perform side effects in your components
 useEffect(() => {
     axios.get('http://localhost:4000/api/recipes/' + id)
         .then((response) => {
            setName(response.data.name);
            setImage(response.data.image);
            setDescription(response.data.description);
            setIngredients(response.data.ingredients);
            setSteps(response.data.steps);
            setTimes(response.data.times);
            setServes(response.data.serves);
            setDifficult(response.data.difficult);
            setMainCategory(response.data.maincategory);
         })
         .catch((error) => {
             console.log(error);
         });
 }, [id]);//[id] stops unnecessary network requests by only running when id changes

 //Send data entered to /read  
 const handleSubmit = (event) => {
     event.preventDefault();
     const newRecipe = { id, name, image, ingredients, description, steps, times, serves, difficult, maincategory};
     axios.put('http://localhost:4000/api/recipes/' + id, newRecipe)
         .then((res) => {
             console.log(res.data);
             navigate('/read');
         });
 }

 //Update values entered by user. Same form as addRecipe.js except for line 120
 return (
     <div>
         <form onSubmit={handleSubmit}>
         <div className="form-group">
                    <label>Add Recipe Name: </label>
                    <input type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Recipe Image: </label>
                    <input type="text"
                        className="form-control"
                        value={image}
                        onChange={(e) => { setImage(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Recipe Description: </label>
                    <input type="text"
                        className="form-control"
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Recipe Ingredients: </label>
                    <input type="text"
                        className="form-control"
                        value={ingredients}
                        onChange={(e) => { setIngredients(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Recipe Steps: </label>
                    <input type="text"
                        className="form-control"
                        value={steps}
                        onChange={(e) => { setSteps(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Recipe Times: </label>
                    <input type="text"
                        className="form-control"
                        value={times}
                        onChange={(e) => { setTimes(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Recipe Serves: </label>
                    <input type="text"
                        className="form-control"
                        value={serves}
                        onChange={(e) => { setServes(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Recipe Difficulty: </label>
                    <input type="text"
                        className="form-control"
                        value={difficult}
                        onChange={(e) => { setDifficult(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Recipe Category: </label>
                    <input type="text"
                        className="form-control"
                        value={maincategory}
                        onChange={(e) => { setMainCategory(e.target.value) }}
                    />
                </div>
             <div className="form-group">
                 <input type="submit" value="Edit Recipe" className="btn btn-primary" />
             </div>
         </form>
     </div>
    );
 }
