"use client";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import ButtonTemp from "../../components/buttonTemp";
import fetchCityWeather from "../api/apicall";

export default function App() {

    const [searchCityName, setSearchCityName] = useState(String);
    const [loading, setLoading] = useState(false);
    const [Temp, setTemp] = useState("");
    const [cityName, setCityName] = useState("");


    const HandleSearch = () => {
        const res = fetchCityWeather(searchCityName);
        setLoading(true);
        res.then((data) => {
            setTemp((data.main.temp - 273.15). toFixed(2));
            setCityName(data.name);
            setLoading(false);
            console.log(data);
        })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
                setLoading(false);
            });

    };

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter city"
                    value={searchCityName}
                    onChangeText={setSearchCityName}
                    autoCapitalize="words"
                />
                <TouchableOpacity
                    onPress={HandleSearch}
                    style={{
                        backgroundColor: "black",
                        paddingVertical: 12,
                        paddingHorizontal: 24,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 16,
                        elevation: 3,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        marginBottom: 20,
                        height: 50,
                        alignSelf: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            color: "#fff",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                        }}
                    >
                        Search
                    </Text>
                </TouchableOpacity>
                {loading && <Text style={{ fontSize: 20, color: "black" }}>Loading...</Text>}
                {Temp && (
                    <View style={styles.container}>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{cityName}</Text>
                        <Text style={{ fontSize: 18, marginTop: 10 }}>Temperature: {Temp} °C</Text>
                    </View>
                )}

            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: 16,
    },
    input: {
        height: 40,
        width: "90%",
        borderColor: "#ccc",
        borderWidth: 1,
        marginTop: 12,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: "#fff",
        elevation: 2,
    },
    citycard: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 16,
        marginTop: 20,
        padding: 20,
        backgroundColor: "#e3e8e4",
        borderRadius: 8,
        elevation: 3,
        shadowColor: "#000",
    },
});
