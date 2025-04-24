import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { profileStyle as styles } from '../../styles/profileStyles';

const ProfileHeader = () => (
    <>
        <TouchableOpacity style={styles.cameraButton}>
            <Ionicons name="camera" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.cameraText}>VOLVER A TOMAR FOTO</Text>
    </>
);

export default ProfileHeader;
