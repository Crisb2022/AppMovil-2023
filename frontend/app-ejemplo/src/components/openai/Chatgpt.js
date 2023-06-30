import axios from "axios";
import React, {useState} from "react";
import { Text, View, FlatList, StyleSheet, TextInput, TouchableOpacity } from "react-native";


const ChatGPT = () =>{
    // 
    const [data, setData] = useState([]);
    const apiKey = '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'
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions'
    const [textInput, setTextInput] = useState('')

    const handleSend = async () => {
        const prompt = textInput;
      
        try {
          const response = await axios.post(apiUrl, {
            prompt: prompt,
            max_tokens: 1024,
            temperature: 0.5,
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            }
          });
      
          const text = response.data.choices[0].text;
          setData([...data, { type: 'user', 'text': textInput }, { type: 'bot', 'text': text }]);
          setTextInput('');
        } catch (error) {
          if (error.response && error.response.status === 429) {
            console.log('Llegaste al limite espera por favor');
            await wait(10000); // Espera 5 segundos antes de reintentar
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
        <View style = {styles.catainer}>
            <Text style = {styles.title}> Hola soy un chat </Text>
            <FlatList 
                data = {data}
                keyExtractor={(item, index) => index.toString}
                style= {styles.body}
                renderItem={({item}) => (
                    <View style ={{flexDirection: 'row', padding:10}}>
                        <Text style={{fontWeight:'bold', color: item.type === 'user'? 'green': 'red'}}>
                        {item.type ==='user'?'Tu: ':'Bot: '}
                        </Text>
                        <Text style={styles.bot}>
                            {item.text}
                        </Text>
                    </View>
                )}
            />
            <TextInput 
                style = {styles.input}
                value = {textInput}
                onChangeText={text => setTextInput(text)}
                placeholder="Pregunta rapido mmv" 
                
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleSend}
            >
                <Text style={styles.buttonText}>Aplasta chcha</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#ffffff',
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      body: {
        flex: 1,
        marginBottom: 10,
      },
      bot: {
        flex: 1,
        marginLeft: 5,
      },
      input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
      },
      button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
      }
})

export default ChatGPT;