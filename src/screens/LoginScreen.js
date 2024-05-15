import React, {useEffect, useState, useContext} from "react";
import {StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput, Pressable, Alert} from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext} from "../contexts/Auth";

export default function LoginScreen({ navigation }){

  const auth = useContext(AuthContext)

  const insets = useSafeAreaInsets()

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      try{
        const token = await AsyncStorage.getItem('authToken')

        if(token){
          navigation.replace("Main")
        }
      }catch(error){
        console.log(error)
      }
    }

    checkLoginStatus()
  }, []);


  const handleLogin = () => {
    if(email === "" || senha === ""){
      Alert.alert("Atenção", "Informe o email e a senha")
      return false
    }

    const user = {
      email: email,
      password: senha
    }

    axios.post(`${auth.server}/login`, user)
      .then(response => {
        const token = response.data.token
        AsyncStorage.setItem("authToken", token)
        navigation.replace("Main")
      })
      .catch(error => {
        if(error.response){
          Alert.alert("Erro no login", error.response.data.message)
        }
        else{
          Alert.alert("Erro no login", "Ocorreu um erro durante o login")
        }
      })
  }

  return (
    <View style={[styles.container,
        { paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right
        }
      ]}
    >
      <View>
        <Image style={{ width: 150, height: 100 }}
          source={require('../../assets/logo.png')}
          resizeMode={"contain"}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.textLogin}>Entre na sua conta</Text>
        </View>

        <View style={{ marginTop: 70 }}>
          <View style={styles.viewInput}>
            <MaterialIcons style={styles.iconEmail} name="email" size={24} color="gray" />

            <TextInput style={[styles.inputEmail, { fontSize: email ? 16 : 16} ]}
              placeholder={"Insira seu Email"}
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View>
          <View style={styles.viewInput}>
            <MaterialIcons style={styles.iconEmail} name="lock" size={24} color="gray" />

            <TextInput style={[styles.inputEmail, { fontSize: senha ? 16 : 16 }]}
              placeholder={"Insira sua senha"}
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={true}
            />
          </View>
        </View>

        <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text style={{ color: '#007FFF', fontWeight: "500" }}>Esqueceu a senha?</Text>
        </View>

        <View style={{ marginTop: 80 }} />

        <Pressable
          onPress={handleLogin}
          style={{
            width: 200,
            backgroundColor: '#FEBE10',
            borderRadius: 6,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 15
          }}
        >
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 16, fontWeight: "bold" }}>Login</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Register')}
          style={{
            marginTop: 15
          }}
        >
          <Text style={{ textAlign: 'center', color: 'gray', fontSize: 16 }}>Não possui uma conta? Cadastrar</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  textLogin: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#041e42'
  },
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#D0D0D0',
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 30
  },
  inputEmail: {
    color: 'gray',
    marginVertical: 10,
    width: 300
  },
  iconEmail: {
    marginLeft: 8
  }
})
