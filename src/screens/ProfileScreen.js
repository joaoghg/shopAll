import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import {View, StyleSheet, Text, Pressable, Image, ScrollView} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import { Ionicons, AntDesign } from "@expo/vector-icons"
import axios from "axios";
import { AuthContext } from "../contexts/Auth";
import {UserType} from "../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerStyle: {
        backgroundColor: '#00CED1'
      },
      headerLeft: () => (
        <Image
          style={{ width: 140, height: 120, resizeMode: "contain" }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png",
          }}
        />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginRight: 12,
          }}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />

          <AntDesign name="search1" size={24} color="black" />
        </View>
      )
    })
  }, [])

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
      <ScrollView
        style={{
          padding: 10
        }}
      >
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

          <Pressable
            style={styles.pressables}
          >
            <Text style={{textAlign: 'center'}}>Minha conta</Text>
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
            style={styles.pressables}
          >
            <Text style={{textAlign: 'center'}}>Comprar novamente</Text>
          </Pressable>

          <Pressable
            onPress={logout}
            style={styles.pressables}
          >
            <Text style={{textAlign: 'center'}}>Sair</Text>
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {loading ? (
            <Text>Loading...</Text>
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <Pressable
                style={{
                  marginTop: 20,
                  padding: 15,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#d0d0d0",
                  marginHorizontal: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={order.id}
              >
                {order.products.slice(0, 1)?.map((product) => (
                  <View style={{ marginVertical: 10 }} key={product.id}>
                    <Image
                      source={{ uri: product.image }}
                      style={{ width: 100, height: 100, resizeMode: "contain" }}
                    />
                  </View>
                ))}
              </Pressable>
            ))
          ) : (
            <Text>No orders found</Text>
          )}
        </ScrollView>

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  pressables: {
    padding: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 25,
    flex: 1
  }
})
