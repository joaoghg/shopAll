import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import {View, StyleSheet, Text, Pressable, Image, ScrollView} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import { Ionicons, AntDesign } from "@expo/vector-icons"
import axios from "axios";
import { AuthContext } from "../contexts/Auth";
import {UserType} from "../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainHeader from "../components/MainHeader";

export default function ProfileScreen({ navigation }){

  const insets = useSafeAreaInsets()
  const { server } = useContext(AuthContext)
  const { userId } = useContext(UserType)

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({})
  const [orders, setOrders] = useState([]);

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem('authToken')
    navigation.replace("Login")
  }

  const logout = () => {
    clearAuthToken()
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
      try{
        const response = await axios.get(`${server}/profile/${userId}`)

        const { user } = response.data
        setUser(user)
      }catch (error){
        console.log(error)
      }
    }

    const fetchOrders = async () => {
      try{
        const response = await axios.post(`${server}/orders/${userId}`)

        const { orders } = response.data
        setOrders(orders)
        setLoading(false)
      }catch (error){
        console.log(error)
      }
    }

    fetchUserProfile()
    fetchOrders()

  }, [])

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingRight: insets.right,
        paddingLeft: insets.left,
        flex: 1,
        backgroundColor: 'white'
      }}
    >
      <ScrollView>

        <MainHeader />

        <View style={{ padding: 10 }}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Bem vindo {user?.name}</Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              marginTop: 12
            }}
          >
            <Pressable
              style={styles.pressables}
            >
              <Text style={{textAlign: 'center'}}>Meus pedidos</Text>
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              marginTop: 12
            }}
          >
            <Pressable
              onPress={logout}
              style={styles.pressables}
            >
              <Text style={{textAlign: 'center'}}>Sair</Text>
            </Pressable>
          </View>
        </View>


      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  pressables: {
    padding: 10,
    backgroundColor: '#FFC72C',
    borderRadius: 25,
    flex: 1,
    marginVertical: 5
  }
})
