import React from "react";
import { View, Text, Button, StyleSheet } from 'react-native';

const ListScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>My Events Screen</Text>
            <Button
                title="Clicl Here"
                onPress={() => alert('Button Clicked')}
            />
        </View>
    );
};

export default ListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
});