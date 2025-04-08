import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import { useState } from 'react'
import React from 'react'
import BgImage from '../../assets/bg.jpg'
import { ImageBackground } from 'react-native'
import tw from 'twrnc'
import { Ionicons } from '@expo/vector-icons'


interface CityCardProps {
    _cityName: string;
}

const CityCard = ({ _cityName }: CityCardProps) => {
    // conststants for the weather data
    const [searchCityName, setSearchCityName] = useState("");
    const [loading, setLoading] = useState(false);
    const [Temp, setTemp] = useState("");
    const [cityName, setCityName] = useState("");
    const [toggleSearch, setToggleSearch] = useState(false);
    const [locations, setLocations] = useState([1, 2, 3]);


    return (
        <View>
            <ImageBackground source={BgImage} style={{ width: '100%', height: '100%' }} resizeMode="cover">
                <SafeAreaView>
                    <View style={tw`flex flex-row items-center`}>
                        <View>
                            {/* the city name here */}
                            <Text style={tw`text-white mx-4 text-[35px] font-bold mt-10`}>{_cityName}</Text>
                            {/* the temp here */}
                            <Text style={tw`text-white mx-4 text-[30px] `}>{Temp}&#176;</Text>
                            {/* condition */}
                            <Text style={tw`text-white mx-4 mt-2 text-[18px] font-bold`}>Partially Cloudy</Text>
                        </View>
                        <View>
                            {/* <Image source={require('../../assets/icon.png')} style={tw`w-24 h-24 mt-12 mx-10`}/> */}
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
                            <View style={{ backgroundColor: 'black', opacity: 0.5, borderRadius: 20, padding: 10, marginLeft: 10 }}>
                                <View style={tw`flex justify-center items-center rounded-3xl p-3 mx-2 gap-2`}>
                                    <Ionicons name="sunny" size={24} color="#fff" />
                                    <Text style={tw`text-white text-[15px] font-semibold`}>Monday</Text>
                                    <Text style={tw`text-white text-[15px] font-normal`}>7&#176;</Text>
                                </View>
                            </View>

                        </ScrollView>

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

                    </View>
                </SafeAreaView>
            </ImageBackground>
        </View>
    )
}

export default CityCard