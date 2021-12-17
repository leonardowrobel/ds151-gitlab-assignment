import React from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from "../api/gitlab";

const AuthContext = React.createContext()

const removeValue = async () => {
    try {
        await AsyncStorage.removeItem('@Access_token')
    } catch (e) {
        console.log(e)
    }
}

const authReducer = (state, action) => {
    switch (action.type) {
        case 'login': {
            return { ...state, accessToken: action.accessToken }
        }
        case 'logout': {
            removeValue()
            return { ...state, accessToken: null }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}


const AuthProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(authReducer, { accessToken: null })
    const [userName, setUserName] = React.useState('')
    const [userData, setUserData] = React.useState('')
    const value = { state, dispatch, userName, setUserName, userData }

    const tryGetUserData = async (accessToken, userName) => {

        let headers = {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' + accessToken
        };
    
        await client.get('api/v4/users?search=' + userName,
        {
            headers: headers
        },
        {
            search: userName
        })
        .then(response => {
            console.log(response.data[0])
            setUserData(response.data[0])
        })
            .catch(error => {
                console.log(error)
            })
    }

    React.useEffect(() => {
        if (state !== null && state !== undefined) {
            AsyncStorage.setItem('@Access_token', state)
            let gettingUserData = tryGetUserData(state.accessToken, userName)
            
            console.log(gettingUserData)
            //console.log(userData)
        }
    }, [state])

    React.useEffect(() => {
        AsyncStorage.getItem('@Access_token').then((value) => {
            if (value) {
                dispatch({ type: 'login', accessToken: value })
            }
        })
    }, [])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider')
    }
    return context
}

export { AuthProvider, useAuth }