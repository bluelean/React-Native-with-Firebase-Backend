import React,{useState,useContext, useEffect,createContext} from 'react'
import firestore from '@react-native-firebase/firestore'
import {AuthContext} from '../navigation/AuthProvider'

export const ChatContext = createContext();

export const ChatProvider = ({children}) =>{
    const{user} = useContext(AuthContext);
    const[chatUser, setChatUser] = useState([]);

    useEffect(()=>{
      if(user!==null){
          GetChatUser();
       }
    },[user])

    const GetChatUser = async() =>{
        firestore().collection('chats').where(user.uid,'array-contains-any','users').onSnapshot(snap=>{
            if(!snap.empty){
                setChatUser(snap.docs.map(data=>{return {id:data.id,data:data.data()}}));
            }
        })
    }
    return(
        <ChatContext.Provider value={{
            chatUser
        }}>
            {children}
        </ChatContext.Provider>
    )
}