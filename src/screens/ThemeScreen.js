import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import useThemeStore from '../store/useThemeStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PRESET_COLORS = ['red', 'green', 'blue', '#FFD700', '#8A2BE2'];
const STORAGE_KEY = 'CUSTOM_COLORS';
const IGNORED_PRESET_KEY = 'IGNORED_PRESET_COLORS';

const ThemeScreen = () => {
    const { setBackgroundColor } = useThemeStore();
    const [inputColor, setInputColor] = useState('');
    const [customColors, setCustomColors] = useState([]);
    const [ignoredPresets, setIgnoredPresets] = useState([]);


    useEffect(() => {
        const loadColors = async () => {
            try {
                const storedCustom = await AsyncStorage.getItem(STORAGE_KEY);
                const storedIgnored = await AsyncStorage.getItem(IGNORED_PRESET_KEY);

                if (storedCustom) setCustomColors(JSON.parse(storedCustom));
                if (storedIgnored) setCustomColors(JSON.parse(storedIgnored));
            } catch (e) {
                console.error('Colors could not be loaded', e);
            }
        };
        loadColors();
    }, []);

    const saveColors = async (colors) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(colors));
        } catch (e) {
            console.error('Colors could not be saved', e);
        }
    };

    const ignorePresetColor = async (color) => {
        const updated = [...ignoredPresets, color];
        setIgnoredPresets(updated);
        await AsyncStorage.setItem(IGNORED_PRESET_KEY, JSON.stringify(updated));
    };

    const handleAddColor = () => {
        if (!inputColor) return;

        const isValidHex = /^#[0-9A-F]{6}$/i.test(inputColor);
        const isNamedColor = /^([a-z]+)$/i.test(inputColor);

        if (!isValidHex && !isNamedColor) {
            Alert.alert('Wrong color', 'Please enter a valid color!');
            return;
        }

        if (!customColors.includes(inputColor)) {
            const updated = [...customColors, inputColor];
            setCustomColors(updated);
            saveColors(updated);
        }
        setInputColor('');
    };

    const handleDeleteColor = (colorToDelete) => {
        if (PRESET_COLORS.includes(colorToDelete)) {
            ignorePresetColor(colorToDelete);
            return;
        }

        const filtered = customColors.filter((c) => c !== colorToDelete);
        setCustomColors(filtered);
        saveColors(filtered);
    };


    const handleClearAll = () => {
        Alert.alert('Delete all colors?', '', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Clear',
                onPress: () => {
                    setCustomColors([]);
                    saveColors([]);
                },
            },
        ]);
    };

    const renderColorButton = (color) => (
        <View key={color} style={styles.colorWrapper}>
            <TouchableOpacity
                style={[styles.colorButton, { backgroundColor: color }]}
                onPress={() => setBackgroundColor(color)}
            />
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteColor(color)}
            >
                <Text style={styles.deleteText}>✕</Text>
            </TouchableOpacity>
        </View>
    );

    const visiblePresets = PRESET_COLORS.filter(
        (c) => !ignoredPresets.includes(c)
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>🎨 Select Color</Text>

            <View style={styles.row}>
                {visiblePresets.map(renderColorButton)}
                {customColors.map(renderColorButton)}
            </View>

            <TextInput
                value={inputColor}
                onChangeText={setInputColor}
                placeholder='Exp: #e91e63 or red'
                autoCapitalize='none'
                style={styles.input}
            />
            <TouchableOpacity onPress={handleAddColor} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add Color</Text>
            </TouchableOpacity>

            {customColors.length > 0 && (
                <TouchableOpacity onPress={handleClearAll} style={styles.clearAllButton}>
                    <Text style={styles.clearAllText}>Clear All</Text>
                </TouchableOpacity>
            )}
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
    },
    colorWrapper: {
        alignItems: 'center',
        margin: 6,
    },
    colorButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 10,
        borderWidth: 2,
        borderColor: '#333',
    },
    deleteButton: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 2,
        borderWidth: 1,
        borderColor: '#aaa',
    },
    deleteText: {
        fontSize: 10,
        color: '#f00',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#888',
        padding: 10,
        borderRadius: 10,
        marginBottom: 30,
    },
    addButton: {
        backgroundColor: '#333',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 30,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    clearAllButton: {
        backgroundColor: '#333',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 30,
    },
    clearAllText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 10,
    },
});


export default ThemeScreen;