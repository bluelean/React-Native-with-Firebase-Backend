import React,{useState,useContext,useEffect,useRef} from 'react'
import { View, Text, StyleSheet,ScrollView } from 'react-native'
import { Divider, Avatar, Button } from 'react-native-paper'
import { AuthContext } from '../navigation/AuthProvider'
import {UserContext} from '../context/UserContext'
import RequestCard from '../components/RequestCard'
import ConnectionCard from '../components/ConnectionCard'
import InvitationCard from '../components/InvitationCard'

export default function Connections(props) {
    const {userDetail} = useContext(AuthContext);
    const {userRemote,connections,connection_invites,connection_requests} = useContext(UserContext);

    return (
        <ScrollView alwaysBounceVertical={true} style={styles.container}>
           {connection_invites.length?
                <View style={styles.box}>
                    <Text style={styles.heading}>Invitations</Text>
                    <Divider/>
                    {connection_invites.map(item=>{
                        return(
                            <InvitationCard key={item} id={item}/>
                        )})
                    }
                </View>
           :null}
            {connection_requests.length?
                <View style={styles.box}>
                <Text style={styles.heading}>Pending Requests</Text>
                <Divider/>
                {connection_requests.map(item=>{
                    return(
                        <RequestCard key={item}  id={item}/>
                        )})
                }
                </View>
            :null}
            {connections.length?
            <View style={[styles.box,{marginBottom:75}]}>
                <Text style={styles.heading}>Your Connections</Text>
                <Divider/>
                {connections.map(item=>{
                    return(
                        <ConnectionCard key={item} id={item} />
                    )
                })}
            </View>
            :
            <View style={styles.container}>
              <Text style={{textAlign:'center'}}>No Connections</Text>
            </View>}
        </ScrollView>
    )
}

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
        borderRadius:3
    }
})
