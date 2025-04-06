const fetchCityWeather = async (city: string) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d536e02dde78666729b749c2c6b80526`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        return data;
    }
    catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
        };
    
    export default fetchCityWeather;