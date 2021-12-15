import React, { useState, useEffect } from 'react';
import { useAuth } from "./context/AuthContext";
import { useIsFocused } from "@react-navigation/native";

const Logout = ({ navigation }) => {
    const isFocused = useIsFocused();

    const { dispatch } = useAuth()

    useEffect(() => {
        dispatch({ type: 'logout' })
        navigation.navigate('Home')
    }, [navigation, isFocused]);

    return (
        <></>
    )
}

export default Logout