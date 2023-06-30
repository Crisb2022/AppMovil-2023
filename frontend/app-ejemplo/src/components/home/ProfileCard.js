import React from "react";
import { StyleSheet,  View, Image, Text, Linking} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const twitter = <Icon name="twitter" size={30} color={"black"}/>
const facebook = <Icon name="facebook" size={30} color={"black"}/>
const instagram = <Icon name="instagram" size={30} color={"black"}/>
const linkdIn = <Icon name="linkedin" size={30} color={"black"}/>
const tiktok = <Icon name="music" size={30} color={"black"}/>

const ProfileCard = () => {
    const user = { 
        avatar: "https://i.pinimg.com/736x/ef/a1/40/efa14011ede7042579f6c7dd475ce7b7--mario-luigi-mario-bros.jpg",
        coverPhoto: "https://i.pinimg.com/736x/c5/ae/09/c5ae09161054b4bb4e03d5f0f0363c36--retro-video-games-retro-videos.jpg",
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
                <Text style={{color: "blue"}} onPress={()=> Linking.openURL("https://www.twitter.com")}>
                    {twitter}
                </Text>
                <Text style={{color: "blue"}} onPress={()=> Linking.openURL("https://www.facebook.com")}>
                    {facebook}
                </Text>
                <Text style={{color: "blue"}} onPress={()=> Linking.openURL("https://www.instagram.com")}>
                    {instagram}
                </Text>
                <Text style={{color: "blue"}} onPress={()=> Linking.openURL("https://www.linkdIn.com")}>
                    {linkdIn}
                </Text>
                <Text style={{color: "blue"}} onPress={()=> Linking.openURL("https://www.tiktok.com")}>
                    {tiktok}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container:{
            width: "100%",
            alignItems: "center"
        },
        coverPhoto:{
            width: "100%",
            height: 400,
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
            borderColor: "white"
        },
        name: {
            marginTop: 15,
            fontSize: 20,
            fontWeight: "bold"
        }, buttonContainer:{
            flexDirection: "row", 
            marginTop: 20,
            width: "60%",
            justifyContent: "space-between"
        }
    }
) 

export default ProfileCard;