const APIKey = "61510d21795941a0b8813836250804";

interface ForecastParams {
	cityName: string;
}

const getForecast = (params: ForecastParams) => `https://api.weatherapi.com/v1/forecast.json?key=61510d21795941a0b8813836250804&q=${params.cityName}&days=7&aqi=no&alerts=no`
const getLocationSuggestions = (params: ForecastParams) => `https://api.weatherapi.com/v1/search.json?key=61510d21795941a0b8813836250804&q=${params.cityName}`

const apiCall = async (endpoint: any) => {
    const options = {
        method: "GET",
        url: endpoint,
    };
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export const fetchWeatherForecast = (params: ForecastParams) =>{
    let forecastUrl = getForecast(params);
    return apiCall(forecastUrl);
}
export const fetchLocations = (params: ForecastParams) =>{
    let locUrl = getLocationSuggestions(params);
    return apiCall(locUrl);
}
