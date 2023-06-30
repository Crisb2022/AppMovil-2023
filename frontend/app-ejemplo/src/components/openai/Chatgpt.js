import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

const ChatGPT = () => {
  // almacenamiento de datos
  const [data, setData] = useState([]);
  // configuracion del IA
  const apiKey = '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';
  const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';
  // texto de ingreso
  const [textInput, setTextInput] = useState('');


  // funcion para el chat
  const handleSend = async () => {
    const prompt = textInput;

    try {
      const response = await axios.post(
        apiUrl,
        {
          // Configuracion de los token
          prompt: prompt,
          max_tokens: 100,
          temperature: 1,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
        }
      );

      const text = response.data.choices[0].text;
      setData([...data, { type: 'user', text: textInput }, { type: 'bot', text: text }]);
      setTextInput('');
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.log('Llegaste al límite. Espera por favor.');
        await wait(10000); // Espera 10 segundos antes de reintentar
        handleSend(); // Llama a handleSend de nuevo para reintentar la solicitud
      } else {
        console.error('Error:', error);
      }
    }
  };

  // Función para esperar un período de tiempo usando promesas
  const wait = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

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
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Aplasta chcha</Text>
      </TouchableOpacity>
    </View>
  );
};

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

export default ChatGPT;