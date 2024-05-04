import React from "react";
import {View, StyleSheet, Text, ScrollView, Pressable, TextInput} from "react-native";
import MainHeader from "../components/MainHeader";

export default function ProductInfoScreen(){
  return (
    <ScrollView showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <MainHeader />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    flex: 1,
    backgroundColor: 'white'
  },
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
