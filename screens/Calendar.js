import React from "react";
import { View, Text, Button, StyleSheet } from 'react-native';
import ModalDatePicker from 'react-native-datepicker-modal';

const CalendarScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Calendar Screen</Text>
            <Button
                title="Clicl Here"
                onPress={() => alert('Button Clicked')}
            />
        </View>
    );
};

export default CalendarScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#abdbe3'
    },
});