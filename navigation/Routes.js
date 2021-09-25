import React,{useContext,useEffect,useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AuthStacks from './AuthStack'
import AppStacks from './AppStack'
import {AuthContext} from './AuthProvider'

const Routes = () =>{
    return(
        <NavigationContainer>
            <AppStacks/>
        </NavigationContainer>
    );
}
export default Routes;