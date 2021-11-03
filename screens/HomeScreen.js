import React from "react";
import { View, Text, Button, StyleSheet, ImageBackground, Image } from 'react-native';
import TypingText from 'react-native-typing-text';

const HomeScreen = ({ navigation }) => {

    return (
        <ImageBackground source={require('../assets/Photos/church.jpg')} style={styles.container}>
            <View style={styles.logo}>
                <Image source={require('../assets/icons/logo.png')} style={{height: 115, width: 250}}/>
            </View>
            <View style={styles.text}>
                <Text style={{color: 'white', fontSize: 30}}>Mitä tehdä Helsingissä? Etsi tapahtumia sovelluksen avulla!</Text>
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
    logo: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        top: 10,
    },
    text: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        bottom: 100
    }
});