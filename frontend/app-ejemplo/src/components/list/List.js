import React, { useEffect, useState } from "react";
import { Touchable, TouchableOpacity } from "react-native";
import Task from "./Task";
import { FlatList, View, StyleSheet, Text, Item } from "react-native";



const Listcomponent = (props) => {

    const [taskItems, setTaskItems] = useState([])

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
        </View>
    )
}
const styles = StyleSheet.create({

})
export default Listcomponent