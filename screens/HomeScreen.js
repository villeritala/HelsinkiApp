import React, { useState } from "react";
import { View, StyleSheet, ImageBackground, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from "@react-navigation/core";
import firebase from '../firebase';
import { getAuth} from 'firebase/auth'

const HomeScreen = ({}) => {
    
    const auth = getAuth(firebase)
    const navigation = useNavigation()

    const handleSignOut = () => {
        auth.signOut()
        .then(() => {
            navigation.navigate("Kirjautuminen")
        })
        .catch(error => alert(error.message))
    }

    return (
        
        <ImageBackground source={require('../assets/Photos/church.jpg')} style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/icons/logo.png')} style={{height: 115, width: 250}}/>
            </View>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={handleSignOut}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Kirjaudu ulos</Text>
                </TouchableOpacity>
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
    buttonContainer: {
        width: '60%',
        bottom: '15%',
        color: 'white',
        marginTop: 5
    },
    button: {
        backgroundColor: 'blue',
        width: 200,
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
        color: 'white',
        fontSize: 20
    },
});