import Recipes from "./recipes";
import { useEffect, useState } from "react";
import axios from "axios";

const Read = () => {

  const [data, setData] = useState([]);

  //Defines and manages the Reload function, which fetches updated recipe data from the server and updates the state
  const Reload = () => {
    console.log("Reloading recipe data...");
    axios.get('http://localhost:4000/api/recipes')
        .then((response) => {
            setData(response.data.recipes);
        })
        .catch((error) => {
            console.error("Error reloading data:", error);
        });
};

//Call reload()
  useEffect(() => {
    Reload();
  },[]);

  return (
    <div>
      <h2>Recipe List</h2>
      {/**Return the Reload() function */}
      <Recipes myRecipes={data} ReloadData={Reload} />
    </div>
  );
}

export default Read;