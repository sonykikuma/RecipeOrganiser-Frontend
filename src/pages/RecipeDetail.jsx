import React from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";

const RecipeDetail = () => {
  const { data, loading, error } = useFetch(
    "https://recipe-organiser-backend-two.vercel.app/recipes"
  );

  const recipeId = useParams();
  //console.log(recipeId);

  const recipeData = data?.find((recipe) => recipe._id == recipeId.recipeId);
  //console.log(recipeData);
  return (
    <>
      <Header />
      <div className="container my-4">
        {loading && "loading..."}
        {error && <p>An error occured while fetching recipe</p>}
        {recipeData && (
          <>
            <h2>{recipeData.title}</h2>
            <div className="card mb-3">
              <div class="row g-2">
                <div className="col-md-4">
                  <img
                    src={recipeData.image}
                    className="img-fluid rounded-start"
                    alt={recipeData.title}
                    style={{ objectFit: "cover", height: "100vh" }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h4 className="card-title">
                      Cuisine: {recipeData.recipeType}
                    </h4>
                    <h5>Ingredients:</h5>

                    <p className="card-text">
                      {recipeData.ingredients.map((ing) => ing).join(", ")}
                    </p>
                    <h5>Instructions:</h5>
                    <ol>
                      {recipeData.instructions.map((rec) => (
                        <li>{rec}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RecipeDetail;
