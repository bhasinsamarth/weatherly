"use client";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
    ImageBackground,
    ScrollView,
    SafeAreaView,
    Image
} from "react-native";
import React, { Component } from "react";
import {  useState } from "react";
import { fetchLocations, fetchWeatherForecast } from "../../app/api/apicall";
import bgImage from "../../assets/bg.jpg";
import { Ionicons } from '@expo/vector-icons'
import tw from "twrnc";
import { router } from "expo-router";
import { weatherImages } from "../../constants";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
    const [searchCityName, setSearchCityName] = useState("");
    const [loading, setLoading] = useState(false);
    const [toggleSearch, setToggleSearch] = useState(false);
    const [locations, setLocations] = useState<{ name: string; country: string }[]>([]);

    const [weather, setWeather] = useState({})
    const [Temp, setTemp] = useState("");
    const [cityName, setCityName] = useState("");
    const [weatherCondition, setWeatherCondition] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [feelslike, setFeelsLike] = useState("");
    const [Humidity, setHumidity] = useState("");
    const [windSpeed, setWindSpeed] = useState("")
    const [visibility, setVisibility] = useState("")

    const [displayResult, setDisplayResult] = useState(false);

    interface ForecastDay {
        date: string;
        day: {
            avgtemp_c: string
        };
    }
    const [forecast, setForecast] = useState<ForecastDay[]>([]);
    // sample data got from the api call. have to assign the variables names according to this
    // {"current": {"cloud": 0, "condition": {"code": 1000, "icon": "//cdn.weatherapi.com/weather/64x64/night/113.png", "text": "Clear"}, "dewpoint_c": 2.3, "dewpoint_f": 36.1, "feelslike_c": 1.3, "feelslike_f": 34.3, "gust_kph": 11.6, "gust_mph": 7.2, "heatindex_c": 4.9, "heatindex_f": 40.8, "humidity": 87, "is_day": 0, "last_updated": "2025-04-08 04:00", "last_updated_epoch": 1744081200, "precip_in": 0, "precip_mm": 0, "pressure_in": 30.33, "pressure_mb": 1027, "temp_c": 3.1, "temp_f": 37.6, "uv": 0, "vis_km": 10, "vis_miles": 6, "wind_degree": 43, "wind_dir": "NE", "wind_kph": 6.8, "wind_mph": 4.3, "windchill_c": 3.3, "windchill_f": 38}, "forecast": {"forecastday": [[Object], [Object], [Object], [Object], [Object], [Object], [Object]]}, "location": {"country": "United Kingdom", "lat": 51.5171, "localtime": "2025-04-08 04:02", "localtime_epoch": 1744081336, "lon": -0.1062, "name": "London", "region": "City of London, Greater London", "tz_id": "Europe/London"}}  

    const handleSuggestions = (loc: any) => {
        setLocations([]);
        fetchWeatherForecast({ cityName: loc.name }).then((data) => {
            setWeather(data)
            setCityName(data.location.name)
            setTemp(data.current.temp_c)
            setWeatherCondition(data.current.condition.text)
            setImageLink(data.current.condition.icon || "");
            setFeelsLike(data.current.feelslike_c)
            setHumidity(data.current.humidity)
            setWindSpeed(data.current.wind_kph)
            setVisibility(data.current.vis_km)
            setForecast(data.forecast.forecastday.slice(1));
            setDisplayResult(true)
        });
    }
    const HandleSearch = () => {
        if (searchCityName.length >= 2) {
            fetchLocations({ cityName: searchCityName }).then((data) => {
                setLocations(data);
            });
        }
    };
    return (
    <LinearGradient colors={['#65a8dd', '#82d3e6']} style={styles.wrapper}>
            <ImageBackground source={bgImage} style={{ width: '100%', height: '100%' }} resizeMode="cover">
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter city"
                        value={searchCityName}
                        onChangeText={setSearchCityName}
                        onBlur={() => setToggleSearch(false)}
                        onFocus={() => setToggleSearch(true)}
                        autoCapitalize="words"
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity
                        onPress={HandleSearch}
                        style={{ backgroundColor: 'black', opacity: 0.8, borderRadius: 20, padding: 10, marginLeft: 10 }}
                    >
                        <Ionicons name="search" color={"white"} size={32} />
                    </TouchableOpacity>
                </View>
                {
                    locations.length > 0 && toggleSearch ? (
                        <View style={tw`bg-blue-200 top-1 rounded-lg`}>
                            {
                                locations.map((location, index) => {

                                    return (
                                        <TouchableOpacity
                                            onPress={() => handleSuggestions(location)}
                                            key={index}
                                            style={{ flexDirection: "row", marginLeft: 10, padding: 20, borderBottomWidth: 0.5, borderBottomColor: "#b0b0b0", marginTop: 5, borderRadius: 5, }}
                                        >
                                            <Ionicons name="map" size={24} color="black" />
                                            <Text style={{ marginLeft: 15, fontSize: 15 }}>{location?.name}, {location?.country}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                                )}
                        </View>
                    ) : null
                }
                {displayResult && (
                    <SafeAreaView>
                        <View style={tw`flex flex-row items-center`}>
                            <View>
                                <Text style={tw`text-white mx-4 text-[30px] font-bold mt-10`}>{cityName}</Text>
                                <Text style={tw`text-white mx-4 text-[30px] `}>{Math.round(Number(Temp))}&#176;</Text>
                                <Text style={tw`text-white mx-4 mt-2 text-[18px] font-bold`}>{weatherCondition}</Text>
                            </View>
                            <View>
                                <Image source={weatherImages[weatherCondition as keyof typeof weatherImages]} style={tw`w-32 h-32 mt-12 mx-10`} />
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
                                                <Image source={weatherImages[weatherCondition as keyof typeof weatherImages]} style={tw`w-16 h-16`} />
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
                                <Text style={tw`text-white text-[15px] font-semibold mt-1`}>{feelslike}&#176;</Text>
                            </View>
                            {/* Humidity details */}
                            <View style={tw`flex-row items-center mx-3 gap-2 mt-5`}>
                                <View style={tw`flex-row`}>
                                    <Ionicons name="water" size={24} color="#fff" />
                                    <Text style={tw`text-white text-[15px] font-normal mt-1 mx-1`}>Humidity:</Text>
                                </View>
                                <Text style={tw`text-white text-[15px] font-semibold mt-1`}>{Humidity}%</Text>
                            </View>
                            {/* Wind speed details */}
                            <View style={tw`flex-row items-center mx-3 gap-2 mt-5`}>
                                <View style={tw`flex-row`}>
                                    <Ionicons name="swap-horizontal" size={24} color="#fff" />
                                    <Text style={tw`text-white text-[15px] font-normal mt-1 mx-1`}>Wind speed:</Text>
                                </View>
                                <Text style={tw`text-white text-[15px] font-semibold mt-1 `}>{windSpeed}kmp</Text>
                            </View>
                            {/* visibility details */}
                            <View style={tw`flex-row items-center mx-3 gap-2 mt-5`}>
                                <View style={tw`flex-row`}>
                                    <Ionicons name="eye" size={24} color="#fff" />
                                    <Text style={tw`text-white text-[15px] font-normal mt-1 mx-1`}>Visibility:</Text>
                                </View>
                                <Text style={tw`text-white text-[15px] font-semibold mt-1`}>{visibility}km</Text>
                            </View>

                        </View>
                    </SafeAreaView>
                )}
            </ImageBackground>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
    },
    searchContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 40,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    input: {
        height: 50,
        width: "80%",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: "#fafafa",
        color: "#333",
    },
    buttonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    resultBox: {
        marginTop: 50,
        backgroundColor: "#e8f0fe",
        padding: 20,
        borderRadius: 12,
        alignItems: "center",
    },
    resultCity: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1d4ed8",
        marginBottom: 8,
    },
    resultTemp: {
        fontSize: 16,
        color: "#374151",
    },

});
