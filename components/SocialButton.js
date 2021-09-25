import React from 'react'
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import {windowHeight,windowWidth} from './../utils/Dimetions'

const SocialButton = ({title, btnType, color, backgroundColor, onPress, ...rest}) =>{
    let bgColor = backgroundColor;
    return(
        <TouchableOpacity onPress={onPress} style={[styles.buttonContainer,{backgroundColor:bgColor}]}>
            <View style={styles.iconWrapper}>
               <FontAwesome name={btnType} style={styles.icon} size={22} color={color}/>
            </View>
            <View style={styles.btnTxtWrapper}>
            <Text style={[styles.buttonText,{color:color}]} style={styles.buttonText}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    buttonContainer:{
        marginTop:10,
        width: '100%',
        height: windowHeight/15,
        padding: 10,
        alignItems:'center',
        flexDirection:'row',
        borderRadius:3,
    },
    iconWrapper:{
       width: 30,
       justifyContent:'center',
       alignItems:'center'
    },
    icon:{
       fontWeight:'bold',
    },
    btnTxtWrapper:{
        flex : 1,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonText:{
        fontSize:18,
        fontWeight:'bold',
        color: '#ffffff',
    }
})
export default SocialButton;