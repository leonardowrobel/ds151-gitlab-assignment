import 'react-native-gesture-handler';
import React from 'react'
import HomeScreen from './src/screens/HomeScreen'
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/context/AuthContext'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native';
import { View, Button } from 'react-native';
import Logout from './src/Logout';

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         onPress={() => navigation.navigate('Notifications')}
//         title="Go to notifications"
//       />
//     </View>
//   );
// }

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <AuthProvider>
        <Drawer.Navigator initialRouteName="Home" drawerContent={props => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem label="Logout" onPress={() => props.navigation.navigate('Logout')} />
            </DrawerContentScrollView>
          )
        }}>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Notifications" component={NotificationsScreen} />
          <Drawer.Screen name="Logout" component={Logout} />
        </Drawer.Navigator>
      </AuthProvider >
    </NavigationContainer>
  )
}

export default App