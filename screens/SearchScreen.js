import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, FlatList, Image} from 'react-native';
import Moment from 'moment';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('eventdb.db'); //luodaan tietokanta

const SearchScreen = ({ navigation }) => {

    const [events, setEvents] = useState([]);

    const [savedEvent, setSavedEvent] = useState([]);
    const [title, setTitle] = useState('');
    const [info, setInfo] = useState('');
    const [place, setPlace] = useState('');
    const [time, setTime] = useState('');
    
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
            tx.executeSql('create table if not exists course (id integer primary key not null, title text, info text, place text, time text);');
        }, null, updateList)
    }, []);

    //tallennetaan event
    const saveItem = () => {
        db.transaction(tx => {
            tx.executeSql('insert into event (title, info, place, time) values (?, ?, ?, ?);', [title, info, place, time]);    
          }, null, updateList
        )
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
              height: 1,
              width: "90%",
              backgroundColor: "black",
            }}
          />
        );
      };
    return (
            
            <View style={styles.container}>
                    <FlatList
                        style={{marginLeft: "5%"}}
                        keyExtractor={item => item.id}
                        renderItem={({item}) =>
                        <View>
                            <Image source={require('../assets/icons/pin.png')} style={{height: 40, width: 40}}/>
                            <Text style={{fontWeight: "bold", height: 50}} >{item.name.fi}</Text>
                            <Text>{item.description.intro}</Text>
                            <Text>Paikka: {item.location.address.street_address}, {item.location.address.postal_code}, {item.location.address.locality}</Text>
                            <Text>Aika:
                                {Moment(item.event_dates.starting_day).format('DD/MM/YYYY HH:mm')}
                            </Text>
                        </View>}
                    data={events}
                    ItemSeparatorComponent={listSeparator}/>
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
    picker: {
        flex: 2,
        width: 100,
        marginTop: 20,
        alignItems: 'center', 
        justifyContent: 'space-around',
    },
});