import React from "react"
import { useAuth } from "../context/AuthContext"
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import client from "../api/gitlab"

const HomeScreen = ({ navigation }) => {

    const { state: { accessToken }, dispatch, setUserName, userData } = useAuth()
    const [user, setUser] = React.useState('')
    const [password, setPassword] = React.useState('')

    const tryLogin = async () => {
        await client.post('oauth/token', null, {
            params: {
                grant_type: 'password',
                username: user,
                password: password
            }
        })
            .then(response => {
                setUserName(user)
                dispatch({ type: 'login', accessToken: response.data.access_token })                
            })
            .catch(error => {
                console.log(error)
            })

        
        setUser('')
        setPassword('')
    }

    const tryLogout = async () => {
        dispatch({ type: 'logout' })
    }

    // console.log(accessToken)

    if (accessToken !== null && accessToken !== undefined) {
        return (
            <View style={styles.container}>
                <Text>HomeScreenn</Text>
                <Text>{(userData !== null && userData !== undefined) ? userData.name : 'make login'}</Text>
                <Button
                    title="Logout"
                    onPress={tryLogout}
                />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <Text>Login</Text>
                <TextInput
                    onChangeText={setUser}
                    value={user}
                    placeholder="Type your user"
                    style={styles.input}
                />
                <TextInput
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Type your password"
                    secureTextEntry={true}
                    style={styles.input}
                />
                <Button
                    onPress={tryLogin}
                    title="Login"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#aaaaaa',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HomeScreen