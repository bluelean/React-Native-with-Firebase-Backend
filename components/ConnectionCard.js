import React,{useState,useContext,useEffect,useRef} from 'react'
import { View, Text, StyleSheet,ScrollView } from 'react-native'
import { Divider, Avatar, Button } from 'react-native-paper'
import {UserContext} from '../context/UserContext'
import firestore from '@react-native-firebase/firestore'
const ConnectionCard = (props) =>{
    const[user, setUser] = useState(null);

    useEffect(()=>{
        firestore().collection('users').doc(props.id).get().then(data=>{
            setUser(data.data())
        })
    },[props.id])

    return(
        <>{user?
        <>
        <View style={styles.card}>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            <Avatar.Image size={55} source={{uri:user.profile_image}}/>
            <Text style={{marginLeft:5,fontSize:15}}>{user.name}</Text>
            </View>
            <Text style={styles.button}>message</Text>
        </View>
        <Divider/>
        </>
        :null}
        </>
    )
}

export default ConnectionCard;

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