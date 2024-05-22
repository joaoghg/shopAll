import React, {useContext, useEffect, useState} from "react";
import {View, StyleSheet, Text, ScrollView, Pressable, Alert} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {AuthContext} from "../contexts/Auth";
import axios from "axios";
import {AntDesign} from "@expo/vector-icons";

export default function OrderDetailsScreen({ navigation, route }){

  const insets = useSafeAreaInsets()
  const { server } = useContext(AuthContext)

  const [order, setOrder] = useState({});

  const orderId = route.params.id

  useEffect(() => {

    const fetchOrder = async () => {
      try{
        const response = await axios.get(`${server}/orderDetails/${orderId}`)
        setOrders(response.data.orders)
      }catch (error){
        if(error.response){
          Alert.alert("Erro", error.response.data.message)
        }
        else{
          Alert.alert("Erro", "Não foi possível carregar o pedido")
        }
      }
    }

    fetchOrder()

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

      <View style={styles.viewHeader}>
        <Pressable
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }} >Meus Pedidos</Text>
      </View>

      <ScrollView>

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  viewHeader: {
    backgroundColor: '#00ced1',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    gap: 10
  }
})
