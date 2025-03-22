// Using Cloudflare Worker instead of direct Gemini API calls
// This removes the need for API keys on the client side

const WORKER_URL = import.meta.env.VITE_WORKER_URL || 'http://localhost:8787';

export async function getRecipeFromChefGemini(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    
    try {
        // Create a prompt with system instructions and ingredients
        const prompt = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.

I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`;

        // Send request to our Cloudflare Worker
        const response = await fetch(WORKER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Worker error details:', errorData);
            throw new Error(errorData.details || errorData.error || 'Failed to get recipe');
        }

        const data = await response.json();
        return data.text;
    } catch (err) {
        console.error("Error generating recipe:", err.message);
        
        // More helpful error message if connection fails (likely worker URL issue)
        if (err.message.includes('Failed to fetch') || err.name === 'TypeError') {
            return "Error: Could not connect to the recipe service. Please ensure your Worker URL is correctly configured in the .env file and the worker is running.";
        }
        
        return "I'm sorry, there was an error generating your recipe. Please try again later.";
    }
}
