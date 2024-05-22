import React, {useContext, useState, useEffect} from "react";
import {View, StyleSheet, Text, ScrollView, Pressable, TextInput, Alert} from "react-native";
import MainHeader from "../components/MainHeader";
import axios from "axios";
import { AuthContext } from "../contexts/Auth";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {AntDesign} from "@expo/vector-icons";
import ProductItem from "../components/ProductItem";

export default function SearchProductsScreen({ navigation, route }){

  const insets = useSafeAreaInsets()
  const { server } = useContext(AuthContext)

  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {

    if(route.params?.name){
      setName(route.params.name)
    }

    searchProducts()
  }, [])

  const searchProducts = async () => {
    try{
      const response = await axios.get(`${server}/products`)
      setProducts(response.data.products)
    }catch (error){
      if(error.response){
        Alert.alert("Erro", error.response.data.message)
      }
      else{
        Alert.alert("Erro", "Não foi possível carregar os produtos")
      }
    }
  }

  return (
    <>
      <View
        style={{
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          paddingBottom: insets.bottom,
          flex: 1,
          backgroundColor: 'white'
        }}
      >
        <View style={styles.viewPesquisar}>
          <Pressable style={styles.btnPesquisar}>
            <AntDesign name="search1" size={22} color="black" style={{ paddingLeft: 10 }} />
            <TextInput placeholder={"Pesquisar"} style={styles.inputPesquisar} value={name} onChangeText={setName} />
          </Pressable>
        </View>

        <ScrollView>
          <View style={styles.productsView}>
            {products?.filter((item) => name !== "" ? item.name.includes(name) : true)
              .filter((item) => categories.length > 0 ? categories.includes(item.categorieId) : true)
              .map((item, index) => {
                return (
                  <ProductItem item={item} key={index} />
                )
              })}
          </View>
        </ScrollView>
      </View>
    </>
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
  inputPesquisar: {
    flexGrow: 1
  },
  productsView: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  }
})
