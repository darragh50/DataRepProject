import { useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from "axios";

//Component for recieving the info from cluster e.g name
const RecipeItem = (props)=> {
    //useEffect() used to log the recipe prop
    useEffect(() => {
    console.log("Recipe Item:", props.myrecipe);
  }, [props.myrecipe]); //Only run this effect when the mymovie prop changes

//HandleDelete Function
const handleDelete = (e) => {
  //Stops it being called multiple times
  e.preventDefault();
  //Call axios to use the http delete function and assign the url + movieID
    axios.delete('http://localhost:4000/api/recipes/' + props.myRecipe._id)
        .then(() => {
            props.Reload(); //Refreshes the movie list by calling the Reload function passed down as a prop
        })
        .catch((error) => {
            console.error("Error deleting recipe:", error);
        });
};

return (
  <div className="recipe-item">
      <Card className="recipe-card">
          <Card.Header style={{ backgroundColor: '#ff6347', color: 'white' }}>
              <h5>{props.myRecipe.name}</h5>
          </Card.Header>
          <Card.Body>
              <blockquote className="blockquote mb-0">
                {/**<Strong> used for styling (bold) */}
                  <img src={props.myRecipe.image} alt={props.myRecipe.name} className="recipe-image" />
                   <p><strong>Description:</strong> {props.myRecipe.description}</p>
                   <p><strong>Ingredients:</strong> {props.myRecipe.ingredients.join(', ')}</p>
                   <p><strong>Steps:</strong> {props.myRecipe.steps.join(', ')}</p>
                   <p><strong>Cooking Time:</strong> {props.myRecipe.times} mins</p>
                   <p><strong>Serves:</strong> {props.myRecipe.serves}</p>
                   <p><strong>Difficulty:</strong> {props.myRecipe.difficult}</p>
                 <footer className="recipe-category">
                    <strong>Category:</strong> {props.myRecipe.maincategory}
                 </footer>
              </blockquote>
          </Card.Body>
          <Card.Footer>
              <div className="d-flex justify-content-between">
                  {/**Adds an "Edit" button to each recipe item, allowing users to navigate to the edit page for that specific recipe*/}
                  <Link to={"/editRecipe/" + props.myRecipe._id} className="btn btn-primary">Edit</Link>
                  {/**Button used to delete when clicked - "Danger" is the button style */}
                  <Button variant="danger" onClick={handleDelete}>Delete</Button>
              </div>
          </Card.Footer>
      </Card>
  </div>
);
}

export default RecipeItem;