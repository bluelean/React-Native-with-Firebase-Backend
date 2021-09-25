import React,{useContext, useEffect, useState} from 'react'
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { Avatar, Chip, Divider,Button} from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firestore from '@react-native-firebase/firestore'

import { AuthContext } from '../navigation/AuthProvider';
import {UserContext} from '../context/UserContext'

export default function ProfileCard(props) {
    const{user} = useContext(AuthContext);
    const{userRemote, connections, connection_invites, connection_requests} = useContext(UserContext);
    const [save, setSave] = useState(false);
    const [status, setStatus] = useState('Connect');
    const [loading, setLoading] = useState(false);

    const renderItem = ({ item }) => (
        <Chip style={{marginHorizontal:2}} >{item}</Chip>
    );

    useEffect(()=>{
        setSave(userRemote.saved!==undefined && userRemote.saved.length? userRemote.saved.includes(props.profile.id) : false)
    },[userRemote,props.profile])

    const SetSave = async() =>{
        if(!save){
            let temp = [props.profile.id];
            if(userRemote.saved){
                temp = temp.concat(userRemote.saved)
            }
            firestore().collection('users').doc(user.uid).update({
                saved: temp
            })
        }
        else{
            let temp = userRemote.saved
            temp.splice(temp.indexOf(props.profile.id),1);
            firestore().collection('users').doc(user.uid).update({
                saved: temp
            })
        }
    }

    const showToast = (text) => {
        ToastAndroid.showWithGravity(
          text,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
    };

    const ConnectRequest = async() => {
        if(!loading){
            if(status==='Connect'){
                setLoading(true);
                let temp = connection_requests
                temp.push(props.profile.id)
                firestore().collection('users').doc(user.uid).update({
                    connection_requests:temp
                })
                let temp1 = props.profile.data.connection_invites!==undefined ? props.profile.data.connection_invites : []
                temp1.push(user.uid);
                firestore().collection('users').doc(props.profile.id).update({
                    connection_invites: temp1,
                })
                setStatus('Request Sent')
                setLoading(false)
            }
        }
    }

    return (
        <View>
        <View style={styles.container}>
            <View style={styles.head}>
                <Avatar.Image size={150} source={{uri:props.profile.data.profile_image}} />
                <View style={styles.headText}>
                    <Text style={{fontSize:22}}>{props.profile.data.name}</Text>
                    <Text style={{fontSize:18}}>27</Text>
                    <Text style={{fontSize:15,marginTop:10}}>{parseInt(props.profile.distance/1000)} km away <MaterialCommunityIcons size={18} name='near-me'/></Text>
                </View>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity onPress={()=>SetSave()} activeOpacity={0.9}>
                    <View style={styles.button}>
                        <MaterialCommunityIcons size={25} name={save? 'bookmark-check-outline' : 'bookmark'}/>
                        <Text style={styles.buttonText}>{save? 'saved' : 'Save Profile'}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>ConnectRequest()} activeOpacity={0.9}>
                    <View style={styles.button}>
                        {loading?
                            <ActivityIndicator color='black'/>
                            :<MaterialCommunityIcons size={25} name={'account-plus'}/>
                        }
                        <Text style={styles.buttonText}>{status}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Divider style={{marginTop:10}}/>
            <View style={{marginTop:10}}>
                <Text style={{fontSize:18}}>Sports</Text>
                <FlatList
                    style={{marginTop:10}}
                    data={props.profile.data.sports}
                    renderItem={renderItem}
                    keyExtractor={item => item} 
                    horizontal
                />
            </View>
            <Divider style={{marginTop:10}}/>
            {props.profile.about?
            <View style={{marginTop:10}}>
                <Text style={{fontSize:18}}>About</Text>
                <Text style={{marginTop:5,fontSize:15}}>{props.profile.about}</Text>
            </View>
            :null}
        </View>
        <View style={[styles.container,{marginTop:8}]}>
            <Text style={{fontSize:18}}>Pet</Text>
            <View style={styles.petSection}>
                <View style={{display:'flex',justifyContent:'center',marginRight:20}}>
                    <Text style={{fontSize:18}}>Risky (labrador)</Text>
                    <Text></Text>
                    <Button icon="map-marker"  mode="outlined" style={{borderColor:'blue'}} >
                      Meet Near
                    </Button>
                </View>
                <View style={{display:'flex',flexDirection:'row'}}>
                <View style={{alignSelf:'flex-end'}}>
                    <Text>Male</Text>
                    <Text>3 Year old</Text>
                </View>
                <Avatar.Image size={70} source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Labrador_Retriever_portrait.jpg/1200px-Labrador_Retriever_portrait.jpg'}} />
                </View>
            </View>
        </View>
        <View style={{marginTop:20,display:'flex',flexDirection:'row',justifyContent:'center'}}>
            <Button onPress={()=>props.next()} mode='outlined'>Next Profile</Button>
        </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        borderRadius:5,
        backgroundColor:'white',
        elevation:2,
        padding: 10,
    },
    head:{
        display: 'flex',
        flexDirection:'row',
    },
    headText:{
        display: 'flex',
        paddingLeft:20,
        justifyContent:'center'
    },
    buttons:{
        display: 'flex',
        flexDirection:'row',
        marginTop:20,
        justifyContent:'space-around'
    },
    button:{
        display: 'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    petSection:{
        display: 'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    buttonText:{
        fontSize:18,
        marginLeft:5
    },
    buttonOutline:{
        borderWidth:1,
        borderColor:'black',
        padding: 3,
        fontSize:15,
    }
});
