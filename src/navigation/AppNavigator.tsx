import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging'
import SplashScreen from '../screens/SplashScreen';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Validate from '../screens/ValidateCode';
import Success from '../screens/Success';
import BottomTabs from './BottomTabs';
import BenefitDetails from "../screens/BenefitDetails";
import {StatusBar} from "react-native";
import AvisoPrivacidad from "../screens/AvisoPrivacidad";
import {useNotification} from "../hooks/useNotification";

export type RootStackParamList = {
    BenefitDetails: {descuento: any}
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    const [isSplashFinished, setIsSplashFinished] = useState(false);

    useNotification();

    return (
        <>
            <StatusBar
                barStyle="light-content"
                translucent={false}
                backgroundColor="#0B3F61"
            />
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {!isSplashFinished ? (
                        <Stack.Screen name="Splash">
                            {(props) => (
                                <SplashScreen {...props} onFinish={() => setIsSplashFinished(true)} />
                            )}
                        </Stack.Screen>
                    ) : (
                        <>
                            <Stack.Screen name="Login" component={Login} />
                            <Stack.Screen name="Register" component={Register} />
                            <Stack.Screen name="Validate" component={Validate} />
                            <Stack.Screen name="Success" component={Success} />
                            <Stack.Screen name="Main" component={BottomTabs} />
                            <Stack.Screen name="BenefitDetails" component={BenefitDetails}/>
                            <Stack.Screen name="AvisoPrivacidad" component={AvisoPrivacidad}/>
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
