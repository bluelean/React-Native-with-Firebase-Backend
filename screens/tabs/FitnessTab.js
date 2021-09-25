import React,{useState,useContext,useEffect} from 'react'
import { StyleSheet, View, Text, Image} from "react-native";
import Profile from '../Profile'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const FitnessTabs = createBottomTabNavigator();

export default function FitnessTab() {

    
    return(
        <FitnessTabs.Navigator
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
            <FitnessTabs.Screen
            options={{
                tabBarIcon:({focused}) => (
                <View style={{alignItems:'center'}}>
                    <MaterialCommunityIcons name={'hand-heart'} size={25} color={focused ? '#603562' : '#88708a'}/>
                    <Text style={{fontSize:10,color: focused? '#603562' : '#88708a'}}>Adopt Fitness</Text>
                </View>
                )
            }}
            name="Adopt" component={Profile} />

            <FitnessTabs.Screen
            options={{
                tabBarIcon:({focused}) => (
                <View style={{alignItems:'center'}}>
                    <MaterialCommunityIcons name={'store'} size={25} color={focused ? '#603562' : '#88708a'}/>
                    <Text style={{fontSize:10,color: focused? '#603562' : '#88708a'}}>Fitness Store</Text>
                </View>
                ),
            }}
                name="FitnessStore" component={Profile} />

            
            <FitnessTabs.Screen
            options={{
                tabBarIcon:({focused}) => (
                <View style={{alignItems:'center'}}>
                    <MaterialCommunityIcons name={'file-find'} size={25} color={focused ? '#603562' : '#88708a'}/>
                    <Text style={{fontSize:10,color: focused? '#603562' : '#88708a'}}>Find/Lost Fitness</Text>
                </View>
                ),
            }}
                name="Find" component={Profile} />

            </FitnessTabs.Navigator>
    );
}
const styles = StyleSheet.create({
  
})