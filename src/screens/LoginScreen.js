import React from "react";
import {StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput} from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

export default function LoginScreen(){

  const insets = useSafeAreaInsets()

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
          <Text style={styles.textLogin}>Faça o login na sua conta</Text>
        </View>

        <View style={{ marginTop: 70 }}>
          <View style={styles.viewEmail}>
            <MaterialIcons name="email" size={24} color="black" />

            <TextInput style={styles.inputEmail} placeholder={"Insira seu Email"} />
          </View>
        </View>
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
  viewEmail: {
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
  }
})
