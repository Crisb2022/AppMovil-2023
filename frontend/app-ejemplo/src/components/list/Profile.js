import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Task from "./Task";


const Profile = (task) => {
    return (
        <View styles={styles.item}>
            <View styles={styles.supimage}>
                <View styles={styles.leftSide}>
                    <Image styles={styles.image} source = {{uri: task.url}}/>
                </View>
                <View styles={styles.rightside}>
                    <Text style ={{color: "blue"}} onPress={() =>{
                        Linking.openUrl(task.user.social.instagram_username)
                    }}>
                        {task.user.name}
                    </Text>
                </View>
                <View styles={styles.redes}>
                    <Text style ={{color: "blue"}} onPress={() =>{
                        Linking.openUrl(task.user.social.instagram_username)
                    }}>
                        {instagram_username}
                    </Text>
                    <Text style ={{color: "blue"}} onPress={() =>{
                        Linking.openUrl(task.user.social.instagram_username)
                    }}>
                        {instagram_username}
                    </Text>
                    <Text style ={{color: "blue"}} onPress={() =>{
                        Linking.openUrl(task.user.social.instagram_username)
                    }}>
                        {instagram_username}
                    </Text>
                </View>
            </View>
            <View style={styles.containerkpi}>
                    <View style={styles.kpi}>
                    <Image style={styles.image2} source/>
                    </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    items:{
        height: "100%",
        width: "100%",
        backgroundColor: "white",
        borderRadius: "20",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }, supimage:{
        width: "100%",
        height: "100%",
        flexBasis: "70%",
        display: "flex",
        flexDirection: "row"
    }, leftSide:{
        flexBasis: "50%",
        display:"flex",
        justifyContent: "center",
        alignItems: "center"
    }, image:{
        width: 100,
        height: 100,
        borderRadius: 50
    }, rightside:{
        flexBasis: "50%",
        display: "center"
    }
})