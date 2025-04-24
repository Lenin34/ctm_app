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
                    backgroundColor: '#09263A',
                    borderTopWidth: 0,
                    height: 60,
                },
                tabBarActiveTintColor: '#02AF14',
                tabBarInactiveTintColor: '#FFF',
                tabBarIcon: ({ focused, color, size }) => {
                    const icons: { [key: string]: string } = {
                        Inicio: focused ? 'home' : 'home-outline',
                        Calendario: focused ? 'calendar' : 'calendar-outline',
                        Tramites: focused ? 'document-text' : 'document-text-outline',
                        Beneficios: focused ? 'pricetag' : 'pricetag-outline',
                        Perfil: focused ? 'person' : 'person-outline',
                    };

                    const iconName = icons[route.name] || 'alert-circle-outline';

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Inicio" component={Home} />
            <Tab.Screen name="Calendario" component={Calendar} />
            <Tab.Screen name="Beneficios" component={Benefits} />
            <Tab.Screen name="Perfil" component={Profile} />
        </Tab.Navigator>
    );
}
