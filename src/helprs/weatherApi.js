
import axios from 'axios';
import { API_KEY } from '../constants/env';

// const API_KEY = 'TU_CLAVE_API'; // Reemplaza esto con tu clave
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (city = 'Puno', country = 'PE') => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: `${city},${country}`,
                units: 'metric', // Para usar °C
                lang: 'es', // Idioma español
                appid: API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};
