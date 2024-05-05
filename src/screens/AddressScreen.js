import React from "react";
import {View, StyleSheet, Text, ScrollView, Platform, TextInput, Pressable} from "react-native";

export default function AddressScreen(){
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
            placeholder={"Nome"}
            placeholderTextColor={"black"}
            style={styles.input}
          />
        </View>

        <View>
          <Text style={{fontSize: 15,fontWeight: 'bold'}}>Celular</Text>

          <TextInput
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
            placeholder={"Informe o número"}
            placeholderTextColor={"black"}
            style={styles.input}
          />
        </View>

        <View>
          <Text style={{fontSize: 15,fontWeight: 'bold'}}>CEP</Text>

          <TextInput
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
            style={styles.input}
          />
        </View>

        <Pressable>

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
