import React,{useState, useRef, useEffect, useContext, createContext} from 'react'
import {AuthContext} from '../navigation/AuthProvider'
import firestore from '@react-native-firebase/firestore'

export const UserContext = createContext();

export const UserProvider = ({children}) =>{
    const{user} = useContext(AuthContext);
    const[userRemote, setUserRemote] = useState(null);
    const[connections, setConnections] = useState([]);
    const[connection_invites, setInvites] = useState([]);
    const[connection_requests, setRequests] = useState([]);

    useEffect(()=>{
        if(user!==null){
            GetUser();
        }
    },[user])

    async function GetUser(){
        firestore().collection('users').doc(user.uid).onSnapshot(snap=>{
            setUserRemote(snap.data());
            setInvites(snap.data().connection_invites!==undefined? snap.data().connection_invites : []);
            setRequests(snap.data().connection_requests!==undefined? snap.data().connection_requests : []);
            setConnections(snap.data().connections!==undefined? snap.data().connections : []);
        })    
    }
    
    return(
        <UserContext.Provider value={{
            userRemote,
            connections,
            connection_requests,
            connection_invites
            }}>
            {children}
        </UserContext.Provider>
    );
}