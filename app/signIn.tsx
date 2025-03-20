import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import ButtonTemp from '../components/buttonTemp';

export default function SignInScreen() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    
        return (
            <View style={styles.container}>
                <Text style={{fontWeight:'bold', marginBottom:20, fontSize:20,  }}>Sign In</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    // value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    // value={password}
                    onChangeText={setPassword}
                />
                <ButtonTemp link={"/home"} text={"Sign In"} color="blue" />
                <ButtonTemp link={"/signUp"} text={"Sign Up"} color="blue" />
            </View>
        );}


    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: 'black',
            fontSize: 30,
            padding: 10,
        },
        input: {
            height: 40,
            gap: 10,
            width: '90%',
            borderColor: 'gray',
            borderWidth: 1,
            marginTop: 8,
            padding: 10,
            borderRadius: 5,

        },
    })
