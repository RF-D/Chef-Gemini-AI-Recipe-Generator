// Using Cloudflare Worker instead of direct Gemini API calls
// This removes the need for API keys on the client side

// Get the worker URL from environment variables
const WORKER_URL = import.meta.env.VITE_WORKER_URL;

export async function getRecipeFromChefGemini(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    
    try {
        // Check if the worker URL is available
        if (!WORKER_URL) {
            throw new Error("Worker URL is not configured. Please set the VITE_WORKER_URL environment variable.");
        }
        
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
        
        if (!WORKER_URL) {
            return "Configuration Error: The recipe service URL is not set. Please configure the VITE_WORKER_URL environment variable in Railway.";
        }
        
        if (err.message.includes('not valid JSON')) {
            return `Error: Received HTML instead of JSON. This usually means the Worker URL is incorrect or the worker is not running. Current URL: ${WORKER_URL}`;
        }
        
        return "I'm sorry, there was an error generating your recipe. Please try again later.";
    }
}
