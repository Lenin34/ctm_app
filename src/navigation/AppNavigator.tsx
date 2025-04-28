// ✅ src/navigation/AppNavigator.tsx
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, View, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';

import SplashScreen from '../screens/SplashScreen';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Validate from '../screens/ValidateCode';
import Success from '../screens/Success';
import BottomTabs from './BottomTabs';
import BenefitScreen from '../screens/BenefitDetails';
import AvisoPrivacidad from '../screens/AvisoPrivacidad';
import ChangePassword from '../screens/ChangePassword';
import Beneficiarios from '../screens/BeneficiariosScreen';

interface Benefit {
    id: string;
    title: string;
    description: string;
    validity_start_date: string;
    validity_end_date: string;
    image: string;
}

export type RootStackParamList = {
    BenefitScreen: {descuento: Benefit}
}

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const [isSplashFinished, setIsSplashFinished] = useState(false);
    const { authState } = useAuth();

    if (!isSplashFinished || authState.loading) {
        return <SplashScreen onFinish={() => setIsSplashFinished(true)} />;
    }

    return (
        <>
            <StatusBar barStyle="light-content" translucent={false} backgroundColor="#0B3F61" />
            <NavigationContainer>
                <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
                    {!authState.authenticated ? (
                        <>
                            <Stack.Screen name="Login" component={Login} />
                            <Stack.Screen name="Register" component={Register} />
                            <Stack.Screen name="Validate" component={Validate} />
                            <Stack.Screen name="Success" component={Success} />
                            <Stack.Screen name="AvisoPrivacidad" component={AvisoPrivacidad} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="Main" component={BottomTabs} />
                            <Stack.Screen name="BenefitScreen" component={BenefitScreen} />
                            <Stack.Screen name="Benefits" component={Beneficiarios}/>
                            <Stack.Screen name="AvisoPrivacidad" component={AvisoPrivacidad} />
                            <Stack.Screen name="ChangePassword" component={ChangePassword} />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}