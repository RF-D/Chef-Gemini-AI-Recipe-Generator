export default function IngredientsList(props) {
    const removeIngredient = (indexToRemove) => {
        props.removeIngredient(indexToRemove);
    };
    
    const ingredientsListItems = props.ingredients.map((ingredient, index) => (
        <li key={`${ingredient}-${index}`} className="ingredient-item">
            <span>{ingredient}</span>
            <button 
                type="button" 
                className="remove-ingredient-button" 
                onClick={() => removeIngredient(index)}
                aria-label={`Remove ${ingredient}`}
            >
                ×
            </button>
        </li>
    ));
    
    return (
        <section>
            <div className="ingredients-header">
                <h2>Ingredients on hand:</h2>
                {props.ingredients.length > 0 && (
                    <span className="ingredients-count">{props.ingredients.length} item{props.ingredients.length !== 1 ? 's' : ''}</span>
                )}
            </div>
            <ul className="ingredients-list" aria-live="polite">
                {ingredientsListItems}
            </ul>
            {props.ingredients.length > 3 && (
                <div className="get-recipe-container">
                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={props.getRecipe}>Get a recipe</button>
                </div>
            )}
        </section>
    );
}