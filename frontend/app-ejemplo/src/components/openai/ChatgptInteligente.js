import React, { useState } from "react";
import { TextInput, View, StyleSheet, Text, FlatList, TouchableOpacity, Modal } from "react-native";
import { OpenAIApi, Configuration } from 'openai'
import * as ExpoDocumentPicker from "expo-document-picker";

const conf = new Configuration({
    apiKey: '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'
})

const openai = new OpenAIApi(conf)

const ChatGPTInteligente = () => {
    const [data, setData] = useState([]);
    const [prompt, setPrompt] = useState('')

    const message = async (option) => {
        setView(false)
        try {
            const completion = await openai.createCompletion({
                model: 'text-davinci-003',
                prompt: 'Mostrar el resultado en binario de: '+prompt,
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

        const uploadFile = () => {
    const [pdfDoc, setPdfDoc] = useState()
    const [pregunta, setPregunta] = useState('')
    const [result, setResult] = useState('')


    const handleFilePicker = async () => {
        let result = await ExpoDocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
        setPdfDoc(result.file)
    }
    const handleUpload = async () => {
        try {
            const data = new FormData()
            data.append('question', pregunta)
            data.append('file', pdfDoc)
            console.log(data.get('file'))
            const response = await fetch('http://localhost:9006/upload', {
                method: 'POST',
                body: data
            })
            if (response.ok) {
                setPregunta('')
                const responseJSON = await response.json()
                setResult(responseJSON.text)
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
            <TouchableOpacity
                style={styles.button}
                onPress={() => setView(true)}>
                <Text style={styles.button}>Preguntar</Text>
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

            <Modal
                // animacion
                animationType="fade"
                // accion al cerrar el modal
                onDismiss={() => console.log('modal abierto')}
                // accion al ejecutarse
                onShow={() => console.log('abierto')}
                // Prop validaciones booleanas
                transparent
                visible={view}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(1,1,1,0.5)',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <View
                        style={{
                            width: '50%',
                            margin: 20,
                            backgroundColor: '#FFF',
                            borderRadius: 20,
                            alignItems: 'center'
                        }}
                    >
                        <Text style={styles.texto}>
                            Grupo 1.- Convertir respuesta en Binario. Ingresar 1 <br></br>
                            Grupo 2.- Contar vocales. Ingresar 2 <br></br>
                            Puede dejar el casillero en blanco para una conversacion normal 
                        </Text>
                        <TextInput
                            style={styles.input2}
                            value={option}
                            onChangeText={(text) => setOption(text)}
                        />
                        <TouchableOpacity
                            onPress={() => message(option)}
                            style={styles.colorBtn}
                        >
                            <Text style={styles.colorTxtBtn}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

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
    input2: {
        width: '50%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        paddingHorizontal: 10,
        fontSize: 15,
    },
    button: {
        backgroundColor: '#DE5F65',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    colorBtn: {
        borderWidth: 1,
        borderColor: '#007BFF',
        backgroundColor: '#007BFF',
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        borderRadius: 7
    }
    , colorTxtBtn: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center'
    }
})
};

export default ChatGPTInteligente;