import RecipeModal from "../models/recipe.js";

export const createRecipe = async (req, res) => {
  const recipe = req.body;
  const newRecipe = new RecipeModal({
    ...recipe,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    // Save the new recipe to the database
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getRecipes = async (req, res) => {
  try {
    const recipes = await RecipeModal.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await RecipeModal.findById(id);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

