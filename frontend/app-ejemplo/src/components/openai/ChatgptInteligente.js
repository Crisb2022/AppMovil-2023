import React, { useState } from "react";
import { TextInput, View, StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import { OpenAIApi, Configuration } from 'openai'
import {Text, View, StyleSheet, Button, TextInput} from "react-native";
import * as ExpoDocumentPicker from "expo-document-picker";

const conf = new Configuration({
    apiKey: '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'
})

const openai = new OpenAIApi(conf)



    const message = async () => {
        // Grupo 1
        try {
            const completion = await openai.createCompletion({
                model: 'text-davinci-003',
                prompt: 'Mostrar el resultado en binario de: ' + prompt,
                temperature: 0.1,
                max_tokens: 150
            },
            )
            console.log(completion)
            const result = completion.data.choices[0].text;
            contadorToken(result);
            console.log(contadorToken);
            setData([...data, { type: 'user', text: prompt }, { type: 'bot', text: result }]);
            setPrompt('');
        } catch (error) {
            console.log(error)
        }
    };

    function contadorToken(result) {
        const tokenCount = result.split(' ').length;
        return tokenCount;
    }

    const ChatGPTInteligente = () => {
        const [data, setData] = useState([]);
        const [prompt, setPrompt] = useState('')
        const [file, setFile] = useState()
        const [question, setQuestion] = useState('')
        const [resultado, setResultado] = useState('')
    
    
        const handleUpload = async () => {
            try {
                const data = new FormData()
                data.append('question', question)
                data.append('file', file)
                console.log(data.get('file'))
                const response = await fetch('http://localhost:9003/upload', {
                    method: 'POST',
                    body: data
                })
                if (response.ok) {
                    setQuestion('')
                    const responseJSON = await response.json()
                    setResultado(responseJSON.text)
                }
            } catch (error) {
                console.log(error)
            }
    
        }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hola, puedes preguntarme cualquier duda!</Text>
            <FlatList
                data={data}
                keyExtractor={(index) => index.toString()}
                style={styles.body}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', padding: 5 }}>
                        <Text style={{ fontWeight: 'bold', color: item.type === 'user' ? '#DE5F65' : '#1635BE' }}>
                            {item.type === 'user' ? 'User: ' : 'Chat: '}
                        </Text>
                        <Text >{item.text}</Text>
                    </View>
                )}
            />
            <TextInput
                style={styles.input}
                value={prompt}
                onChangeText={(text) => setPrompt(text)}
                placeholder="Escribir algo..."
            />
            <TouchableOpacity style={styles.button} onPress={message}>
                <Text style={styles.buttonText}>Preguntar</Text>
            </TouchableOpacity>
            <View>
                <Text>Numero de Tokens {contadorToken}</Text>
            </View>
            <View>
                <Button title={'Selecciona PDF'} onPress={handleFilePicker} />
                <TextInput style={styles.input} value={question} onChangeText={setQuestion}
                    placeholder={'Ingresa tu pregunta'} />
                <Button title={'send'} onPress={handleUpload} />
                <Text>{result}</Text>
            </View>
        </View>
    );


}
const styles = StyleSheet.create({
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
        width: '100%',
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        paddingHorizontal: 10,
        fontSize: 15
    },
    button: {
        backgroundColor: '#DE5F65',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
        textAlign: 'center'
    },  input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10
    }
})

export default ChatGPTInteligente