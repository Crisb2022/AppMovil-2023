import React from "react";
import { View } from "react-native";

const Task = () => {
    return (
        <View style = {styles.item}>
            <View style={styles.itemLeft}>
                <Image style={styles.image} source={{uri: Task.urls.raw}} />
                <Text style></Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {

    },
    itemLeft:{

    },
    image:{

    }
})

export default Task;