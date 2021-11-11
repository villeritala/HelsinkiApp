import React, { useState } from "react";
import { View, StyleSheet, ImageBackground, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from "../navigation/Tabs";

const HomeScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <ImageBackground source={require('../assets/Photos/church.jpg')} style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/icons/logo.png')} style={{height: 115, width: 250}}/>
            </View>
            
            
        </ImageBackground>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        top: 40,
    },
    login: {
        bottom: '15%',
        width: '80%',
    }, 
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        bottom: '15%',
        color: 'white',
        marginTop: 5
    },
    button: {
        backgroundColor: 'blue',
        width: '100%',
        padding: 10,
        borderRadius: 30,
        alignItems: 'center'
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: 'blue',
        borderWidth: 2
    },
    buttonText: {
        color: 'white'
    },
    buttonOutlineText: {

    }
});