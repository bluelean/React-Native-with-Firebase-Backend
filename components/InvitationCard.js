import firestore from '@react-native-firebase/firestore'
import React,{useState,useContext,useEffect,useRef} from 'react'
import { View, Text, StyleSheet,ScrollView, ActivityIndicator } from 'react-native'
import { Divider, Avatar, Button } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthContext } from '../navigation/AuthProvider'

import {UserContext} from '../context/UserContext'

const InvitationCard = (props) =>{
    const {user} = useContext(AuthContext);
    const {connection_invites,connections} = useContext(UserContext)
    const[userProfile, setUser] = useState(null);
    const[loading , setLoading] = useState(false);

    useEffect(()=>{
        firestore().collection('users').doc(props.id).get().then(data=>{
            setUser(data.data())
        })
    },[props.id])

    const Accept = async () => {
        if(!loading){
            setLoading(true);
            let temp = connection_invites.filter(item=>item!==props.id)
            let tempCon = connections
            tempCon.push(props.id)
            // temp = temp.splice(temp.indexOf(props.id),1);
            firestore().collection('users').doc(user.uid).update({
                connection_invites: temp,
                connections: tempCon, 
            })

            let temp1 = userProfile.connection_requests.filter(item=>item!==user.uid)
            // temp1 = temp1.splice(temp1.indexOf(user.uid),1);
            // temp1.filter(item=> item!==user.uid)

            let tempCon1 =userProfile.connections!==undefined? userProfile.connections : []
            tempCon1.push(user.uid)

            firestore().collection('users').doc(props.id).update({
                connection_requests: temp1,
                connections: tempCon1
            })
            showToast(`${userProfile.name} is now your connection`);
        }
    }

    const showToast = (text) => {
        ToastAndroid.showWithGravity(
          text,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setLoading(false);
    };

    return(
        <>{userProfile?
        <>
        <View style={styles.card}>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            <Avatar.Image size={55} source={{uri:userProfile.profile_image}}/>
            <Text style={{marginLeft:5,fontSize:16}}>{userProfile.name}</Text>
            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            <Text onPress={()=>Accept()} style={styles.button}>{loading?<ActivityIndicator color='black'/>:'Accept'}</Text>
            <MaterialCommunityIcons style={{marginLeft:8}} name='close' color='blue' size={24}/>
            </View>
        </View>
        <Divider/>
        </>
         :null
        }
        </>
    )
}

export default InvitationCard;
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
