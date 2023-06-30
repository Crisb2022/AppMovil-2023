import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Configuration, OpenAIApi } from 'openai'


const ChatGPTInteligente = () => {
    const [data, setData] = useState([]);
    const [messages, setMessages] = useState([]);
    const [textInput, setTextInput] = useState('');
    const apiKey = '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'
    const configuration = new Configuration({
        apiKey,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
    })

    const openai = new OpenAIApi(configuration);


    const sendMessage = async () => {
        try {
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: textInput,
                temperature: 0.1,
                max_tokens: 150,
                n: 1,
            })
            const respuesta = response?.data?.choices[0]?.text?.trim();
            setMessages([...messages, { content: respuesta, sender: 'bot' }]);

            setTextInput('');
        } catch (error) {

        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hola soy un chat</Text>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                style={styles.body}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Text style={{ fontWeight: 'bold', color: item.type === 'user' ? 'blue' : 'black' }}>
                            {item.type === 'user' ? 'Tu: ' : 'Bot: '}
                        </Text>
                        <Text style={styles.bot}>{item.text}</Text>
                    </View>
                )}
            />
            <TextInput
                style={styles.input}
                value={textInput}
                onChangeText={(text) => setTextInput(text)}
                placeholder="Pregunta rápido"
            />
            <TouchableOpacity style={styles.button} onPress={sendMessage}>
                <Text style={styles.buttonText}>Enviar Pregunta</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    body: {
        flex: 1,
        width: '100%',
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    bot: {
        flex: 1,
    },
};

export default ChatGPTInteligente;