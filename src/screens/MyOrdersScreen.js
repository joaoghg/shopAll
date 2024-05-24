import React, {useContext, useEffect, useState} from "react";
import {View, StyleSheet, Text, ScrollView, FlatList, Pressable, TextInput, Alert} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import axios from "axios";
import { AuthContext } from "../contexts/Auth";
import {UserType} from "../contexts/UserContext";
import {AntDesign} from "@expo/vector-icons";

export default function MyOrdersScreen({ navigation }){

  const insets = useSafeAreaInsets()
  const { server } = useContext(AuthContext)
  const { userId } = useContext(UserType)

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const fetchOrders = async () => {
      try{
        const response = await axios.get(`${server}/orders/${userId}`)
        setOrders(response.data.orders)
      }catch (error){
        if(error.response){
          Alert.alert("Erro", error.response.data.message)
        }
        else{
          Alert.alert("Erro", "Não foi possível carregar os pedidos")
        }
      }
    }

    fetchOrders()

  }, [])

  const formatDate = (date) => {
    const newDate = new Date(date)

    const options = {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    };

    return newDate.toLocaleDateString('pt-BR', options);
  }

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

      <FlatList
        style={{
          marginVertical: 10,
        }}
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({item}) => {

          return (
            <View
              style={{
                borderColor: '#D0D0D0',
                borderWidth: 1.5,
                marginHorizontal: 20,
                marginVertical: 10,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 10,
                  justifyContent: 'space-between'
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "500" }}>Número do pedido: {item.id}</Text>
                <Pressable
                  onPress={() => navigation.navigate("OrderDetails", { id: item.id })}
                >
                  <AntDesign name="right" size={24} color="black" />
                </Pressable>
              </View>

              <View style={{ borderColor: '#D0D0D0', borderWidth: 0.5 }} />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 10
                }}
              >
                <View>
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>Data</Text>
                  <Text>{formatDate(item.createdAt.substring(0, 10))}</Text>
                </View>

                <View>
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>Valor</Text>
                  <Text>R$ {new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(item.totalPrice)}</Text>
                </View>

                <View>
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>Pagamento</Text>
                  <Text>{item.paymentMethod === 'card' ? 'Cartão' : 'Dinheiro'}</Text>
                </View>
              </View>
            </View>
          )
        }}
      />

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
