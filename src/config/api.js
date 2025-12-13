// src/config/api.js - CONFIGURACIÓN CENTRALIZADA

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://fastapi-image-optimizer-1.onrender.com";

// 🚨 IMPORTANTE: Este es el token CORRECTO (client-side token de Paddle)
export const PADDLE_CLIENT_SIDE_TOKEN = "test_01kbxtv3hhwg1rhak5rjp83eh7"; // Cambia a "live_..." en producción

export const MAX_FILE_SIZE_MB = 10;
export const MAX_FREE_OPTIMIZATIONS = 5;
export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png'];