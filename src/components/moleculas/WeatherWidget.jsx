import { useEffect, useState } from "react";
import { fetchWeather } from "../../helprs/weatherApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faCloudRain, faSnowflake, faSun, faThermometerHalf } from "@fortawesome/free-solid-svg-icons";


const WeatherWidget = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [icon, setIcon] = useState(faThermometerHalf);
    const [temp, setTemp] = useState(null);
    useEffect(() => {
        const getWeather = async () => {
            try {
                const data = await fetchWeather('Puno', 'PE'); // Cambia la ciudad si es necesario
                setWeather(data);
                console.log(data)
                if (data.main.temp > 30) setIcon(faSun);
                else if (data.main.temp < 10) setIcon(faSnowflake);
                else if (data.weather[0].main === 'Rain') setIcon(faCloudRain);
                else if (data.weather[0].main === 'Clouds') setIcon(faCloud);
                else setIcon(faThermometerHalf);
                setLoading(false);
            } catch (error) {
                setError('Error al obtener el clima');
                setLoading(false);
            }
        };
        getWeather();
    }, []);

    if (loading) return <p>Cargando clima...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-4 bg-blue-100 rounded mb-4">
            <h3 className="font-bold text-lg">Clima en tu región</h3>
            
            <p><FontAwesomeIcon icon={icon} className="text-2xl mr-2" /> {`${weather.main.temp}°C | ${weather.weather[0].description}`}</p>
        </div>
    );
};

export default WeatherWidget;

