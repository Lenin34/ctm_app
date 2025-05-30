import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from '../screens/Home';
import Calendar from '../screens/Calendar';
import Tramit from '../screens/Tramit';
import Benefits from '../screens/Benefits';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#001f2e',
                    borderTopWidth: 0,
                    height: 60,
                },
                tabBarActiveTintColor: '#00cc66',
                tabBarInactiveTintColor: '#aaa',
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: string = '';

                    switch (route.name) {
                        case 'Inicio':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Calendario':
                            iconName = focused ? 'calendar' : 'calendar-outline';
                            break;
                        case 'Tramites':
                            iconName = focused ? 'document-text' : 'document-text-outline';
                            break;
                        case 'Beneficiarios':
                            iconName = focused ? 'gift' : 'gift-outline';
                            break;
                        case 'Perfil':
                            iconName = focused ? 'person' : 'person-outline';
                            break;
                    }

                    return <Ionicons name={iconName} size={22} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Inicio" component={Home} />
            <Tab.Screen name="Calendario" component={Calendar} />
            <Tab.Screen name="Tramites" component={Tramit} />
            <Tab.Screen name="Beneficiarios" component={Benefits} />
            <Tab.Screen name="Perfil" component={Profile} />
        </Tab.Navigator>
    );
}
