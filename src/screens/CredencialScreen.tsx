import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useAuth} from '../context/AuthContext';
import BaseScreen from '../components/BaseScreen';
import {Ionicons} from '@expo/vector-icons';
import {credentialStyles as styles} from '../styles/credentialStyles';
import QRCode from 'react-native-qrcode-svg';
import QrImage from "../components/common/QrImage";
import UserAvatar from '../components/common/UserAvatar';
import PhotoPickerModal from '../components/common/PhotoPickerModal';
import Header from "../components/common/Header";

export default function CredencialScreen({navigation}: any) {
    const {authState} = useAuth();
    const user = authState.user;

    const [showPicker, setShowPicker] = useState(false);
    const [photoUri, setPhotoUri] = useState(user?.photo || null);

    const qrData = JSON.stringify({
        name: `${user?.name} ${user?.last_name}`,
        phone: user?.phone_number,
        email: user?.email,
        company: user?.company_name,
        employee: user?.employee_number,
    });

    return (
        <BaseScreen scroll={false}>
            <Header/>
            <View style={styles.card}>

                <Image
                    source={require('../../assets/images/SINDICATO_NACIONAL.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <UserAvatar
                    uri={photoUri}
                    size={90}
                    style={styles.avatar}
                    onPress={() => setShowPicker(true)}
                />

                <PhotoPickerModal
                    visible={showPicker}
                    onClose={() => setShowPicker(false)}
                    onPick={(uri) => {
                        setPhotoUri(uri);
                    }}
                />

                <Text style={styles.name}>
                    {user?.name} {user?.last_name}
                </Text>
                <Text style={styles.info}>{user?.phone_number}</Text>
                <Text style={styles.info}>{user?.email}</Text>
                <Text style={styles.info}>{user?.company_name}</Text>
                <Text style={styles.info}>Nº {user?.employee_number}</Text>

                <QrImage value={qrData}/>
            </View>


            <TouchableOpacity style={styles.backTop} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#fff"/>
                <Text style={styles.backText}>Regresar</Text>
            </TouchableOpacity>
        </BaseScreen>
    );
}
