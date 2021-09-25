import React from 'react'
import { View, TextInput, StyleSheet} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { windowHeight, windowWidth } from '../utils/Dimetions'
const FormInput = ({lableValue, placeholderText, iconType, ...rest}) => {
    return(
        <View style={styles.inputContainer}>
            <View style={styles.iconStyle}>
                <AntDesign name={iconType} size={25} color='white'/>
            </View>
            <TextInput
              style={styles.input}
              value={lableValue}
              placeholder={placeholderText}
              placeholderTextColor='#666'
              {...rest}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    inputContainer:{
        marginTop:5,
        marginBottom:10,
        width: '100%',
        height: windowHeight/15,
        borderColor:'#ccc',
        borderRadius:20,
        borderWidth:1,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    iconStyle:{
        padding: 10,
        height: '100%',
        justifyContent:'center',
        alignItems:'center',
        borderRightColor:'#ccc',
        borderRightWidth:1,
        width: 50,
        backgroundColor:'#60264C',
        borderTopLeftRadius:15,
        borderBottomLeftRadius:15,
    },
    input:{
        padding: 10,
        flex: 1,
        fontSize: 16,
        color: '#60264C',
        justifyContent:'center',
        alignItems:'center',
    },
    inputField:{
        padding: 10,
        marginTop:5,
        marginBottom:5,
        width: windowWidth/1.5,
        height: windowHeight/15,
        fontSize: 16,
        borderRadius: 8,
        borderWidth:1
    }
})

export default FormInput;