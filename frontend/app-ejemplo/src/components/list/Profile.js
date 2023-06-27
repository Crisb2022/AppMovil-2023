import React from "react";
import { Image, StyleSheet, Text, View, Linking } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"
import Task from "./Task";

const instagram_username = <Icon name="instagram" size={30} color="black"/>
const portafolio_url = <Icon name="globe" size={30} color="black"/>


const Profile = ({task, closeProfile}) => {
    return (
        <View styles={styles.item}>
            <View styles={styles.supimage}>
                <View styles={styles.leftSide}>
                    <Image styles={styles.image} source = {{uri: task.url}}/>
                </View>
                <View styles={styles.rightside}>
                    <Text style ={{color: "blue"}} onPress={() =>{
                        Linking.openUrl(task.user.portafolio_url)
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
                        Linking.openUrl(task.user.portafolio_url)
                    }}>
                        {portafolio_url}
                    </Text>
                </View>
            </View>
            <View style={styles.containerkpi}>
                    <View style={styles.kpiR}>
                    <Image style={styles.image2} source={require('../../../assets/like.png')}/>
                    </View>
            </View>
            <a onClick={
                closeProfile
            }>
                CERRAR
            </a>
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
        display: "center",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-evenly"
    }, redes:{
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row"
    }, containerkpi: {
        width: "100",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    }, kpiR: {
        width: 20
    }, image2: {
        width: 20,
        height: 20
    }
})

export default Profile;