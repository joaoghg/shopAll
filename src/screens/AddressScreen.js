import React, {useContext, useEffect, useState} from "react";
import {View, StyleSheet, Text, ScrollView, Platform, TextInput, Pressable} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import {UserType} from "../contexts/UserContext";

export default function AddressScreen(){

  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [cep, setCep] = useState("");

  const { userId, setUserId } = useContext(UserType);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('authToken')
      const decodedToken = jwtDecode(token)
      console.log(decodedToken)
      /*const userId = decodedToken.userId
      setUserId(userId)*/
    }

    fetchUser()
  }, [])

  const handleAddAddress = () => {

  }
  return (
    <ScrollView
      style={{
        marginTop: Platform.OS === 'android' ? 27 : 50
      }}
    >
      <View style={{ height: 50, backgroundColor: '#00CED1' }} />

      <View
        style={{ padding: 10 }}
      >
        <Text style={{fontSize: 17, fontWeight: 'bold'}}>Adicionar endereço</Text>

        <TextInput
          placeholder={"Brasil"}
          placeholderTextColor={"black"}
          style={styles.input}
        />

        <View
          style={{
            marginVertical: 10
          }}
        >
          <Text style={{fontSize: 15,fontWeight: 'bold'}}>Nome completo</Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={"Nome"}
            placeholderTextColor={"black"}
            style={styles.input}
          />
        </View>

        <View>
          <Text style={{fontSize: 15,fontWeight: 'bold'}}>Celular</Text>

          <TextInput
            value={mobileNumber}
            onChangeText={setMobileNumber}
            placeholder={"Informe o número"}
            placeholderTextColor={"black"}
            style={styles.input}
          />
        </View>

        <View
          style={{
            marginVertical: 10
          }}
        >
          <Text style={{fontSize: 15,fontWeight: 'bold'}}>Telefone</Text>

          <TextInput
            value={houseNumber}
            onChangeText={setHouseNumber}
            placeholder={"Informe o número"}
            placeholderTextColor={"black"}
            style={styles.input}
          />
        </View>

        <View>
          <Text style={{fontSize: 15,fontWeight: 'bold'}}>CEP</Text>

          <TextInput
            value={cep}
            onChangeText={setCep}
            style={styles.input}
          />
        </View>

        <View
          style={{
            marginVertical: 10
          }}
        >
          <Text style={{fontSize: 15,fontWeight: 'bold'}}>Rua</Text>

          <TextInput
            value={street}
            onChangeText={setStreet}
            style={styles.input}
          />
        </View>

        <View
          style={{
            marginVertical: 10
          }}
        >
          <Text style={{fontSize: 15,fontWeight: 'bold'}}>Complemento</Text>

          <TextInput
            value={landmark}
            onChangeText={setLandmark}
            style={styles.input}
          />
        </View>

        <Pressable
          onPress={handleAddAddress}
          style={{
            backgroundColor: '#FFC72C',
            padding: 19,
            borderRadius: 6,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20
          }}
        >
          <Text style={{fontWeight: 'bold'}}>Adicionar</Text>
        </Pressable>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5
  }
})
