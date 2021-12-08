import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { View, StyleSheet, ImageBackground, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, Text } from 'react-native';
import firebase from '../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogedIn, setIsLogedIn] = useState(false);

    const auth = getAuth(firebase)
    const navigation = useNavigation()

    useEffect(() =>  {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate("Tabs")
                setIsLogedIn(true)
                setEmail('')
                setPassword('')
            }
        })
        return unsubscribe
    }, [])

    const handelSignUp =  () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Register in with',user.email);
        })
        .catch(error => alert(error.message))
    };

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with', user.email);
        })
        .catch(error => alert(error.message))
    };

    return (
        <ImageBackground source={require('../assets/Photos/church.jpg')} style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/icons/logo.png')} style={{height: 115, width: 250}}/>
            </View>
            <KeyboardAvoidingView 
                style={styles.container}
                behavior="padding"            
            />
            <View style={styles.login}>
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    placeholder="Salasana"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Kirjaudu</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handelSignUp}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Rekisteröidy</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default LoginScreen;

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