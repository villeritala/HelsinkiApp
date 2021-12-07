import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';
import * as SQLite from 'expo-sqlite';
import { useFocusEffect } from '@react-navigation/native';

const db = SQLite.openDatabase('eventdb.db'); 

const ListScreen = () => {

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
                    <Text style={{fontWeight: "bold"}}>{item.name}</Text>
                    <Icon 
                        name="trash"
                        size={30}
                        style={{marginLeft: '90%'}} 
                        onPress={() => deleteItem(item.id)}
                    />
                    <Text>{item.intro}</Text>
                    <Text>Paikka: {item.street}, {item.postal}, {item.city}</Text>
                    <Text>Aika: {Moment(item.date).format('DD/MM/YYYY HH:mm')}</Text>
                </View>} 
                    data={savedEvent} 
                    ItemSeparatorComponent={listSeparator} 
            /> 
            </View> 
        </View>
    );
};

export default ListScreen;

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
        padding: 6,
        backgroundColor: '#abdbe3'
    },
    event: {
        flex: 2,
        justifyContent:'space-between',
        padding: 20, 
        backgroundColor: 'white', 
        borderRadius: 10
    },
    
});