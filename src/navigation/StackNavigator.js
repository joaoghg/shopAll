import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { Entypo } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function StackNavigator(){
  const Stack = createNativeStackNavigator()
  const Tab = createBottomTabNavigator()

  function BottomTabs(){
    return (
      <Tab.Navigator>
        <Tab.Screen name={"Home"}
          component={HomeScreen}
          options={{
            tabBarLabel: "Início",
            tabBarLabelStyle: {color: "#008E97"},
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Entypo name="home" size={24} color={'#008E97'} />
              ) : (
                <AntDesign name={'home'} size={24} color={'black'} />
              )
          }}
        />
        <Tab.Screen name={"Profile"}
          component={HomeScreen}
          options={{
            tabBarLabel: "Perfil",
            tabBarLabelStyle: {color: "#008E97"},
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Ionicons name="person" size={24} color="#008E97" />
              ) : (
                <Ionicons name="person-outline" size={24} color="black" />
              )
          }}
        />
        <Tab.Screen name={"Cart"}
          component={HomeScreen}
          options={{
            tabBarLabel: "Carrinho",
            tabBarLabelStyle: {color: "#008E97"},
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <FontAwesome5 name="shopping-cart" size={24} color="#008E97" />
              ) : (
                <AntDesign name="shoppingcart" size={24} color="black" />
              )
          }}
        />
      </Tab.Navigator>
    )
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
