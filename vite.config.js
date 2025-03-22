import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      react()
    ],
    // Expose environment variables to your client code
    define: {
      'import.meta.env.VITE_WORKER_URL': JSON.stringify(env.WORKER_URL || env.VITE_WORKER_URL)
    }
  }
})
