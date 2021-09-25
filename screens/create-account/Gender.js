import React, { Component, useState,useContext } from 'react'
import { Text, View, Image, StyleSheet, ActivityIndicator } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Button } from 'react-native-elements';
import {windowWidth} from '../../utils/Dimetions'


export default function Gender(props){
    
    const[gender, setGender] = useState(''); 
    
    const selectedGender = (g) =>{
        setGender(g);
        props.gender(g);
    }
    
    async function UpdateGender(){
        // if(gender!==''){
        // setLoading(true);
        // try{
        //     let result = await firestore().collection('users').doc(user.uid).update({
        //         gender:gender,
        //     })
        // }catch(e){
        //     return setLoading(false);
        // }
        // setLoading(false);
        // }
    }
        return (
            <View style={styles.container}>
                <View>
                    <Image style={styles.image} source={require('../../assets/onboarding/basketball.png')}/>
                </View>
                <Text style={styles.title}>What is your Gender?</Text>
                <View style={{marginTop:20}}>
                    <Button
                        icon={
                            <View>
                                {gender=='M'?
                                <FontAwesome style={{marginRight:20}} name='check' color='white' size={25}/>
                            :null
                            }
                            </View>
                        }
                        title="Male"
                        containerStyle={{marginTop:10,width:200,elevation:gender=='M'?10:0}}
                        titleStyle={{fontSize:20}}
                        onPress={()=>selectedGender('M')}
                    />
                    <Button
                        icon={
                            <View>
                                {gender=='F'?
                                <FontAwesome style={{marginRight:20}} name='check' color='white' size={25}/>
                            :null
                            }
                            </View>
                        }
                        title="Female"
                        containerStyle={{marginTop:10,width:200,elevation:gender=='F'?10:0}}
                        titleStyle={{fontSize:20}}
                        onPress={()=>selectedGender('F')}
                    />
                    <Button
                        icon={
                            <View>
                                {gender=='O'?
                                <FontAwesome style={{marginRight:20}} name='check' color='white' size={25}/>
                            :null
                            }
                            </View>
                        }
                        title="Non binary"
                        containerStyle={{marginTop:10,width:200,elevation:gender=='O'?10:0}}
                        titleStyle={{fontSize:20}}
                        onPress={()=>selectedGender('O')}
                    />
                </View>
            </View>           
        )
    
}

const styles = StyleSheet.create({
   container:{
       flex: 1,
       justifyContent:'center',
       alignItems:'center',
       backgroundColor:'#5D2448',
       width: windowWidth,
   },
   image:{
    width: 200,
    height: 200,
    },
    title:{
      color: 'white',
      fontSize:22,
      marginTop:25
    },
   done:{
       elevation:10,
       backgroundColor:'white',
       borderRadius:100,
       padding: 5,
       backgroundColor:'red',
       marginTop:90,
       zIndex:10
   }
})