import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { profileStyle as styles } from '../../styles/profileStyles';

interface Props {
    photo?: string | null;
    onPickPhoto: () => void;
}

const ProfileHeader = ({ photo, onPickPhoto }: Props) => (
    <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.avatarCircle} onPress={onPickPhoto}>
            {photo ? (
                <Image source={{ uri: photo }} style={styles.avatarImage} />
            ) : (
                <Ionicons name="camera" size={36} color="#fff" />
            )}
        </TouchableOpacity>
        <Text style={styles.cameraText}>VOLVER A TOMAR FOTO</Text>
    </View>
);

export default ProfileHeader;
