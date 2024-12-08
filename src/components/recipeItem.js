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
    axios.delete('http://localhost:4000/api/recipe/' + props.myRecipe._id)
        .then(() => {
            props.Reload(); //Refreshes the movie list by calling the Reload function passed down as a prop
        })
        .catch((error) => {
            console.error("Error deleting recipe:", error);
        });
};

  return (
    <div>
      <Card>
        <Card.Header>{props.myRecipe.name}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <footer>{props.myRecipe.maincategory}</footer>
          </blockquote>
        </Card.Body>
        {/**Adds an "Edit" button to each movie item, allowing users to navigate to the edit page for that specific movie*/}
        <Link to={"/editRecipe/" + props.myRecipe._id} className="btn btn-primary">Edit</Link>
        {/**Button used to delete when clicked - "Danger" is the button style */}
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Card>
    </div>
  );
}

export default RecipeItem;