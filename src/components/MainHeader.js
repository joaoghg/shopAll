import React from "react";
import {View, StyleSheet, Pressable, TextInput} from "react-native";
import {AntDesign, Feather} from "@expo/vector-icons";

export default function MainHeader(){
  return (
    <View style={styles.viewPesquisar}>
      <Pressable style={styles.btnPesquisar}>
        <AntDesign name="search1" size={22} color="black" style={{ paddingLeft: 10 }} />
        <TextInput placeholder={"Pesquisar"} />
      </Pressable>

      <Feather name="mic" size={24} color="black" />
    </View>
  )
}

const styles = StyleSheet.create({
  viewPesquisar: {
    backgroundColor: '#00ced1',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnPesquisar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 7,
    gap: 10,
    backgroundColor: 'white',
    borderRadius: 3,
    height: 38,
    flex: 1
  }
})
