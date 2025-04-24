import { useEffect } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const requestUserPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('✅ Permiso de notificaciones Android otorgado');
    } else {
      console.log('❌ Permiso de notificaciones Android denegado');
    }
  }

  if (Platform.OS === 'ios') {
    const authStatus = await messaging().requestPermission({
      alert: true,
      badge: true,
      sound: true,
    });

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('✅ Permiso de notificaciones iOS otorgado:', authStatus);
    } else {
      console.log('❌ Permiso de notificaciones iOS denegado:', authStatus);
    }
  }
};

const getToken = async () => {
  try {
      
      await messaging().registerDeviceForRemoteMessages();
      
    const token = await messaging().getToken();
    console.log('📲 Token FCM:', token);
    // Aquí podrías enviar el token a tu backend
  } catch (error) {
    console.log('❌ Error al obtener el token FCM', error);
  }
};

export const useNotification = () => {
  useEffect(() => {
    requestUserPermission();
    getToken();

    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log('📬 [FCM Foreground]:', remoteMessage);
      // Aquí podrías mostrar una notificación local o modal
    });

    return () => {
      unsubscribeOnMessage(); // Limpieza del listener
    };
  }, []);
};
