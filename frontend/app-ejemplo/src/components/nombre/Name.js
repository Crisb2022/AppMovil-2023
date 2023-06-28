import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from "react-native";



const Name = () => {

    // Declaracion de variables
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');

    const handleSubmit = () => {
        console.log("Hola: ", nombre, " ",apellido)
    }

    return <View>
        <Text style={styles.texto}> Formulario </Text>
        <TextInput style={styles.nameText}
            placeholder="Nombre" 
            value={nombre}
            onChangeText={(text) => setNombre(text)}/>
        <TextInput style={styles.nameText}
            placeholder="Apellidos" 
            value={apellido}
            onChangeText={(text) => setApellido(text)}/>
        <TouchableOpacity
            style={styles.colorBtn}
            onPress={handleSubmit}
        >
            <Text style={styles.colorTxtBtn}>Aceptar</Text>
        </TouchableOpacity>

        <View>
            <Text style={styles.texto}>
                Hola {nombre} {apellido}
            </Text>
        </View>
    </View>
}



const styles = StyleSheet.create({
    texto: {
        color: "black",
        fontSize: 18,
        marginTop: 20,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'center',

    }, nameText: {
        color: "#95A5A6",
        fontSize: 18,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        fontWeight: '600',
        paddingLeft: 20,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: "black",
        paddingRight: 12,
    }, colorBtn: {
        borderWidth: 1,
        borderColor: '#007BFF',
        backgroundColor: '#007BFF',
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 7,
    }, colorTxtBtn: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center'
    }
})

export default Name;