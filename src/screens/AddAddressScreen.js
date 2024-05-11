import React, {useEffect, useState, useContext, useCallback} from "react";
import {View, StyleSheet, Text, ScrollView, Platform, Pressable} from "react-native";
import MainHeader from "../components/MainHeader";
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import axios from "axios";
import {AuthContext} from "../contexts/Auth";
import {UserType} from "../contexts/UserContext";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useFocusEffect} from "@react-navigation/native";

export default function AddAddressScreen({ navigation }){

  const insets = useSafeAreaInsets()
  const { userId, setUserId } = useContext(UserType);
  const { server } = useContext(AuthContext)

  const [addresses, setAddresses] = useState([])

  useEffect(() => {
    fetchAddresses()
  }, [])

  const fetchAddresses = async () => {
    try{
      const response = await axios.get(`${server}/addresses/${userId}`)
      const { addresses } = response.data

      setAddresses(addresses)
    }catch(error){
      console.log("erro", error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchAddresses()
    }, [])
  )

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right
      }}
    >
      <MainHeader />

      <View
        style={{
          padding: 10
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Seus endereços</Text>

        <Pressable
          onPress={() => navigation.navigate("Add")}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
            borderColor: '#D0D0D0',
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingVertical: 7,
            paddingHorizontal: 5
          }}
        >
          <Text>Adicionar um novo endereço</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>

        <Pressable
          style={{marginBottom: 30}}
        >
          {addresses?.map((item, index) => {
            return (
              <Pressable
                key={index}
                style={{
                  borderWidth: 1,
                  borderColor: '#D0D0D0',
                  padding: 10,
                  flexDirection: 'column',
                  gap: 5,
                  marginVertical: 10
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 3
                  }}
                >
                  <Text style={{fontSize: 15, fontWeight: 'bold'}}>{item?.name}</Text>
                  <Entypo name="location-pin" size={24} color={'red'} />
                </View>

                <Text style={{fontSize: 15, color: '#181818'}}>{item?.houseNumber} {item?.landmark}</Text>

                <Text style={{fontSize: 15, color: '#181818'}}>{item?.street}</Text>

                <Text style={{fontSize: 15, color: '#181818'}}>Brasil, Pederneiras</Text>

                <Text style={{fontSize: 15, color: '#181818'}}>Celular {item?.mobileNumber}</Text>
                <Text style={{fontSize: 15, color: '#181818'}}>CEP: {item?.cep}</Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    marginTop: 7
                  }}
                >
                  <Pressable
                    style={{
                      backgroundColor: '#F5F5F5',
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 5,
                      borderWidth: 0.9,
                      borderColor: '#D0D0D0'
                    }}
                  >
                    <Text>Editar</Text>
                  </Pressable>

                  <Pressable
                    style={{
                      backgroundColor: '#F5F5F5',
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 5,
                      borderWidth: 0.9,
                      borderColor: '#D0D0D0'
                    }}
                  >
                    <Text>Excluir</Text>
                  </Pressable>

                  <Pressable
                    style={{
                      backgroundColor: '#F5F5F5',
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 5,
                      borderWidth: 0.9,
                      borderColor: '#D0D0D0'
                    }}
                  >
                    <Text>Definir como padrão</Text>
                  </Pressable>
                </View>
              </Pressable>
            )
          })}
        </Pressable>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({

})
