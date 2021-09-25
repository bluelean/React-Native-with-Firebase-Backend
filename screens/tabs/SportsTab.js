import React,{useState,useContext,useEffect} from 'react'
import { StyleSheet, View, Text} from "react-native";
import Profile from '../Profile'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const SportsTabs = createBottomTabNavigator();

export default function SportsTab() {

    
    return(
        <SportsTabs.Navigator
        tabBarOptions={{
            showLabel: false,
            style:{
              position: 'absolute',
              top: 0,
              left: 10,
              right: 10,
              elevation:0,
              backgroundColor: '#ffffff',
              borderRadius:15,
              height: 65,
              ...styles.shadow
            }
          }}
        >
            <SportsTabs.Screen
            options={{
                tabBarIcon:({focused}) => (
                <View style={{alignItems:'center'}}>
                    <MaterialCommunityIcons name={'navigation'} size={35} color={focused ? '#603562' : '#88708a'}/>
                    <Text style={{fontSize:10,color: focused? '#603562' : '#88708a'}}>Find Venue</Text>
                </View>
                )
            }}
            name="Venue" component={Profile} />
       
            <SportsTabs.Screen
            options={{
                tabBarIcon:({focused}) => (
                <View style={{alignItems:'center'}}>
                    <MaterialCommunityIcons name={'shopping'} size={35} color={focused ? '#603562' : '#88708a'}/>
                    <Text style={{fontSize:10,color: focused? '#603562' : '#88708a'}}>Sports Wear</Text>
                </View>
                ),
            }}
                name="Connections" component={Profile} />

            </SportsTabs.Navigator>
    );
}
const styles = StyleSheet.create({
  
})