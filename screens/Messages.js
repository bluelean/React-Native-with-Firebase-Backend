import React, {useState,useEffect,useRef,useContext} from 'react'
import { View, Text, StyleSheet, TouchableHighlight,TextInput,FlatList} from 'react-native'
import { AuthContext } from '../navigation/AuthProvider'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { windowWidth } from '../utils/Dimetions'
import { Avatar } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'
const DATA = [
    
]

const Item = ({ item,currUid, receiever_profile_image, sender_profile_image}) => (
    <>
    {item.data.sender===currUid? 
        <View style={{display:'flex',flexDirection:'row-reverse'}}>
            <Avatar.Image source={{uri:sender_profile_image}} style={{marginHorizontal:3,marginTop:4}} size={30}/>
            <View style={styles.message}>
                <Text style={styles.messageText}>{item.data.message}</Text>
                {/* <Text style={{color:'#737373', alignSelf:'flex-end',fontSize:10}}>{item.data.timestamp}</Text> */}
            </View>
        </View>
    :
        <View style={{display:'flex',flexDirection:'row'}}>
            <Avatar.Image source={{uri:receiever_profile_image}} style={{marginHorizontal:3,marginTop:4}} size={30}/>
            <View style={styles.message}>
                <Text style={styles.messageText}>{item.data.message}</Text>
                {/* <Text style={{color:'#737373', alignSelf:'flex-start',fontSize:10}}>{item.data.timestamp}</Text> */}
            </View>
        </View>
    }
    </>
  );

export default function Messages({route}) {
    const {userDetail,user} = useContext(AuthContext);
    const[chat ,setChat] = useState([]);
    const[msg, setmsg] = useState('');

    useEffect(()=>{
        GetChat();
    },[route.param.chatId])

    const GetChat = async() =>{
        firestore().collection(`chats/${route.param.chatId}/messages`).orderBy('timestamp','desc').onSnapshot(snap=>{
            setChat(snap.docs.map(data=>{return {id:data.id, data: data.data()}}))
        })
    }

    const renderItem = ({ item }) => {
        return (
          <Item item={item} currUid={user.uid} receiever_profile_image={route.param.profile_image}  sender_profile_image={userDetail.profile_image}/>
        );
    };
    
    return (
        <View style={styles.container}>
            <FlatList
                style={{paddingHorizontal:10}}
                data={chat}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                inverted
            />
            <View style={styles.bottom}>
            <TextInput
                style={{ borderColor: 'gray', borderBottomWidth: 1,width:'90%',fontSize:16,color:'black',paddingBottom:3}}
                onChangeText={text => setmsg(text)}
                value={msg}
                placeholder={'Type your message :)'}
                placeholderTextColor={'#595959'}
                maxLength={120}
                multiline
                />
                <TouchableHighlight underlayColor={'rgba(0,0,0,0.2)'} style={{borderRadius:30,padding:5}}  onPress={()=>console.log('pressed')}>
                <MaterialCommunityIcons color={'#525252'} style={{alignSelf:'flex-end'}} name='send' size={30}/>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    bottom:{
        width: windowWidth,
        backgroundColor:'white',
        paddingBottom:10,
        paddingHorizontal:10,
        elevation:5,
        display: 'flex',
        flexDirection:'row',
    },
    message:{
        backgroundColor:'white',
        elevation:1,
        marginVertical:5,
        paddingVertical:5,
        paddingHorizontal:10,
        borderRadius:10,
        maxWidth:'80%',
    },
    messageText:{
        fontSize:15,
    }
})
