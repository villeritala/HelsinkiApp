import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';
import DatePicker from 'react-native-datepicker';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('eventdb.db'); //luodaan tietokanta

const SearchScreen = () => {

    const [events, setEvents] = useState([]);
    const [savedEvent, setSavedEvent] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [date, setDate] = useState('24-11-2021');
    const [data, setData] = useState([]);

    useEffect (() => {
        fetchEvents();
    }, []);

    const fetchEvents = () => {
        fetch(`https://open-api.myhelsinki.fi/v1/events/`)
        .then(response => response.json())
        .then(responseJson => {
            setEvents(responseJson.data);
            setData(responseJson.data);
        })
        .catch((error) => {
            Alert.alert('Error', error);
        });
        
    }

    //luodaan taulu
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('create table if not exists event (id integer primary key not null, name text, intro text, street text, postal int, city text, date text);');
        }, null, updateList)
    }, []);

    //tallennetaan event-tauluun
    const saveItem = (name, intro, street, postal, city, date) => {
        db.transaction(tx => {
            tx.executeSql('insert into event (name, intro, street, postal, city, date) values (?, ?, ?, ?, ?, ?);', [name, intro, street, postal, city, date]);    
          }, null, updateList
        )
        Alert.alert('Tapahtuma tallennettu Tallennetut-osioon')
    }

    //päivitetään lista
    const updateList = () => {
        db.transaction(tx => {
          tx.executeSql('select * from event;', [], (_, { rows }) =>
            setSavedEvent(rows._array)
          ); 
        });
    }

    const listSeparator = () => {
        return (
          <View
            style={{
              height: 5,
              width: "100%",
              backgroundColor: '#abdbe3',
            }}
          />
        );
    };

    const filterByDate = (date) => {
        const filterByDate = events.filter((item) => (Moment(item.event_dates.starting_day).format('DD-MM-YYYY')) === date)
        setFiltered(filterByDate);
        setData(filterByDate);
    }

    const getAll = () => {
        let allEvents = events.map((item) => item);
        setEvents(allEvents);
        setData(allEvents);
    }
    
    return (
            <View style={styles.container}>
                    <View style={styles.picker}>
                        <View style={styles.datepicker}>
                            <DatePicker
                                    style={styles.datePickerStyle}
                                    date={date} // Initial date from state
                                    mode="date" // The enum of date, datetime and time
                                    placeholder="select date"
                                    format="DD-MM-YYYY"
                                    
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                        //display: 'none',
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                        },
                                        dateInput: {
                                        marginLeft: 36,
                                        backgroundColor: 'white'
                                        },
                                    }}
                                    onDateChange={(date) => {
                                        setDate(date);
                                    }}
                            />
                            <Button title ="Hae pvm" onPress={() => {filterByDate(date)}} color="blue"/>
                            <Button title ="Hae kaikki"  onPress={() => {getAll()}} color="blue"/>
                        </View>
                        <FlatList
                                keyExtractor={item => item.id}
                                renderItem={({item}) =>
                            <View style={styles.event}>
                                <Text style={{fontWeight: "bold"}}> 
                                    {item.name.fi ? (item.name.fi) : (item.name.en) ? (item.name.en) : (item.name.sv) }
                                </Text>
                                <Icon name="bookmark" size={30} style={{marginLeft: '90%'}} onPress={() => saveItem(
                                    item.name.fi, 
                                    item.description.intro, 
                                    item.location.address.street_address, 
                                    item.location.address.postal_code,
                                    item.location.address.locality,
                                    item.event_dates.starting_day
                                    )} />
                                <Text>{item.description.intro ? (item.description.intro) : ('-')}</Text>
                                <Text>Paikka: {item.location.address.street_address}, {item.location.address.postal_code}, {item.location.address.locality}</Text>
                                <Text>Aika: 
                                    {Moment(item.event_dates.starting_day).format('DD.MM.YYYY HH:mm')}
                                </Text>
                            </View>}
                                data={data}
                                ItemSeparatorComponent={listSeparator}/>
                    </View>                  
        </View>            
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#abdbe3',
    },
    picker: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        marginTop: 30,
        backgroundColor: '#abdbe3',
    },
    datepicker: {
        width: "90%", 
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5, 
    },
    event: {
        flex:1,
        padding:10, 
        backgroundColor: 'white', 
        borderRadius: 10
    },
    
});