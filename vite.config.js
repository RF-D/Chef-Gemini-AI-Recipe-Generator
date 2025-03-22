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
    // By default, Vite exposes variables prefixed with VITE_
    // But for extra safety, we'll explicitly define it as well
    define: {
      'import.meta.env.VITE_WORKER_URL': JSON.stringify(env.VITE_WORKER_URL)
    }
  }
})
