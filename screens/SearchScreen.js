import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('eventdb.db'); //luodaan tietokanta

const SearchScreen = ({ navigation }) => {

    const [events, setEvents] = useState([]);
    const [savedEvent, setSavedEvent] = useState([]);
    
    useEffect (() => {
        fetch(`https://open-api.myhelsinki.fi/v1/events/`)
        .then(response => response.json())
        .then(responseJson => {
            setEvents(responseJson.data);
        })
        .catch((error) => {
            Alert.alert('Error', error);
        });
    }, []);


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

    return (
            
            <View style={styles.container}>
                <View style={styles.picker}>
                        <FlatList
                            
                            keyExtractor={item => item.id}
                            renderItem={({item}) =>
                            <View style={styles.event}>
                                <Text style={{fontWeight: "bold"}}> {item.name.fi}</Text>
                                <Icon name="bookmark" size={30} style={{marginLeft: '87%'}} onPress={() => saveItem(
                                    item.name.fi, 
                                    item.description.intro, 
                                    item.location.address.street_address, 
                                    item.location.address.postal_code,
                                    item.location.address.locality,
                                    item.event_dates.starting_day
                                    )} />
                                <Text>{item.description.intro}</Text>
                                <Text>Paikka: {item.location.address.street_address}, {item.location.address.postal_code}, {item.location.address.locality}</Text>
                                <Text>Aika:
                                    {Moment(item.event_dates.starting_day).format('DD.MM.YYYY HH:mm')}
                                </Text>
                            </View>}
                        data={events}
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
        top: 30,
        padding: 10,
        backgroundColor: '#abdbe3'
    },
    event: {
        flex:1,
        justifyContent:'space-between',
        padding:10, 
        backgroundColor: 'white', 
        borderRadius: 10
    },
});