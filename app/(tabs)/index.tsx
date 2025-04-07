import { SafeAreaView, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { useState } from 'react';
import React from 'react';
import BgImage from '../../assets/bg.jpg';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';

const Home = () => {
    // constants for the weather data
    const [Temp, setTemp] = useState("");
    const [cityName, setCityName] = useState("");

    return (
        <View>
            <ImageBackground source={BgImage} style={{ width: '100%', height: '100%' }} resizeMode="cover">
                <SafeAreaView>
                    <Text style={tw`text-white mx-4 text-[25px] font-semibold`}>Morning Noor!!</Text>

                    {/* City name */}
                    <Text style={tw`text-white mx-4 text-[35px] font-bold mt-10`}>Calgary</Text>

                    {/* Temperature */}
                    <Text style={tw`text-white mx-4 text-[30px] `}>7&#176;</Text>

                    {/* Weather condition */}
                    <Text style={tw`text-white mx-4 mt-2 text-[18px] font-bold`}>Partially Cloudy</Text>

                    {/* Feels like box */}
                    <View style={tw`mx-4 mt-5 bg-white/10 rounded-xl p-3`}>
                        <View style={tw`flex-row items-center`}>
                            <Ionicons name="thermometer" size={24} color="#fff" />
                            <Text style={tw`text-white text-[15px] font-normal ml-2`}>Feels like:</Text>
                            <Text style={tw`text-white text-[15px] font-semibold ml-auto`}>20&#176;</Text>
                        </View>
                    </View>

                    {/* Humidity box */}
                    <View style={tw`mx-4 mt-3 bg-white/10 rounded-xl p-3`}>
                        <View style={tw`flex-row items-center`}>
                            <Ionicons name="water" size={24} color="#fff" />
                            <Text style={tw`text-white text-[15px] font-normal ml-2`}>Humidity:</Text>
                            <Text style={tw`text-white text-[15px] font-semibold ml-auto`}>45%</Text>
                        </View>
                    </View>

                    {/* Wind speed box */}
                    <View style={tw`mx-4 mt-3 bg-white/10 rounded-xl p-3`}>
                        <View style={tw`flex-row items-center`}>
                            <Ionicons name="swap-horizontal" size={24} color="#fff" />
                            <Text style={tw`text-white text-[15px] font-normal ml-2`}>Wind speed:</Text>
                            <Text style={tw`text-white text-[15px] font-semibold ml-auto`}>3kmp</Text>
                        </View>
                    </View>

                    {/* Visibility box */}
                    <View style={tw`mx-4 mt-3 bg-white/10 rounded-xl p-3 mb-6`}>
                        <View style={tw`flex-row items-center`}>
                            <Ionicons name="eye" size={24} color="#fff" />
                            <Text style={tw`text-white text-[15px] font-normal ml-2`}>Visibility:</Text>
                            <Text style={tw`text-white text-[15px] font-semibold ml-auto`}>8km</Text>
                        </View>
                    </View>

                </SafeAreaView>
            </ImageBackground>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({});
