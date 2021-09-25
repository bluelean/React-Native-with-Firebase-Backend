import React,{useContext} from 'react'
import { View, Text, Image, StyleSheet,ScrollView,FlatList, TouchableHighlight} from 'react-native'
import {AuthContext} from '../../navigation/AuthProvider'
import { Avatar,Chip,Divider} from 'react-native-paper';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';

export default function ProfileTab() {
    const{logout,userDetail,user} = useContext(AuthContext)
    const rootNavigation = useNavigation();
    const renderItem = ({ item }) => (
        <Chip style={{marginHorizontal:2}} >{item}</Chip>
      );

    const signout = async () =>{
        rootNavigation.reset('Login')
        await logout();
    }
    return (
    <ScrollView style={styles.container}>
        <View>
            <Avatar.Image style={{alignSelf:'center',elevation:5}} size={100} source={{uri:userDetail.profile_image}} />
            <Text style={styles.headingtext}>{userDetail.name}</Text>
            <Text style={styles.subtext}>{user.email}</Text>
            <Button style={styles.button} mode="outlined" onPress={() => logout()}>
            Log Out
            </Button>
            <FlatList
                style={{marginTop:10,alignSelf:'center'}}
                data={userDetail.sports}
                renderItem={renderItem}
                keyExtractor={item => item}
                horizontal
            />
        </View>
        <View style={styles.box}>
            <TouchableHighlight>
                <View style={styles.fullbutton}>
                    <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <MaterialCommunityIcons size={28} name='heart' color='#88708a'/>
                    <Text style={{marginLeft:10,fontSize:15}}>Liked Profile</Text>
                    </View>
                    <MaterialCommunityIcons size={25} name='chevron-right'/>
                </View>
            </TouchableHighlight>
            <Divider/>
            <TouchableHighlight>
                <View style={styles.fullbutton}>
                    <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <MaterialCommunityIcons size={28} name='basketball' color='#88708a'/>
                    <Text style={{marginLeft:10,fontSize:15}}>Sports Meetup</Text>
                    </View>
                    <MaterialCommunityIcons size={25} name='chevron-right'/>
                </View>
            </TouchableHighlight>
            <Divider/>
            <TouchableHighlight>
                <View style={styles.fullbutton}>
                    <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <MaterialCommunityIcons size={28} name='account-group' color='#88708a'/>
                    <Text style={{marginLeft:10,fontSize:15}}>Manage Connections</Text>
                    </View>
                    <MaterialCommunityIcons size={25} name='chevron-right'/>
                </View>
            </TouchableHighlight>
        </View>
        <View style={styles.box}>
            <TouchableHighlight>
                    <View style={styles.fullbutton}>
                        <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                        <MaterialCommunityIcons size={28} name='account-cog' color='#88708a'/>
                        <Text style={{marginLeft:10,fontSize:15}}>Preference</Text>
                        </View>
                        <MaterialCommunityIcons size={25} name='chevron-right'/>
                    </View>
                </TouchableHighlight>
            <Divider/>
            <TouchableHighlight>
                    <View style={styles.fullbutton}>
                        <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                        <MaterialCommunityIcons size={28} name='handshake' color='#88708a'/>
                        <Text style={{marginLeft:10,fontSize:15}}>Contact Us</Text>
                        </View>
                        <MaterialCommunityIcons size={25} name='chevron-right'/>
                    </View>
            </TouchableHighlight>
            <TouchableHighlight>
                    <View style={styles.fullbutton}>
                        <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                        <MaterialCommunityIcons size={28} name='cog' color='#88708a'/>
                        <Text style={{marginLeft:10,fontSize:15}}>App Settings</Text>
                        </View>
                        <MaterialCommunityIcons size={25} name='chevron-right'/>
                    </View>
            </TouchableHighlight>
            <Divider/>
        </View>

    </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection:'column',
        padding: 8,
        paddingTop:20,
    },
    box:{
        backgroundColor:'white',
        borderRadius:10,
        elevation:3,
        paddingVertical:10,
        marginTop:12
    },
    headingtext:{
        fontSize:22,
        alignSelf:'center',
        marginTop:10,
    },
    subtext:{
        fontSize:15,
        alignSelf:'center',
        marginTop:5,
    },
    button:{
        width: 150,
        alignSelf:'center',
        borderColor:'blue',
        marginTop:10,
    },
    fullbutton:{
        display: 'flex',
        flexDirection:'row',
        alignItems:'center',
        padding: 8,
        paddingLeft:20,
        justifyContent:'space-between'
    }
    
})
