import React,{useState,useContext,useEffect,useRef} from 'react'
import { View, Text, StyleSheet, Alert, ActivityIndicator} from 'react-native'
import { Divider, Avatar, Button } from 'react-native-paper'
import {UserContext} from '../context/UserContext'
import firestore from '@react-native-firebase/firestore'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthContext } from '../navigation/AuthProvider'
const RequestCard = (props) =>{
    const[userProfile, setUserProfile] = useState(null);
    const[loading, setLoading] = useState(false);
    const {user} = useContext(AuthContext)
    const{connection_requests} = useContext(AuthContext)

    useEffect(()=>{
        firestore().collection('users').doc(props.id).get().then(data=>{
            setUserProfile(data.data())
        })
    },[props.id])

    const createAlert = () =>
    Alert.alert(
      "Do you Want to undo your request",
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => undoRequest()}
      ],
      { cancelable: false }
    );

    const undoRequest = async() =>{
        if(!loading){
            setLoading(true)
            let temp = connection_requests
            temp = temp.splice(temp.indexOf(props.id),1);
            let temp1 = userProfile.connection_invites
            temp1 = temp1.splice(temp1.indexOf(user.uid),1)

            firestore().collection('users').doc(user.uid).update({
                connection_requests: temp
            })
            firestore().collection('users').doc(props.id).update({
                connection_invites: temp1
            })
            setLoading(false);
        }
    }

    return(
        <>{userProfile?
        <>
        <View style={styles.card}>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            <Avatar.Image size={55} source={{uri:userProfile.profile_image}}/>
            <Text style={{marginLeft:5,fontSize:15}}>{userProfile.name}</Text>
            </View>
            <Text onPress={()=>createAlert()} style={styles.button}>Requested</Text>
        </View>
        <Divider/>
        </>
        :null}
        </>
    )
}
export default RequestCard;

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:8,
        marginTop:70
    },
    box:{
        backgroundColor:'white',
        borderRadius:10,
        marginVertical:5,
        elevation:3,
        paddingHorizontal:10,
        paddingVertical:10,
    },
    heading:{
        fontSize:18
    },
    card:{
        marginVertical:5,
        display: 'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    button:{
        color: 'blue',
        borderWidth:0.4,
        borderColor:'blue',
        padding: 5,
        borderRadius:3,
        fontSize:12
    }
})