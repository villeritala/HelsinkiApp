import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, Text } from 'react-native';
import { CalendarList } from "react-native-calendars";
import * as SQLite from 'expo-sqlite';
import Moment from 'moment';

const db = SQLite.openDatabase('eventdb.db'); //luodaan tietokanta

const CalendarScreen = ({ navigation }) => {
    const [savedEvent, setSavedEvent] = useState([]);

    useEffect (() => {
        updateList()
        
    }, []);

    //päivitetään lista
    const updateList = () => {
        db.transaction(tx => {
          tx.executeSql('select * from event;', [], (_, { rows }) =>
            setSavedEvent(rows._array)
          ); 
        });
    }

    let markedDay = {};

    savedEvent.map((item) => {
        markedDay[Moment(item.date).format('YYYY-MM-DD')] = {
          selected: true,
          marked: true,
        };
    });

    const openMark = (savedEvent) => {
        console.log(savedEvent)
        Alert.alert()
    }

    return (
        <View style={styles.container}>
            <View style={styles.text}>
                <Text style={{top: 5, fontSize: 20}}>Tallennetut päivämäärät</Text>
            </View>
            <View style={styles.calendar}>
            <CalendarList
                // Callback which gets executed when visible months change in scroll view. Default = undefined
                onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={50}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={50}
                // Enable or disable scrolling of calendar list
                scrollEnabled={true}
                // Enable or disable vertical scroll indicator. Default = false
                showScrollIndicator={true}
                markedDates={markedDay}
                onDayPress={(day) => {console.log('selected day', day)}}
            />
            </View>
            
        </View>
    );
};

export default CalendarScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 30,
        backgroundColor: 'white',
    },
    text: {
        flex: 1,
        top: 30,
        alignItems: 'center',
        fontWeight:'bold'
    },
    calendar: {
        flex: 6
    },
});