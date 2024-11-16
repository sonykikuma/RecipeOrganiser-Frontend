import React, { useState, useEffect } from "react";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";

const Recipes = () => {
  const { data, loading, error } = useFetch(
    "https://recipe-organiser-backend-two.vercel.app/recipes"
  );
  //console.log(data);
  const [success, setSuccess] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [searchText, setSearchText] = useState();

  useEffect(() => {
    if (data) {
      setRecipes(data);
    }
  }, [data]);

  const searchedRecipe = searchText
    ? recipes.filter((recipe) =>
        recipe?.title?.toLowerCase().includes(searchText?.toLowerCase())
      )
    : recipes;

  const searchHandler = (e) => {
    setSearchText(e.target.value);
  };

  const deleteHandler = async (recipeId) => {
    try {
      const res = await fetch(
        `https://recipe-organiser-backend-two.vercel.app/recipes/${recipeId}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        throw "failed to delete recipe";
      }

      const data = await res.json();
      if (data) {
        setSuccess("Recipe deleted successfully");

        setTimeout(() => {
          setSuccess("");
        }, 2000);
        setRecipes((prev) => prev.filter((recipe) => recipe._id !== recipeId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container my-4">
      <div className="my-3 row">
        <form onSubmit={submitHandler} className="col-md-6">
          <input
            type="text"
            placeholder="Search by recipe name..."
            className="form-control"
            value={searchText}
            onChange={searchHandler}
          />
        </form>
      </div>

      <h2>All Recipes:</h2>
      {loading && "loading recipes..."}
      {error && <p>An error occured while fetching recipes.</p>}
      {success && <div className="btn btn-danger mb-3">{success}</div>}
      <div className="row">
        {searchedRecipe?.map((recipe) => (
          <div key={recipe._id} className="col-md-3 mb-3 ">
            <div className="card">
              <img
                src={recipe.image}
                alt="recipe image"
                className="img-fluid"
                style={{ objectFit: "cover", height: "400px" }}
              />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p>
                  <strong>Cuisine Type: </strong>
                  <Link to={`/recipes/${recipe._id}`}> See Recipe </Link>
                </p>
                <p>
                  <strong>Ingredients: </strong>
                  <Link to={`/recipes/${recipe._id}`}> See Recipe </Link>
                </p>
                <p>
                  <strong>Instructions: </strong>
                  {recipe.recipeType}
                </p>

                <button
                  onClick={() => deleteHandler(recipe._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;