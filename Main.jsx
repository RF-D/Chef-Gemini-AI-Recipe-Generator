import React from "react"
import IngredientsList from "./components/IngredientsList"
import GeminiRecipe from "./components/GeminiRecipe"
import { getRecipeFromChefGemini } from "./ai"

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)

    async function getRecipe() {
        setIsLoading(true)
        try {
            const recipeMarkdown = await getRecipeFromChefGemini(ingredients)
            setRecipe(recipeMarkdown)
        } catch (error) {
            console.error("Error getting recipe:", error)
        } finally {
            setIsLoading(false)
        }
    }

    function addIngredient(formData) {
        const ingredientInput = formData.get("ingredient").trim()
        
        if (!ingredientInput) return
        
        // Split by commas and filter out empty strings
        const newIngredients = ingredientInput
            .split(',')
            .map(item => item.trim())
            .filter(item => item.length > 0)
        
        // Add all new ingredients to the state
        setIngredients(prevIngredients => [...prevIngredients, ...newIngredients])
        
        // Reset the form
        document.querySelector('.add-ingredient-form').reset()
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. chicken, rice, tomatoes"
                    aria-label="Add ingredient"
                    name="ingredient"
                    required
                />
                <button>Add ingredient</button>
            </form>
            
            {ingredients.length === 0 && (
                <div className="empty-state">
                    <h2>Let's create a recipe!</h2>
                    <p>Add at least 4 ingredients you have available to generate a personalized recipe.</p>
                    <div className="empty-state-tips">
                        <h3>Tips:</h3>
                        <ul>
                            <li>Include proteins (chicken, beef, tofu)</li>
                            <li>Add some vegetables or fruits</li>
                            <li>Include starches (pasta, rice, potatoes)</li>
                            <li>Mention spices or herbs you have</li>
                        </ul>
                    </div>
                </div>
            )}

            {ingredients.length > 0 &&
                <IngredientsList
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                    removeIngredient={(index) => {
                        setIngredients(prevIngredients => 
                            prevIngredients.filter((_, i) => i !== index)
                        )
                    }}
                />
            }

            {isLoading && 
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Chef Gemini is cooking up a recipe...</p>
                </div>
            }
            
            {!isLoading && recipe && <GeminiRecipe recipe={recipe} />}
        </main>
    )
}
