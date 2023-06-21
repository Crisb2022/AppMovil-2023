import React from "react";
import { StyleSheet,  View, Image, Text} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const twitter = <Icon name="twitter" size={30} color={"black"}/>

const ProfileCard = () => {
    const user = { 
        avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
        coverPhoto: "https://wallpapers.com/images/hd/profile-picture-background-10tprnkqwqif4lyv.jpg",
        name: "Cristian Caceres"
    }
    return (
        <View style = {styles.container}>
           <Image source={{uri: user.coverPhoto}} style={styles.coverPhoto} />
            <View style={styles.avatarContainer}>
                <Image source={{uri: user.avatar}} style={styles.avatar}/>
                <Text style={styles.name}>
                    {user.name}
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <Text style={{color: "blue"}} onPress={()=> Linking.openURL("twitter.com")}>

                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container:{
            width: "50%",
            alignItems: "center"
        },
        coverPhoto:{
            width: "100%",
            height: 200,
            resizeMode: "cover"
        },
        avatarContainer:{
            alignItems: "center",
            marginTop: -75
        },
        avatar:{
            width: 150,
            height: 150,
            borderRadius: 75,
            borderWidth: 5,

        },
        name: {
            marginTop: 15,
            fontSize: 20,
            fontWeight: "bold"
        }, buttonContainer:{
            flexDirection: "row",
        }
    }
) 

export default ProfileCard;