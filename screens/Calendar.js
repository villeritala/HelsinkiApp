import React, { useState } from "react";
import { View, StyleSheet, Text} from 'react-native';
import { CalendarList } from "react-native-calendars";
import * as SQLite from 'expo-sqlite';
import Moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';

const db = SQLite.openDatabase('eventdb.db'); 

const CalendarScreen = () => {
    const [savedEvent, setSavedEvent] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
          updateList();      
        }, [])
    );

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


    return (
        <View style={styles.container}>
            <View style={styles.text}>
                <Text style={{top: 5, fontSize: 20}}>Tallennetut päivämäärät</Text>
            </View>
            <View style={styles.calendar}>
            <CalendarList
                pastScrollRange={50}
                futureScrollRange={50}
                scrollEnabled={true}
                showScrollIndicator={true}
                markedDates={markedDay}
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