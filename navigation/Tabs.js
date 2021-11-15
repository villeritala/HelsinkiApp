import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CalendarScreen from '../screens/Calendar';
import HomeScreen from '../screens/HomeScreen';
import ListScreen from '../screens/ListScreen';
import SearchScreen from '../screens/SearchScreen';
import LoginScreen from '../screens/LoginScreen';
import { View, Image, Text } from 'react-native';


const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                position: 'absolute',
                bottom: 10,
                left: 15,
                right: 15,
                elevation: 0,
                backgroundColor: 'white',
                borderRadius: 15,
                height: 65,
            }
          }}
        >
            
            <Tab.Screen name="Koti" component={HomeScreen} 
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
                            <Image
                                source={require('../assets/icons/home.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#21130d' : '#abdbe3',
                                }}
                            />
                            <Text
                                style={{color: focused ? '#21130d' : '#abdbe3' }}> 
                                Koti   
                            </Text>
                        </View>
                    ),
            }}/>
            <Tab.Screen name="Haku" component={SearchScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
                            <Image
                                source={require('../assets/icons/search.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#21130d' : '#abdbe3',
                                }}
                            />
                            <Text
                                style={{color: focused ? '#21130d' : '#abdbe3' }}>
                                Haku    
                            </Text>
                        </View>
                    ),
            }}/>
            <Tab.Screen name="Tallennetut tapahtumat" component={ListScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
                            <Image
                                source={require('../assets/icons/list.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#21130d' : '#abdbe3',
                                }}
                            />
                            <Text
                                style={{color: focused ? '#21130d' : '#abdbe3' }}>
                                Tallennetut    
                            </Text>
                        </View>
                    ),
            }}/>
            <Tab.Screen name="Kalenteri" component={CalendarScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
                            <Image
                                source={require('../assets/icons/calendar.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#21130d' : '#abdbe3',
                                }}
                            />
                            <Text
                                style={{color: focused ? '#21130d' : '#abdbe3' }}> 
                                Kalenteri   
                            </Text>
                        </View>
                    ),
            }}/>
        </Tab.Navigator>
    );
}

export default Tabs;