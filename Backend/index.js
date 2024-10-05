import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv"

dotenv.config({
    path: "./.env",
});
app.get("/", (req, res) => {
  res.send(`<h1 style=text-align:center>Welcome to Kitchen Recipe App Backend<h1>
  <ul>
  <li>
  <h3>POST: Use the endpoint to <span style="background-color:yellow">/api/v1/users/register</span> To create a new user</h3>
  </li>
  <li>
  <h3>POST: Use the endpoint to <span style="background-color:yellow">/api/v1/users/login</span> To login in to user dashboard</h3>
  </li>
  <li>
  <h3>POST: Change the endpoint to <span style="background-color:yellow">/api/v1/users/forgotPassword</span> To request password reset link to your mail Id</h3>
  </li>
  <li>
  <h3>PUT: Change the endpoint to <span style="background-color:yellow">/api/v1/users/resetPassword</span> To reset password for a user</h3>
  </li>
  <li>
  <h3>GET: Change the endpoint to <span style="background-color:yellow">/api/v1/users/list-all-users</span>To show all users</h3>
  </li>
  </ul>

   <ul>
    <li>
      <h3>GET: Use the endpoint to <span style="background-color:yellow;">/api/v1/recipe/</span> To get all recipes</h3>
    </li>
    <li>
      <h3>POST: Use the endpoint to <span style="background-color:yellow;">/api/v1/recipe/create</span> To create a new recipe</h3>
    </li>
    <li>
      <h3>PUT: Use the endpoint to <span style="background-color:yellow;">/api/v1/recipe/save</span> To save a recipe</h3>
    </li>
    <li>
      <h3>GET: Use the endpoint to <span style="background-color:yellow;">/api/v1/recipe/savedRecipes/ids/:userId</span> To get IDs of saved recipes for a user</h3>
    </li>
    <li>
      <h3>GET: Use the endpoint to <span style="background-color:yellow;">/api/v1/recipe/savedRecipes/:userId</span> To get saved recipes for a user</h3>
    </li>
    <li>
      <h3>GET: Use the endpoint to <span style="background-color:yellow;">/api/v1/recipe/userRecipes/:userId</span> To get recipes created by a user</h3>
    </li>
    <li>
      <h3>GET: Use the endpoint to <span style="background-color:yellow;">/api/v1/recipe/:id</span> To get a recipe by ID</h3>
    </li>
    <li>
      <h3>DELETE: Use the endpoint to <span style="background-color:yellow;">/api/v1/recipe/delete/:recipeId</span> To delete a recipe</h3>
    </li>
    <li>
      <h3>PUT: Use the endpoint to <span style="background-color:yellow;">/api/v1/recipe/update/:recipeId</span> To update a recipe</h3>
    </li>
    <li>
      <h3>PUT: Use the endpoint to <span style="background-color:yellow;">/api/v1/recipe/removeSaved/:recipeId/:userId</span> To remove a saved recipe for a user</h3>
    </li>
  </ul>
  `);
});

connectDB()
    .then(()=>{
        app.on("error", (error) => {
            console.error("ERROR: ", error);
            throw error;
        });
        app.listen(process.env.PORT || 3001, () => {
            console.log(`APP listening on ${process.env.PORT}`);
        });
    })
    .catch((error) => {
         console.log("FAILED TO CONNECT DB!!!", error);
    });