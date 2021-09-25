import React,{useState,useContext,useEffect} from 'react'
import { StyleSheet, View, Text} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Badge} from 'react-native-elements'
import Profile from '../Profile'
import Connections from '../Connections';
import Chat from '../Chat';
import {UserContext} from '../../context/UserContext'
const HomeTabs = createBottomTabNavigator();

export default function HomeTab() {
    const{userRemote} = useContext(UserContext);
    const[connectionBadge, setConnectionBadge] = useState(0);
    const[chatBage, setChatBedge] = useState(0);

    useEffect(()=>{
        if(userRemote!==null && userRemote.connection_invites !== undefined){
            setConnectionBadge(userRemote.connection_invites.length);
        }
    },[userRemote])
    
    return(
        <HomeTabs.Navigator
        tabBarOptions={{
            showLabel: false,
            style:{
              position: 'absolute',
              paddingTop:13,
              top: 0,
              left: 0,
              right: 0,
              elevation:5,
              backgroundColor: '#ffffff',
              height: 70,
              ...styles.shadow
            }
          }}
        >
            <HomeTabs.Screen
            options={{
                tabBarIcon:({focused}) => (
                <View style={{alignItems:'center',borderBottomWidth:3,paddingBottom:5,width:'100%',borderColor:focused?'#63254C':'white'}}>
                    <MaterialCommunityIcons name={'account-search'} size={35} color={focused ? '#63254C' : '#88708a'}/>
                    <Text style={{fontSize:10,color: focused? '#63254C' : '#88708a'}}>Explore</Text>
                </View>
                )
            }}
            name="Home" component={Profile} />
       
            <HomeTabs.Screen
            options={{
                tabBarIcon:({focused}) => (
                <View style={{alignItems:'center',borderBottomWidth:3,paddingBottom:5,width:'100%',borderColor:focused?'#63254C':'white'}}>
                    <Badge value={connectionBadge} badgeStyle={{display:connectionBadge?'flex':'none'}} containerStyle={{position:'absolute',zIndex:2,paddingLeft:30}}/>
                    <MaterialCommunityIcons name={'account-group'} size={35} color={focused ? '#63254C' : '#88708a'}/>
                    <Text style={{fontSize:10,color: focused? '#63254C' : '#88708a'}}>Connections</Text>
                </View>
                ),
            }}
                name="Connections" component={Connections} />

            <HomeTabs.Screen
            options={{
                tabBarIcon:({focused}) => (
                <View style={{alignItems:'center',borderBottomWidth:3,paddingBottom:5,width:'100%',borderColor:focused?'#63254C':'white'}}>
                    <MaterialCommunityIcons name={'chat'} size={35} color={focused ? '#63254C' : '#88708a'}/>
                    <Text style={{fontSize:10,color: focused? '#63254C' : '#88708a'}}>Chats</Text>
                </View>
                ),
            }}
                name="Chats" component={Chat} />
            </HomeTabs.Navigator>
    );
}
const styles = StyleSheet.create({
  
})