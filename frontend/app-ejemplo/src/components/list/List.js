import React, { useEffect, useState } from "react";
import { Touchable, TouchableOpacity } from "react-native";
import { FlatList, View } from "react-native";



const Listcomponent= () =>{

    const [taskItems, setTaskItems] = useState([])

    useEffect(()=>{
        fetchData();
    }, [])

    const fetchData = async () =>{
        try {
            const response = await fetch('https://api.unsplash.com/photos/?client_id=ZXjOAAdwefwfYGtyhjJmAerkWnGDxNNnEwTlnHkSqk4');
            const jsonData = await response.json();
            console.log(jsonData)
            setTaskItems(jsonData)   
        } catch (error) {
            console.log("error: ", error)
        }
    }

    const item = () =>{
        return (
            <TouchableOpacity style={styles.peritem} key={i} onPress={() =>{getProfile()}}>
                <Task></Task>
            </TouchableOpacity>
        )
    }

    return( taskItems &&
        <View style={styles.container}>
            <View style={styles.taskWrapper}> 
                <Text style={styles.sectiontitle}>Se listan los perfinles</Text>
                <View style={styles.items}>
                    <FlatList>
                        data = {}
                    </FlatList>
                </View>
            </View>
            Hola
        </View>
    )
}
const styles = StyleSheet.create({

})
export default Listcomponent