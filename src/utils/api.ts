// src/utils/api.ts

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://web3ssh-backend.onrender.com';

/**
 * Universal Fetch wrapper to communicate automatically with the FastAPI backend.
 */
export const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    // Add custom error handling
    if (!response.ok) {
        throw new Error(`Backend API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};
