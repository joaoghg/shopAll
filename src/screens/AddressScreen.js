import React, {useContext, useEffect, useState} from "react";
import {View, StyleSheet, Text, ScrollView, Platform, TextInput, Pressable, Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import {UserType} from "../contexts/UserContext";
import "core-js/stable/atob";
import axios from "axios";
import {AuthContext} from "../contexts/Auth";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function AddressScreen({ navigation }){

  const insets = useSafeAreaInsets()

  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [cep, setCep] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Brasil");
  const [state, setState] = useState("");
  const [neighborhood, setNeighborhood] = useState("");

  const { userId, setUserId } = useContext(UserType);
  const { server } = useContext(AuthContext)

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('authToken')
      const decodedToken = jwtDecode(token)
      const userId = decodedToken.userId
      setUserId(userId)
    }

    fetchUser()
  }, [])

  const handleAddAddress = () => {

    if(name === ""){
      Alert.alert("Atenção", "Informe o nome")
      return false
    }
    if(houseNumber === "" && mobileNumber === ""){
      Alert.alert("Atenção", "Informe pelo menos um número de contato")
      return false
    }
    if(cep === ""){
      Alert.alert("Atenção", "Informe o cep")
      return false
    }
    if(state === ""){
      Alert.alert("Atenção", "Informe o estado")
      return false
    }
    if(city === ""){
      Alert.alert("Atenção", "Informe a cidade")
      return false
    }
    if(neighborhood === ""){
      Alert.alert("Atenção", "Informe o bairro")
      return false
    }
    if(street === ""){
      Alert.alert("Atenção", "Informe a rua")
      return false
    }

    const address = {
      name,
      mobileNumber,
      houseNumber,
      street,
      landmark,
      cep,
      userId,
      city,
      country,
      state,
      neighborhood
    }

    axios.post(`${server}/addresses`, {userId, address})
      .then(response => {
        Alert.alert("Sucesso", "Endereço adicionado")
        setName("")
        setMobileNumber("")
        setHouseNumber("")
        setStreet("")
        setLandmark("")
        setCep("")

        setTimeout(() => {
          navigation.goBack()
        }, 500)
      })
      .catch(error => {
        if(error.response){
          Alert.alert("Erro", error.response.data.message)
        }
        else{
          Alert.alert("Erro", "Não foi possível salvar o endereço")
        }
        console.log("erro", error)
      })
  }

  const buscaCep = async () => {
    if (cep !== "" && cep.replace(/^\d$/g, '').length === 8){
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

      setState(response.data.uf)
      setStreet(response.data.logradouro)
      setNeighborhood(response.data.bairro)
      setLandmark(response.data.complemento)
      setCity(response.data.localidade)
    }
  }

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right
      }}
    >
      <ScrollView >
        <View style={{ height: 50, backgroundColor: '#00CED1' }} />

        <View
          style={{ padding: 10 }}
        >
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>Adicionar endereço</Text>

          <View
            style={{
              marginTop: 20
            }}
          >
            <Text style={{fontSize: 15,fontWeight: 'bold'}}>Nome</Text>

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder={"Nome"}
              placeholderTextColor={"black"}
              style={styles.input}
            />
          </View>

          <View
            style={{
              marginVertical: 10
            }}
          >
            <Text style={{fontSize: 15,fontWeight: 'bold'}}>País</Text>

            <TextInput
              placeholderTextColor={"black"}
              style={styles.input}
              editable={false}
              value={country}
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
              onBlur={buscaCep}
              style={styles.input}
            />
          </View>

          <View
            style={{
              marginVertical: 10
            }}
          >
            <Text style={{fontSize: 15,fontWeight: 'bold'}}>Estado</Text>

            <TextInput
              value={state}
              onChangeText={setState}
              style={styles.input}
            />
          </View>

          <View>
            <Text style={{fontSize: 15,fontWeight: 'bold'}}>Cidade</Text>

            <TextInput
              value={city}
              onChangeText={setCity}
              style={styles.input}
            />
          </View>

          <View
            style={{
              marginVertical: 10
            }}
          >
            <Text style={{fontSize: 15,fontWeight: 'bold'}}>Bairro</Text>

            <TextInput
              value={neighborhood}
              onChangeText={setNeighborhood}
              style={styles.input}
            />
          </View>

          <View>
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
              marginVertical: 20,
            }}
          >
            <Text style={{fontWeight: 'bold'}}>Adicionar</Text>
          </Pressable>

        </View>
      </ScrollView>
    </View>
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
