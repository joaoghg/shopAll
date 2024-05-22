import React, {useContext, useEffect, useState} from "react";
import {View, StyleSheet, Text, ScrollView, Pressable, Alert, Image} from "react-native";
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
        setOrder(response.data.order)
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

  console.log(order)

  const formatDate = (date) => {
    const newDate = new Date(date)

    const options = {
      day: '2-digit',
      month: 'long',
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
        <Text style={{ fontSize: 18, fontWeight: 'bold' }} >Pedido #{order?.id}</Text>
      </View>

      <ScrollView
        style={{
          marginTop: 20,
          marginHorizontal: 20
        }}
      >

        <View>
          <Text style={{ fontSize: 18, fontWeight: '500' }}>Data</Text>
          <Text style={{ fontSize: 16 }}>{formatDate(order?.createdAt.substring(0, 10))}</Text>
        </View>

        <Text style={{ borderWidth: 0.5, borderColor: '#D0D0D0', height: 1, marginVertical: 10 }} />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: '500' }}>Pagamento: </Text>
          <Text style={{ fontSize: 16 }}>{order?.paymentMethod === 'card' ? "Cartão" : "Dinheiro"}</Text>
        </View>

        <Text style={{ borderWidth: 0.5, borderColor: '#D0D0D0', height: 1, marginVertical: 10 }} />

        <View>
          <Text style={{ fontSize: 18, fontWeight: '500' }}>Endereço</Text>
          <Text style={{ fontSize: 16 }}>{order?.street}{order?.landmark && `, ${order.landmark}`}</Text>
          <Text style={{ fontSize: 16 }}>{order?.neighborhood}, CEP: {order?.cep}</Text>
          <Text style={{ fontSize: 16 }}>{order?.city}, {order?.state}</Text>
        </View>

        <Text style={{ borderWidth: 0.5, borderColor: '#D0D0D0', height: 1, marginVertical: 10 }} />

        <View>
          <Text style={{ fontSize: 18, fontWeight: '500' }}>Produtos</Text>
          {order?.products.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {/*<Image
                  source={{ uri: item.images }}
                  style={{
                    resizeMode: 'contain',
                    width: 140,
                    height: 140
                  }}
                />*/}
              </View>
            )
          })}
        </View>

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
