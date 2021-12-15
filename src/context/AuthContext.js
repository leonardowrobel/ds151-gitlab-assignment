import React from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const value = { state, dispatch }

    React.useEffect(() => {
        if (state !== null && state !== undefined) {
            AsyncStorage.setItem('@Access_token', state)
        }
    }, [state])

    React.useEffect(() => {
        AsyncStorage.getItem('@Access_token').then((value) => {
            if (value) {
                console.log(JSON.stringify(value))
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