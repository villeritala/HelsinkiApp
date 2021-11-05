import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import Moment from 'moment';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('eventdb.db'); //luodaan tietokanta

const ListScreen = ({ navigation }) => {

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

    //poistetaan tapahtuma listalta
    const deleteItem = (id) => {
        db.transaction(
        tx => {
            tx.executeSql(`delete from event where id = ?;`, [id]);
        }, null, updateList
        )    
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
            <Text>My Events Screen</Text>
            <FlatList 
                style={{marginLeft : "5%"}}
                keyExtractor={item => item.id}
                renderItem={({item}) =>
                <View>
                    <Text style={{fontWeight: "bold", height: 50}}>{item.name}</Text>
                    <Text>{item.intro}</Text>
                    <Text>Paikka: {item.street}, {item.postal}, {item.city}</Text>
                    <Text>Aika:
                        {Moment(item.date).format('DD/MM/YYYY HH:mm')}
                    </Text>
                    <Button 
                        title="Done"
                        type="outline"
                        style={{marginLeft:10}} 
                        onPress={() => deleteItem(item.id)}
                    />
                </View>} 
                    data={savedEvent} 
                    ItemSeparatorComponent={listSeparator} 
            />  
        </View>
    );
};

export default ListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#abdbe3'
    },
    listcontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#abdbe3'
    },
});