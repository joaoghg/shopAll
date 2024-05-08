import React, { useEffect, useState, useContext } from "react";
import {View, StyleSheet, Text, ScrollView, Platform, Pressable} from "react-native";
import MainHeader from "../components/MainHeader";
import { MaterialIcons } from '@expo/vector-icons';
import axios from "axios";
import {AuthContext} from "../contexts/Auth";
import {UserType} from "../contexts/UserContext";

export default function AddAddressScreen({ navigation }){

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

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        marginTop: Platform.OS === 'android' ? 27 : 50
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

        <Pressable>

        </Pressable>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({

})
