import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import React from 'react'
import BgImage from '../../assets/bg.jpg'
import { ImageBackground } from 'react-native'
import tw from 'twrnc'
import { Ionicons } from '@expo/vector-icons'

const Home = () => {
    // conststants for the weather data
    const [Temp, setTemp] = useState("");
    const [cityName, setCityName] = useState("");

    return (
        <View>
            <ImageBackground source={BgImage} style={{ width: '100%', height: '100%' }} resizeMode="cover">
                <SafeAreaView>
                    <Text style={tw`text-white mx-4 text-[25px] font-semibold`}>Morning Noor!!</Text>
                    {/* the city name here */}
                    <Text style={tw`text-white mx-4 text-[35px] font-bold mt-10`}>Calgary</Text>
                    {/* the temp here */}
                    <Text style={tw`text-white mx-4 text-[30px] `}>7&#176;</Text>
                    {/* condition */}
                    <Text style={tw`text-white mx-4 mt-2 text-[18px] font-bold`}>Partially Cloudy</Text>
        


                    {/* Feels like details */}
                    <View style={tw`flex-row items-center mx-3 gap-2 mt-5`}>
                        <View style={tw`flex-row`}>
                            <Ionicons name="thermometer" size={24} color="#fff" />
                            <Text style={tw`text-white text-[15px] font-normal mt-1 mx-1`}>Feels like:</Text>
                        </View>
                        <Text style={tw`text-white text-[15px] font-semibold mt-1`}>20&#176;</Text>
                    </View>
                    {/* Humidity details */}
                    <View style={tw`flex-row items-center mx-3 gap-2 mt-5`}>
                        <View style={tw`flex-row`}>
                            <Ionicons name="water" size={24} color="#fff" />
                            <Text style={tw`text-white text-[15px] font-normal mt-1 mx-1`}>Humidity:</Text>
                        </View>
                        <Text style={tw`text-white text-[15px] font-semibold mt-1`}>45%</Text>
                    </View>
                    {/* Wind speed details */}
                    <View style={tw`flex-row items-center mx-3 gap-2 mt-5`}>
                        <View style={tw`flex-row`}>
                            <Ionicons name="swap-horizontal" size={24} color="#fff" />
                            <Text style={tw`text-white text-[15px] font-normal mt-1 mx-1`}>Wind speed:</Text>
                        </View>
                        <Text style={tw`text-white text-[15px] font-semibold mt-1 `}>3kmp</Text>
                    </View>
                    {/* visibility details */}
                    <View style={tw`flex-row items-center mx-3 gap-2 mt-5`}>
                        <View style={tw`flex-row`}>
                            <Ionicons name="eye" size={24} color="#fff" />
                            <Text style={tw`text-white text-[15px] font-normal mt-1 mx-1`}>Visibility:</Text>
                        </View>
                        <Text style={tw`text-white text-[15px] font-semibold mt-1`}>8km</Text>
                    </View>

                </SafeAreaView>
            </ImageBackground>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})