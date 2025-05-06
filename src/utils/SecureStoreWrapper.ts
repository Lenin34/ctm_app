// utils/SecureStoreWrapper.ts
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const memoryStore: Record<string, string> = {};

export const saveItem = async (key: string, value: string) => {
    if (Platform.OS === 'web') {
        memoryStore[key] = value;
    } else {
        await SecureStore.setItemAsync(key, value);
    }
};

export const getItem = async (key: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
        return memoryStore[key] || null;
    } else {
        return await SecureStore.getItemAsync(key);
    }
};

export const deleteItem = async (key: string) => {
    if (Platform.OS === 'web') {
        delete memoryStore[key];
    } else {
        await SecureStore.deleteItemAsync(key);
    }
};
