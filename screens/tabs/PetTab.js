import React,{useState,useContext,useEffect} from 'react'
import { StyleSheet, View, Text, Image} from "react-native";
import Profile from '../Profile'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const PetTabs = createBottomTabNavigator();

export default function PetTab() {

    
    return(
        <PetTabs.Navigator
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
              height: 55,
              ...styles.shadow
            }
          }}
        >
            <PetTabs.Screen
            options={{
                tabBarIcon:({focused}) => (
                <View style={{alignItems:'center'}}>
                    <MaterialCommunityIcons name={'hand-heart'} size={25} color={focused ? '#603562' : '#88708a'}/>
                    <Text style={{fontSize:10,color: focused? '#603562' : '#88708a'}}>Adopt Pet</Text>
                </View>
                )
            }}
            name="Adopt" component={Profile} />

            <PetTabs.Screen
            options={{
                tabBarIcon:({focused}) => (
                <View style={{alignItems:'center'}}>
                    <MaterialCommunityIcons name={'store'} size={25} color={focused ? '#603562' : '#88708a'}/>
                    <Text style={{fontSize:10,color: focused? '#603562' : '#88708a'}}>Pet Store</Text>
                </View>
                ),
            }}
                name="PetStore" component={Profile} />

            
            <PetTabs.Screen
            options={{
                tabBarIcon:({focused}) => (
                <View style={{alignItems:'center'}}>
                    <MaterialCommunityIcons name={'file-find'} size={25} color={focused ? '#603562' : '#88708a'}/>
                    <Text style={{fontSize:10,color: focused? '#603562' : '#88708a'}}>Find/Lost Pet</Text>
                </View>
                ),
            }}
                name="Find" component={Profile} />

            </PetTabs.Navigator>
    );
}
const styles = StyleSheet.create({
  
})