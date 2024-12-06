import axios from "axios";
import { useState } from "react";

const AddRecipe = () => {

    //Declare & set variables. Found in mongoDB cluster
    //useState used to add a state variable to my components
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState([])//Array
    const [steps, setSteps] = useState([])//Array
    const [newIngredient, setNewIngredient] = useState(''); // New state for new ingredient
    const [newStep, setNewStep] = useState(''); // New state for new step
    const [times, setTimes] = useState('')
    const [serves, setServes] = useState('')
    const [difficult, setDifficult] = useState('')
    const [maincategory, setMainCategory] = useState('')

    //Used for when the user wants to submit the form
    const handleSubmit = (e) => {
        //Prevents the default behavior of an element from triggering
        e.preventDefault();

        //If-statement used to add the last ingredient and step to the arrays if they are not already empty
        //push() adds the specified elements to the end of an array
        //.trim is used to remove empty white spaces
         // Add new ingredient and step to the arrays if they're not empty
        if (newIngredient.trim()) 
        {
            setIngredients(prevIngredients => [...prevIngredients, newIngredient.trim()]);
            setNewIngredient(''); // Clear the input field
        }
  
        if (newStep.trim()) 
        {
            setSteps(prevSteps => [...prevSteps, newStep.trim()]);
            setNewStep(''); // Clear the input field
        }
  
        const recipe = {name, description, ingredients, steps, times, serves, difficult, maincategory};
        //Debugging
        console.log(recipe);

        //Use axios to post data from above to the server
        axios.post('http://localhost:4000/api/recipes',recipe)
        .then((res)=>
            {console.log(res.data)})
        .catch();
    }

    //Create text fields so user can input values
    //Returns entered values once button is clicked
    return (
        <div>
            <h3>Hello from create component!</h3>
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
                        value={newIngredient}
                        onChange={(e) => { setNewIngredient(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label>Add Recipe Steps: </label>
                    <input type="text"
                        className="form-control"
                        value={newStep}
                        onChange={(e) => { setNewStep(e.target.value) }}
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
                <div>
                    <input type="submit" value="Add Recipe"></input>
                </div>
            </form>
        </div>
    );
}
export default AddRecipe;