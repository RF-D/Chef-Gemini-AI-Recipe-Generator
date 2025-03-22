import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`

// SECURITY WARNING: Never commit API keys to repositories
// If deploying this project, create a backend service or use 
// serverless architecture to keep your API keys private

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export async function getRecipeFromChefGemini(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        
        const generationConfig = {
            maxOutputTokens: 1024,
        };
        
        const chat = model.startChat({
            generationConfig,
            safetySettings: [
                {
                    category: "HARM_CATEGORY_HARASSMENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE",
                },
                {
                    category: "HARM_CATEGORY_HATE_SPEECH",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE",
                },
                {
                    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE",
                },
                {
                    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE",
                },
            ],
            systemInstruction: SYSTEM_PROMPT,
        });
        
        const result = await chat.sendMessage(`I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`);
        return result.response.text();
    } catch (err) {
        console.error("Error generating recipe:", err.message);
        return "I'm sorry, there was an error generating your recipe. Please try again later.";
    }
}
