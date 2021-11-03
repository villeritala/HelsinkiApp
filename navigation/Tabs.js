import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CalendarScreen from '../screens/Calendar';
import HomeScreen from '../screens/HomeScreen';
import ListScreen from '../screens/ListScreen';
import SearchScreen from '../screens/SearchScreen';
import { View, Image, Text } from 'react-native';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator
        screenOptions={{
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
            <Tab.Screen name="Home" component={HomeScreen} 
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
                            </Text>
                        </View>
                    ),
            }}/>
            <Tab.Screen name="Search" component={SearchScreen}
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
                            </Text>
                        </View>
                    ),
            }}/>
            <Tab.Screen name="My Events" component={ListScreen}
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
                            </Text>
                        </View>
                    ),
            }}/>
            <Tab.Screen name="Calendar" component={CalendarScreen}
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
                            </Text>
                        </View>
                    ),
            }}/>
        </Tab.Navigator>
    );
}

export default Tabs;