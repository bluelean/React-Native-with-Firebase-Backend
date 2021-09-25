import React from 'react'
import {Text, View, TouchableHighlight,StyleSheet, ActivityIndicator} from 'react-native'
import {windowHeight} from './../utils/Dimetions'

const FormButton = ({title,onPress,loading, ...rest}) =>{
    return(
        <TouchableHighlight activeOpacity={0.5} underlayColor={'#1b51cf'} onPress={loading? null: onPress} style={styles.buttonContainer}>
            <View>
            {console.log(loading)}
            {loading?
              <ActivityIndicator color='white'/>
              : <Text style={styles.buttonText}>{title}</Text> 
            }
            </View>
        </TouchableHighlight>
    )
}
const styles = StyleSheet.create({
    buttonContainer:{
        marginTop:10,
        width: '100%',
        height: windowHeight/15,
        backgroundColor: '#2e64e5',
        padding: 10,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
    },
    buttonText:{
        fontSize:18,
        fontWeight:'bold',
        color: '#ffffff',
    }
})
export default FormButton;