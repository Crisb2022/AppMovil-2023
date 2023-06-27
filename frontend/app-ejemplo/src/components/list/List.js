import React, { useEffect, useState } from "react";
import { Alert, Modal, Touchable, TouchableOpacity } from "react-native";
import Task from "./Task";
import { FlatList, View, StyleSheet, Text, Item } from "react-native";
import { StatusBar } from "expo-status-bar";
import Profile from "./Profile";



const Listcomponent = (props) => {

    const [taskItems, setTaskItems] = useState([])
    const [showProfile, setShowProfile] = useState(false)
    const [task, setTask] = useState();

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const response = await fetch('https://api.unsplash.com/photos/?client_id=ZXjOAAdwefwfYGtyhjJmAerkWnGDxNNnEwTlnHkSqk4');
            const jsonData = await response.json();
            console.log("------------------------------- ", jsonData)
            setTaskItems(jsonData)
        } catch (error) {
            console.log("error: ", error)
        }
    }

    const closeProfile = () =>{
        setShowProfile(!showProfile)
    }

    const getProfile = (task) =>{
        setShowProfile(true);
        setTask(task)
    }

    const Item = ({ task, i }) => {
        return (
            <TouchableOpacity style={styles.peritem} key={i} onPress={() => { getProfile(task) }}>
                <Task task={task} />
            </TouchableOpacity>
        )
    }

    return (taskItems &&
        <View style={styles.container}>
            <View style={styles.taskWrapper}>
                <Text style={styles.sectiontitle}>Se listan los perfiles</Text>
                <View style={styles.items}>
                    <FlatList data={taskItems}
                        renderItem={({ item, i }) =>
                            <Item task={item} i={i} />
                        }>

                        </FlatList>
                </View>
            </View>
            <Modal
                animationType="slide" transparent={true} visible = {showProfile} onRequestClose={()=>{
                    Alert.alert("El modal se cierra Perro")
                    setShowProfile(!showProfile)
                }}
            >
                <View style= {styles.centeredView}>
                    <View style= {styles.modalView}>
                        <Text style= {styles.modalText}>
                            <Profile task={task} closeProfile={closeProfile}/>
                        </Text>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E8EAED",
        marginTop: StatusBar.currentHeight || 0,
        display: "flex",
        
    }, taskWrapper:{
        paddingTop: 80,
        paddingHorizontal: 20,
        height: 900,
    }, sectiontitle:{
        fontSize: 30,
        fontWeight: "bold",
    }, items:{

    }, peritem:{

    }, centeredView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    }, modalView:{
        margin: 0,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        width: "100%",
        height: 300,
        textShadowOffset:{
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }, modalText:{
        marginBottom: 15,
        textAlign: "center",
        width: "100%"
    }
})
export default Listcomponent;