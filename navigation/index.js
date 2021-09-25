import React,{useContext} from 'react'
import Routes from './Routes'
import {AuthProvider} from './AuthProvider'
import {ProfileProvider} from '../context/ProfilesContext'
import { UserProvider } from '../context/UserContext'
import { ChatProvider } from '../context/ChatContext'
const Providers = () =>{
    return(
        <AuthProvider>
            <UserProvider>
                <ProfileProvider>
                    <ChatProvider>
                        <Routes/>
                    </ChatProvider>
                </ProfileProvider>
            </UserProvider>
        </AuthProvider>
    )
}
export default Providers;