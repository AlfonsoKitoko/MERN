import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios'

// URL base del backend (variable de entorno)
const host = import.meta.env.VITE_BASE_URL_BACKEND

// Configuración global de axios
window.axios = axios
window.axios.defaults.baseURL = host                // Base URL de todas las requests
window.axios.defaults.headers.common["Accept"] = "application/json"
window.axios.defaults.headers.common["Content-Type"] = "application/json"
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest"
window.axios.defaults.withCredentials = true        // Enviar cookies (JWT httpOnly) al backend

// Renderizar la app
createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <App />
  // </StrictMode>
)
