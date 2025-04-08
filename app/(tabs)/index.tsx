import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Alert, SafeAreaView, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import BgImage from '../../assets/bg.jpg';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { fetchWeatherForecast } from '../api/apicall'; // Adjust the import path as needed
import { usename } from '../mediator';

const Home = () => {
    const { username } = usename(); 
    const [weather, setWeather] = useState({
        cityName: "",
        temp: "",
        feelsLike: "",
        humidity: "",
        windSpeed: "",
        description: "",
        visibility: ""
    });
    interface ForecastDay {
        date: string;
        day: {
            maxtemp_c: number;
            mintemp_c: number;
        };
    }

    const [forecast, setForecast] = useState<ForecastDay[]>([]);


    useEffect(() => {
        const getWeatherForCurrentLocation = async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permission to access location was denied');
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                const coords = location.coords;

                let reverseGeocode = await Location.reverseGeocodeAsync(coords);
                if (reverseGeocode.length > 0 && reverseGeocode[0].city) {
                    const city = reverseGeocode[0].city;
                    const fullForecast = await fetchWeatherForecast({ cityName: city });
                    setWeather({
                        cityName: city,
                        temp: fullForecast.current.temp_c + '°C',
                        feelsLike: fullForecast.current.feelslike_c + '°C',
                        humidity: fullForecast.current.humidity + '%',
                        windSpeed: fullForecast.current.wind_kph + ' kph',
                        description: fullForecast.current.condition.text,
                        visibility: fullForecast.current.vis_km + ' km'
                    });
                    setForecast(fullForecast.forecast.forecastday.slice(2)); // Assuming the API includes today in the forecast
                } else {
                    Alert.alert("Could not fetch city from location");
                }
            } catch (error) {
                console.error('Failed to fetch weather', error);
                Alert.alert('Failed to fetch weather');
            }
        };

        getWeatherForCurrentLocation();
    }, []);

    // Styles definition
    const styles = StyleSheet.create({
        forecastContainer: {
            marginTop: 20,
            paddingHorizontal: 10,
        },
        forecastDay: {
            width: 110,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 10,
            padding: 10,
            marginHorizontal: 5,
        },
        day: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#fff',
        },
        date: {
            fontSize: 14,
            color: '#ddd',
        },
        temp: {
            fontSize: 14,
            color: '#fff',
        }
    });

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={BgImage} style={{ width: '100%', height: '100%' }} resizeMode="cover">
                <SafeAreaView style={{ flex: 1 }}>
                    <Text style={tw`text-white mx-4 text-[25px] font-semibold`}>Morning {username}!!</Text>
                    <Text style={tw`text-white mx-4 text-[35px] font-bold mt-10`}>{weather.cityName}</Text>
                    <Text style={tw`text-white mx-4 text-[30px] `}>{weather.temp}</Text>
                    <Text style={tw`text-white mx-4 mt-2 text-[18px] font-bold`}>{weather.description}</Text>
                    <Text style={tw`text-white mx-4 text-[18px]`}>Feels like: {weather.feelsLike}</Text>
                    <Text style={tw`text-white mx-4 text-[18px]`}>Humidity: {weather.humidity}</Text>
                    <Text style={tw`text-white mx-4 text-[18px]`}>Wind Speed: {weather.windSpeed}</Text>
                    <Text style={tw`text-white mx-4 text-[18px]`}>Visibility: {weather.visibility}</Text>

                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.forecastContainer} 
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                        >
                        {forecast.map((day, index) => (
                            <View key={index} style={styles.forecastDay}>
                                <Text style={styles.day}>{new Date(day.date).toLocaleDateString('en-us', { weekday: 'short' })}</Text>
                                <Text style={styles.date}>{day.date}</Text>
                                <Text style={styles.temp}>High: {day.day.maxtemp_c}°C</Text>
                                <Text style={styles.temp}>Low: {day.day.mintemp_c}°C</Text>
                            </View>
                        ))}
                    </ScrollView>

                </SafeAreaView>
            </ImageBackground>
        </View>
    );
};

export default Home;
