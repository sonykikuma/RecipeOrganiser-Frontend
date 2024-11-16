import React, { useState } from "react";
import Header from "../components/Header";

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    recipeType: "",
    image: "",
    ingredients: "",
    instructions: "",
  });
  const [success, setSuccess] = useState("");

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const updatedDataforInstructions = {
      //here trying to get instructions as a new list element
      ...formData,
      instructions: formData.instructions
        .split(", ")
        .map((instruction) => instruction.trim()),
    };

    try {
      const res = await fetch(
        "https://recipe-organiser-backend-two.vercel.app/recipes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedDataforInstructions),
        }
      );
      const data = await res.json();
      setSuccess("Recipe added successfully!");
      setFormData({
        title: "",
        recipeType: "",
        image: "",
        ingredients: "",
        instructions: "",
      });
      setTimeout(() => {
        setSuccess("");
      }, 2000);
      console.log("recipe added", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="container my-4">
        <h2>Add Recipe</h2>
        <div className="mt-3">
          <form onSubmit={submitHandler}>
            <label htmlFor="name">Name: </label>
            <br />
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={changeHandler}
            />
            <br />
            <br />
            <label htmlFor="cuisineType">Cuisine Type: </label>
            <br />
            <input
              type="text"
              name="recipeType"
              value={formData.recipeType}
              onChange={changeHandler}
            />
            <br />
            <br />
            <label htmlFor="image">Image Link: </label>
            <br />
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={changeHandler}
            />
            <br />
            <br />
            <label htmlFor="ingredients">Ingredients: </label>
            <br />
            <input
              type="text"
              name="ingredients"
              value={formData.ingredients}
              onChange={changeHandler}
            />
            <br />
            <br />
            <label htmlFor="instructions">Instructions: </label>
            <br />
            <input
              type="text"
              name="instructions"
              value={formData.instructions}
              onChange={changeHandler}
            />
            <br />
            <br />
            <button className="btn btn-primary">Submit </button>
          </form>
        </div>
        {success && <div className="btn btn-success mt-3">{success}</div>}
      </div>
    </>
  );
};

export default AddRecipe;
