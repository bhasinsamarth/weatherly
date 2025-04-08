import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import tw from 'twrnc'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Ionicons } from '@expo/vector-icons'

interface TabIconProps {
    icon: any;
    name: string;
    focused: boolean;
}

const TabIcon = ({ icon, name, focused }: TabIconProps) => {
    return (
        <View style={tw`items-center justify-center gap-1 w-20 `}>
            <Ionicons name={icon} size={24} color={focused ? "#f0e9e9" : "#8f8989"} />
            <Text style={focused ? tw`text-white font-semibold` : tw`text-[#8f8989] font-normal`}>{name}</Text>
        </View>
    )
}

const _layout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                   bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    height: 90,
                    paddingTop: 12,
                    backgroundColor: 'black',
                    borderRadius: 20,
                },
                tabBarActiveTintColor: '#f0e9e9',
                tabBarInactiveTintColor: '#8f8989',
            }}
        >
            <Tabs.Screen name="index" options={{
                title: "",
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                    <TabIcon name='Home' icon={"home"} focused={focused} />
                )
            }} />
            <Tabs.Screen name="search" options={{
                title: "",
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                    <TabIcon name='search' icon={"search"} focused={focused} />
                )
            }} />
            <Tabs.Screen name="settings"  options={{
                title: "",
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                    <TabIcon name='settings' icon={"settings"} focused={focused} />
                )
            }} />

        </Tabs>
    )
}

export default _layout

const styles = StyleSheet.create({})