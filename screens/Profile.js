import React,{useState,useContext,useEffect, useRef} from 'react'
import { ActivityIndicator, StyleSheet, View,  ScrollView, Text, ToastAndroid} from "react-native";
import {windowWidth} from '../utils/Dimetions'
import ProfileCard from '../components/ProfileCard';

import { ProfileContext } from '../context/ProfilesContext';

export default function Profile() {
    const{loading,profiles} = useContext(ProfileContext);
    const scrollRef = useRef();
    const[profileIndex, setProfileIndex] = useState(0);
    
    return(
        <View>
            {loading?
            <View style={{paddingTop:100}}>
                <ActivityIndicator size='large' color='#63254C'/>
            </View>
            :
            <>
            {profiles.length?
                <ScrollView ref={scrollRef} style={styles.container}>
                <ProfileCard next={()=>{setProfileIndex(profiles.length-1==profileIndex? 0: profileIndex+1)}} profile={profiles[profileIndex]}/>
                </ScrollView>
                :
                <View style={[styles.container,{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}]}>
                    <Text style={{fontSize:13, fontWeight:'bold'}}>Sorry, No profile found for you</Text>
                </View>
            }
            </>
            }
        </View>
    );
}
const styles = StyleSheet.create({
    header:{
        display: 'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:20,
        backgroundColor:'white',
        paddingVertical:10,
        elevation:5,
        borderRadius:10,
        marginHorizontal:8,
    },
    container:{
        width: windowWidth,
        paddingHorizontal:8,
        paddingTop:10,
        marginTop:65,
    }
})