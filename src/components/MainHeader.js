import React, {useState} from "react";
import {View, StyleSheet, Pressable, TextInput} from "react-native";
import {AntDesign, Feather} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

export default function MainHeader(){

  const navigation = useNavigation()
  const [value, setValue] = useState("");

  const searchProducts = () => {
    navigation.navigate("Products", {
      name: value
    })
  }

  return (
    <View style={styles.viewPesquisar}>
      <Pressable style={styles.btnPesquisar}>
        <AntDesign name="search1" size={22} color="black" style={{ paddingLeft: 10 }} />
        <TextInput placeholder={"Pesquisar"} style={styles.input} value={value} onChangeText={setValue} onSubmitEditing={searchProducts} />
      </Pressable>
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
  },
  input: {
    flexGrow: 1
  }
})
