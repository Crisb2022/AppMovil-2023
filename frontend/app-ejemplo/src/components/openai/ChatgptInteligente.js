import React, { useState } from "react";
import { TextInput, View, StyleSheet, Text, FlatList, TouchableOpacity, Modal } from "react-native";
import { OpenAIApi, Configuration } from 'openai'

const conf = new Configuration({
    apiKey: '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'
})

const openai = new OpenAIApi(conf)

const ChatGPTInteligente = () => {
    const [data, setData] = useState([]);
    const [prompt, setPrompt] = useState('');
    const [view, setView] = useState(false);
    const [option, setOption] = useState('');

    const message = async (option) => {
        setView(false)
        try {
            if (option === '1') {
                // Grupo 1
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
            } else if (option === '2') {
                // Grupo 2
                const completion = await openai.createCompletion({
                    model: 'text-davinci-003',
                    prompt: 'Contar el numero de vocales del siguiente texto: ' + prompt,
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
            } else if (option === '') {
                const completion = await openai.createCompletion({
                    model: 'text-davinci-003',
                    prompt: prompt,
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
            }
            else if (prompt === '' && option === '1' || option === '2') {
                const result = 'No Realizaste ninguna pregunta';
                contadorToken(result);
                console.log(contadorToken);
                setData([...data, { type: 'user', text: 'No realizaste ninguna pregunta' }, { type: 'bot', text: result }]);
                setPrompt('');
            }


        } catch (error) {
            console.log(error)
        }
    };

    function contadorToken(result) {
        const tokenCount = result.split(' ').length;
        return tokenCount;
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
                <Text>Numero de Tokens</Text>
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
        fontSize:15
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
    },
    texto: {
        color: "#2E86C1",
        fontSize: 15,
        marginTop: 20,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'left',

    }
})

export default ChatGPTInteligente