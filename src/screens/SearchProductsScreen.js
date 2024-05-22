import React, {useContext, useState, useEffect} from "react";
import {View, StyleSheet, Text, ScrollView, Pressable, TextInput, Alert, FlatList} from "react-native";
import MainHeader from "../components/MainHeader";
import axios from "axios";
import { AuthContext } from "../contexts/Auth";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {AntDesign, Entypo, Ionicons, MaterialIcons} from "@expo/vector-icons";
import ProductItem from "../components/ProductItem";
import {BottomModal, ModalContent, SlideAnimation} from "react-native-modals";
import { Checkbox } from 'react-native-paper';

export default function SearchProductsScreen({ navigation, route }){

  const insets = useSafeAreaInsets()
  const { server } = useContext(AuthContext)

  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {

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

    if(route.params?.name){
      setName(route.params.name)
    }

    searchProducts()
  }, [])

  useEffect(() => {

    const fetchCategories = async () => {
      try{
        const response = await axios.get(`${server}/categories`)
        setCategories(response.data.categories)
      }catch (error){
        console.log(error)
      }
    }

    fetchCategories()
  }, [])

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

        <Pressable
          onPress={() => setModalVisible(!modalVisible)}
          style={styles.categoriesView}
        >
          <Pressable>
            <Text style={styles.categoriesText}>Selecione categorias</Text>
          </Pressable>

          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </Pressable>

        <ScrollView>
          <View style={styles.productsView}>
            {products?.filter((item) => name !== "" ? item.name.toLowerCase().includes(name.toLowerCase()) : true)
              .filter((item) => selectedCategories.length > 0 ? selectedCategories.includes(item.categorieId) : true)
              .map((item, index) => {
                return (
                  <ProductItem item={item} key={index} />
                )
              })}
          </View>
        </ScrollView>
      </View>

      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom'
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent
          style={{
            width: '100%',
            height: 400
          }}
        >
          <View
            style={{
              marginBottom: 8
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Selecione as categorias</Text>
          </View>

          <FlatList
            data={categories}
            renderItem={({item}) => {
              return (
                <Pressable
                  onPress={() => {
                    const newCategories = [...selectedCategories]
                    if(selectedCategories.includes(item.value)){
                      newCategories.splice(newCategories.indexOf(item.value), 1)
                      setSelectedCategories(newCategories)
                    }
                    else {
                      newCategories.push(item.value)
                      setSelectedCategories(newCategories)
                    }
                  }}
                  style={{
                    padding: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: selectedCategories.includes(item.value) ? '#AFEEEE' : 'white'
                  }}
                >
                  <Text style={{ fontSize: 16 }} numberOfLines={1}>{item.label}</Text>
                </Pressable>
              )
            }}
            keyExtractor={item => item.value}
          />

        </ModalContent>
      </BottomModal>
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
  },
  categoriesView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    padding: 10,
    backgroundColor: '#AFEEEE',
    paddingLeft: 25
  },
  categoriesText: {
    fontSize: 15,
    fontWeight: "500",
    width: 280
  },
})
