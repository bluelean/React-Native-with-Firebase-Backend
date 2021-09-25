import React, { useEffect, useRef } from 'react'
import { StyleSheet, View, Text,TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import HomeTab from './HomeTab';
import ProfileTab from './ProfileTab'
import SportsTab from './SportsTab';
import PetTab from './PetTab';

const Tab = createBottomTabNavigator();

export default function Tabs() {
    
    return(
        <Tab.Navigator
         tabBarOptions={{
           showLabel: false,
           style:{
             position: 'absolute',
             bottom: 6,
             left: 6,
             right: 6,
             elevation:0,
             backgroundColor: '#63254C',
             borderRadius:15,
             height: 62,
             ...styles.shadow
           },
         }}
         screenOptions={{ tabBarButton: props => <TouchableOpacity activeOpacity={0.6} {...props} />}}
        >
        <Tab.Screen
        options={{
          tabBarIcon:({focused}) => (
            <View style={{alignItems:'center'}}>
              <MaterialCommunityIcons name={'home'} size={30} color={focused ? 'white' : '#bfbfbf'}/>
              <Text style={{fontSize:10,color: focused? 'white' : '#bfbfbf'}}>HOME</Text>
            </View>
          ),
        }}
        name="Home" component={HomeTab} />
        <Tab.Screen 
        options={{
          tabBarIcon:({focused}) => (
            <View style={{alignItems:'center'}}>
              <MaterialCommunityIcons name={'basketball'} size={30} color={focused ? 'white' : '#bfbfbf'}/>
              <Text style={{fontSize:10,color: focused? 'white' : '#bfbfbf'}}>Sports</Text>
            </View>
          ),
        }}
        name="Sports" component={SportsTab} />

        <Tab.Screen
        options={{
          tabBarIcon:({focused}) => (
            <View style={{alignItems:'center'}}>
              <MaterialCommunityIcons name={'weight-lifter'} size={30} color={focused ? 'white' : '#bfbfbf'}/>
              <Text style={{fontSize:10,color: focused? 'white' : '#bfbfbf'}}>Fitness</Text>
            </View>
          ),
        }}
         name="Fitness" component={HomeTab} />
         <Tab.Screen
        options={{
          tabBarIcon:({focused}) => (
            <View style={{alignItems:'center'}}>
              <MaterialCommunityIcons name={'paw'} size={30} color={focused ? 'white' : '#bfbfbf'}/>
              <Text style={{fontSize:10,color: focused? 'white' : '#bfbfbf'}}>Pet</Text>
            </View>
          ),
        }}
         name="Pet" component={PetTab} />
        <Tab.Screen
        options={{
          tabBarIcon:({focused}) => (
            <View style={{alignItems:'center'}}>
              <MaterialCommunityIcons name={'account'} size={30} color={focused ? 'white' : '#bfbfbf'}/>
              <Text style={{fontSize:10,color: focused? 'white' : '#bfbfbf'}}>PROFILE</Text>
            </View>
          ),
        }}
         name="Profile" component={ProfileTab} />
      </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
  shadow:{
    shadowColor: '#7F5DF0',
    shadowOffset:{
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
})