import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Alert, SafeAreaView, ScrollView, Image } from 'react-native';
import * as Location from 'expo-location';
import BgImage from '../../assets/bg.jpg';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { fetchWeatherForecast } from '../api/apicall';
import { usename } from '../mediator';
import { weatherImages } from '../../constants';

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
            avgtemp_c: string;
        };
    }
    const [weatherCondition, setWeatherCondition] = useState("");
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
                    setForecast(fullForecast.forecast.forecastday.slice(2));
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


    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={BgImage} style={{ width: '100%', height: '100%' }} resizeMode="cover">
                <SafeAreaView style={{ flex: 1 }}>
                    <Text style={tw`text-white mx-4 text-[25px] font-semibold`}>Morning {username}!!</Text>

                    <View style={tw`flex flex-row items-center`}>
                        <View>
                            <Text style={tw`text-white mx-4 text-[30px] font-bold mt-10`}>{weather.cityName}</Text>
                            <Text style={tw`text-white mx-4 text-[30px] `}>{weather.temp}&#176;</Text>
                            <Text style={tw`text-white mx-4 mt-2 text-[18px] font-bold`}>{weather.description}</Text>
                        </View>
                        <View>
                            <Image source={weatherImages[weather.description as keyof typeof weatherImages]} style={tw`w-32 h-32 mt-12 mx-10`} />
                        </View>
                    </View>
                    {/* forecast details */}
                    <View style={tw`gap-1 mb-2`}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, marginTop: 15, gap: 2 }}>
                            <Ionicons name="calendar" size={24} color="#fff" style={tw`mx-4 mt-5`} />
                            <Text style={tw`text-white mt-5 text-[18px]`}>Daily forecast</Text>
                        </View>
                        <ScrollView
                            horizontal
                            contentContainerStyle={{ paddingHorizontal: 10 }}
                            showsHorizontalScrollIndicator={false}>
                            {
                                forecast.map((day, index) => (
                                    <View key={index} style={{ backgroundColor: 'black', opacity: 0.5, borderRadius: 20, padding: 10, marginLeft: 10 }}>
                                        <View style={tw`flex justify-center items-center rounded-3xl p-3 mx-2 gap-2`}>
                                            <Image source={weatherImages[weather.description as keyof typeof weatherImages]} style={tw`w-16 h-16`} />
                                            <Text style={tw`text-white text-[15px] font-semibold`}>{day.date}</Text>
                                            <Text style={tw`text-white text-[15px] font-normal`}>{day.day.avgtemp_c}&#176;</Text>
                                        </View>
                                    </View>
                                ))
                            }

                        </ScrollView>

                        {/* Feels like details */}
                        <View style={tw`flex-row items-center mx-3 gap-2 mt-5`}>
                            <View style={tw`flex-row`}>
                                <Ionicons name="thermometer" size={24} color="#fff" />
                                <Text style={tw`text-white text-[15px] font-normal mt-1 mx-1`}>Feels like:</Text>
                            </View>
                            <Text style={tw`text-white text-[15px] font-semibold mt-1`}>{weather.feelsLike}&#176;</Text>
                        </View>
                        {/* Humidity details */}
                        <View style={tw`flex-row items-center mx-3 gap-2 mt-5`}>
                            <View style={tw`flex-row`}>
                                <Ionicons name="water" size={24} color="#fff" />
                                <Text style={tw`text-white text-[15px] font-normal mt-1 mx-1`}>Humidity:</Text>
                            </View>
                            <Text style={tw`text-white text-[15px] font-semibold mt-1`}>{weather.humidity}%</Text>
                        </View>
                        {/* Wind speed details */}
                        <View style={tw`flex-row items-center mx-3 gap-2 mt-5`}>
                            <View style={tw`flex-row`}>
                                <Ionicons name="swap-horizontal" size={24} color="#fff" />
                                <Text style={tw`text-white text-[15px] font-normal mt-1 mx-1`}>Wind speed:</Text>
                            </View>
                            <Text style={tw`text-white text-[15px] font-semibold mt-1 `}>{weather.windSpeed}kmp</Text>
                        </View>
                        {/* visibility details */}
                        <View style={tw`flex-row items-center mx-3 gap-2 mt-5`}>
                            <View style={tw`flex-row`}>
                                <Ionicons name="eye" size={24} color="#fff" />
                                <Text style={tw`text-white text-[15px] font-normal mt-1 mx-1`}>Visibility:</Text>
                            </View>
                            <Text style={tw`text-white text-[15px] font-semibold mt-1`}>{weather.visibility}km</Text>
                        </View>

                    </View>

                </SafeAreaView>
            </ImageBackground>
        </View>
    );
};

export default Home;


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