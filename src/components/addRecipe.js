import axios from "axios";
import { useState } from "react";

const AddRecipe = () => {

    //Declare & set variables. Found in mongoDB cluster
    //useState used to add a state variable to my components
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState([])//Array
    const [steps, setSteps] = useState([])//Array
    const [times, setTimes] = useState('')
    const [serves, setServes] = useState('')
    const [difficult, setDifficult] = useState('')
    const [maincategory, setMainCategory] = useState('')

    //Used for when the user wants to submit the form
    const handleSubmit = (e) => {
        //Prevents the default behavior of an element from triggering
        e.preventDefault();
  
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
                <div>
                    <input type="submit" value="Add Recipe"></input>
                </div>
            </form>
        </div>
    );
}
export default AddRecipe;