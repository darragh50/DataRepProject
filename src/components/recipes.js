//Import child component
import RecipeItem from "./recipeItem";

//Receives props from its RecipeItem (parent)
function Recipes(props) {
    console.log("Recipes data:", props.myRecipes); //Debug
    return (
        <>
        {/**Array of recipes 
         * .map() iterates over each recipe in the array and renders a RecipeItem component
         * unique id - (_id) - from mongoDB cluster
         * ReloadData - callback function for refreshing
        */}
            {props.myRecipes.map((recipe) => (
                <RecipeItem
                    myRecipe={recipe}
                    key={recipe._id}
                    Reload={props.ReloadData}
                />
            ))}
        </>
    );
}

export default Recipes;