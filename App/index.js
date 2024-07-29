// Filename: index.js
// Combined code from all files
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, Button, View, ActivityIndicator } from 'react-native';
import axios from 'axios';

const App = () => {
    const [loading, setLoading] = useState(false);
    const [recipe, setRecipe] = useState(null);

    const fetchRecipe = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://apihub.p.appply.xyz:3300/chatgpt', {
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant. Please provide answers for given requests."
                    },
                    {
                        role: "user",
                        content: "Can you give me a microwave mug chocolate chip cake recipe?"
                    }
                ],
                model: "gpt-4o"
            });
            const { data } = response;
            setRecipe(data.response);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Microwave Mug Chocolate Chip Cake Recipe</Text>
                <Button title="Get Recipe" onPress={fetchRecipe} />
                {loading && <ActivityIndicator size="large" color="#0000ff" />}
                {recipe && (
                    <View style={styles.recipeContainer}>
                        <Text style={styles.recipeText}>{recipe}</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    recipeContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    recipeText: {
        fontSize: 16,
        lineHeight: 24,
    },
});

export default App;