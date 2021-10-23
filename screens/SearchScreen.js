import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

const SearchScreen = ({ navigation }) => {

    const [events, setEvents] = useState([]);
    
    useEffect (() => {
        fetch(`https://open-api.myhelsinki.fi/v1/events/`)
        .then(response => response.json())
        .then(responseJson => {
            setEvents(responseJson.data);
        })
        .catch((error) => {
            Alert.alert('Error', error);
        });
    });

    return (
        <View style={styles.container}>
            <Text>Search Screen</Text>
            <FlatList
                style={{marginLeft: "5%"}}
                keyExtractor={item => item.id}
                renderItem={({item}) => <Text>{item.id}</Text>}
            />
        </View>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#abdbe3'
    },
});