"use client";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from "react-native";
import { useState } from "react";
import fetchCityWeather from "../api/apicall";

export default function App() {
    const [searchCityName, setSearchCityName] = useState("");
    const [loading, setLoading] = useState(false);
    const [Temp, setTemp] = useState("");
    const [cityName, setCityName] = useState("");

    const HandleSearch = () => {
        const res = fetchCityWeather(searchCityName);
        setLoading(true);
        res.then((data) => {
            setTemp((data.main.temp - 273.15).toFixed(2));
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
        <View style={styles.wrapper}>
            <View style={styles.searchContainer}>
                <Text style={styles.title}>Search Weather</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter city"
                    value={searchCityName}
                    onChangeText={setSearchCityName}
                    autoCapitalize="words"
                    placeholderTextColor="#888"
                />

                <TouchableOpacity onPress={HandleSearch} style={styles.button}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
            </View>

            {loading && <ActivityIndicator size="large" color="#333" style={{ marginTop: 40 }} />}

            {Temp && (
                <View style={styles.resultBox}>
                    <Text style={styles.resultCity}>{cityName}</Text>
                    <Text style={styles.resultTemp}>Temperature: {Temp} °C</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    searchContainer: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        height: 50,
        width: "100%",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: "#fafafa",
        color: "#333",
    },
    button: {
        backgroundColor: "#0f172a",
        paddingVertical: 14,
        borderRadius: 12,
        marginTop: 16,
        alignItems: "center",
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