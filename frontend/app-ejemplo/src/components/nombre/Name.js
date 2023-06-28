import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from "react-native";



const Name = () => {

    // Declaracion de variables
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [view, setView] = useState(false);

    function handleSubmit(nombre, apellido) {
        const nombreCompleto = "Hola tu con el nombre: " + nombre + " " + apellido + " ";
        return nombreCompleto;
    }
    return <View>
        <Text style={styles.texto}> Ingreso de datos </Text>
        <TextInput style={styles.nameText}
            placeholder="Ingresar su nombre"
            value={nombre}
            onChangeText={(text) => setNombre(text)} />
        <TextInput style={styles.nameText}
            placeholder="Ingresar su apellido"
            value={apellido}
            onChangeText={(text) => setApellido(text)} />
        <TouchableOpacity
            style={styles.colorBtn}
            onPress={() => setView(true)}
        >
            <Text style={styles.colorTxtBtn}>Aceptar</Text>
        </TouchableOpacity>

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
                        height: '20%',
                        width: '90%',
                        backgroundColor: '#FFF',
                        borderRadius: 0.25
                    }}
                >
                    <Text style={styles.texto}>
                        {handleSubmit(nombre, apellido)}
                    </Text>
                    <TouchableOpacity
                        onPress={() => setView(false)}
                        style={styles.colorBtn}
                    >
                        <Text style={styles.colorTxtBtn}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

    </View>
}



const styles = StyleSheet.create({
    texto: {
        color: "#2E86C1",
        fontSize: 25,
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
        borderColor: "#3498DB",
        paddingRight: 12,
    }, colorBtn: {
        borderWidth: 1,
        borderColor: '#007BFF',
        backgroundColor: '#007BFF',
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 7
    }, colorTxtBtn: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center'
    }
})

export default Name;