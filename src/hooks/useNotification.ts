import {PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {useEffect} from "react";

const requestUserPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("✅ Notificaciones permitidas");
        } else {
            console.log("❌ Permiso de notificaciones denegado");
        }
    } else {
        console.log("ℹ️ Permisos no requeridos en esta versión de Android");
    }
};


const getToken = async () =>{
    try {
        const token = await messaging().getToken();
        console.log(token);
    } catch (error){
        console.log("Failed")
    }
};

const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
    console.log("📬 [FCM Foreground]:", remoteMessage);
    // Muestra notificación local o alerta si quieres
});


export const useNotification = ()=> {
    useEffect(() => {
        requestUserPermission();
        unsubscribeOnMessage();
        getToken();
    })
}