/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

interface Env {
	GEMINI_API_KEY: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		// Handle CORS preflight requests
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'POST, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type, Authorization',
					'Access-Control-Max-Age': '86400',
				},
			});
		}

		// Only handle POST requests
		if (request.method !== 'POST') {
			return new Response('Method not allowed', { 
				status: 405,
				headers: {
					'Access-Control-Allow-Origin': '*',
				}
			});
		}

		try {
			// Parse the request body
			const data = await request.json() as { prompt?: string };
			const prompt = data.prompt;

			if (!prompt) {
				return new Response(JSON.stringify({ error: 'Prompt is required' }), {
					status: 400,
					headers: { 
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
					},
				});
			}

			// Initialize the Gemini API
			const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
			const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

			// Generate content
			const result = await model.generateContent(prompt);
			const response = result.response;
			const text = response.text();

			return new Response(JSON.stringify({ text }), {
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
			});
		} catch (error) {
			console.error('Error:', error);
			// Include more detailed error information for debugging
			const errorMessage = error instanceof Error ? error.message : 'Unknown error';
			console.error('Error details:', errorMessage);
			
			return new Response(JSON.stringify({ error: 'Internal server error', details: errorMessage }), {
				status: 500,
				headers: { 
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*' 
				},
			});
		}
	},
} satisfies ExportedHandler<Env>;