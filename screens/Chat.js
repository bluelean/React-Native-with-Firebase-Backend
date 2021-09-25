import React,{useState,useContext,useEffect,useRef} from 'react'
import { View, Text, StyleSheet,ScrollView, TouchableHighlight } from 'react-native'
import { Divider, Avatar, Button } from 'react-native-paper'
import { AuthContext } from '../navigation/AuthProvider'
import { ChatContext} from '../context/ChatContext'
import { useNavigation } from '@react-navigation/native';
import firestore  from '@react-native-firebase/firestore'
export default function Chat(props) {
    const {user} = useContext(AuthContext);
    const {chatUser} = useContext(ChatContext);

    const rootNavigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            {chatUser.lenght?
                // <View style={styles.box}>
                //     <ChatCard data={userDetail}/>
                // </View>
                <>
                {chatUser.map(item=>{
                    <ChatCard key={item.id} chatId={item.id} id={user.uid==item.data.users[0]? item.data.users[1]: item.data.users[0]} data={item.data}/>
                })}
                </>
                :
                <Text style={{fontSize:12,textAlign:'center',marginTop:50}}>No chats yet</Text>
            }
        </ScrollView>
    )
}

const ChatCard = (props) =>{
    const[user, setUser] = useState(null);
    const rootNavigation = useNavigation();

    useEffect(()=>{
        GetUser();
    },[props.data.users])

    const GetUser = async() =>{
        firestore().collection('users').doc(props.id).get().then(snap=>{
            setUser(snap.data());
        })
    }

    return(
        <>
        {user?
            <TouchableHighlight onPress={()=>{rootNavigation.navigate('Messages',{name:props.data.name,chatId:props.chatId,profile_image:user.profile_image})}}>
                <View style={styles.card}>
                    <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                        <Avatar.Image size={55} source={{uri:props.data.profile_image}}/>
                        <Text style={{marginLeft:5,fontSize:15}}>{props.data.name}</Text>
                    </View>
                </View>
                <Divider/>
            </TouchableHighlight>
        :null
        }
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop:70,
        paddingHorizontal:8
    },
    box:{
        backgroundColor:'white',
        borderRadius:10,
        marginVertical:5,
        elevation:5,
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
        borderRadius:3
    }
})
