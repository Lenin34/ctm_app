import React, {useState} from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView, TextInput,
} from 'react-native';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import {profileStyle as styles} from '../styles/profileStyles';
import Header from "../components/Header";
import BaseScreen from "../components/BaseScreen";
import LogoCTM from "../components/LogoCTM";
import {useValidation} from "../hooks/useValidation";


const Profile = ({navigation}) => {

    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
        });
    };
    const {validateLogin} = useValidation();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        nombre: 'Esteban',
        apellidoPaterno: 'Montoya',
        apellidoMaterno: 'De La Rosa',
        telefono: '55 1389 6505',
        correo: 'emontoya@grupotorres.mx',
    });

    return (


        <BaseScreen scroll={true}>
            <Header onLogout={handleLogout}/>

            <View style={styles.profileBox}>
                <TouchableOpacity style={styles.cameraButton}>
                    <Ionicons name="camera" size={24} color="#fff"/>
                </TouchableOpacity>
                <Text style={styles.cameraText}>VOLVER A TOMAR FOTO</Text>

                {Object.entries(formData).map(([key, value], index) => (
                    <View key={index} style={styles.fieldContainer}>
                        <Text style={styles.label}>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</Text>
                        <View style={styles.inputBox}>
                            {isEditing ? (
                                <TextInput
                                    style={styles.inputText}
                                    value={value}
                                    onChangeText={(text) =>
                                        setFormData((prev) => ({...prev, [key]: text}))
                                    }
                                />
                            ) : (
                                <Text style={styles.inputText}>{value}</Text>
                            )}
                        </View>
                    </View>
                ))}

                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.updateButton}
                        onPress={() => setIsEditing(!isEditing)}
                    >
                        <Ionicons name="create-outline" size={16} color="#fff"/>
                        <Text style={styles.buttonText}>
                            {isEditing ? 'GUARDAR' : 'ACTUALIZAR'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.passwordButton}>
                        <Ionicons name="lock-closed-outline" size={16} color="#fff"/>
                        <Text style={styles.buttonText}>CAMBIAR CONTRASEÑA</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.greenButton}>
                    <Ionicons name="people-outline" size={16} color="#fff"/>
                    <Text style={styles.buttonText}>VER BENEFICIARIOS</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.blueButton}>
                    <Ionicons name="card-outline" size={16} color="#fff"/>
                    <Text style={styles.buttonText}>VER CREDENCIAL DIGITAL</Text>
                </TouchableOpacity>
            </View>
        </BaseScreen>
    );
};

export default Profile;
