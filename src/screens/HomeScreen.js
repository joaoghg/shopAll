import React, {useState, useEffect, useContext } from "react";
import {View, Text, StyleSheet, SafeAreaView, Platform, ScrollView, Pressable, TextInput, Image} from "react-native";
import { MaterialIcons, Entypo, Ionicons } from '@expo/vector-icons';
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import DropDownPicker from "react-native-dropdown-picker";
import MainHeader from "../components/MainHeader";
import {useSelector} from "react-redux";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {UserType} from "../contexts/UserContext";
import {AuthContext} from "../contexts/Auth";
import { jwtDecode } from "jwt-decode";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function HomeScreen({ navigation }){

  const insets = useSafeAreaInsets()

  const { server } = useContext(AuthContext)
  const { userId, setUserId } = useContext(UserType);

  const list = [
    {
      id: "0",
      image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
      name: "Início",
    },
    {
      id: "1",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg",
      name: "Promoções",
    },
    {
      id: "3",
      image:
        "https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg",
      name: "Eletrônicos",
    },
    {
      id: "4",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg",
      name: "Mobile",
    },
    {
      id: "5",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg",
      name: "Música",
    },
    {
      id: "6",
      image: "https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg",
      name: "Moda",
    },
  ]

  const images = [
    "https://img.freepik.com/psd-gratuitas/modelo-de-banner-para-mega-venda_23-2148729530.jpg?t=st=1716257566~exp=1716261166~hmac=febd41d7fe782997e22b8d46dbc759479e3914adcc56a759b642cc4ae91deffc&w=1380",
    "https://img.freepik.com/vetores-gratis/fundo-gradiente-de-venda_23-2148951073.jpg?t=st=1716257797~exp=1716261397~hmac=7944bf0eee19b819aed86c406f651756f7d8a7a9a166e802feb88f077344cf63&w=1380",
    "https://img.freepik.com/psd-gratuitas/design-de-modelo-de-joias_23-2150694444.jpg?t=st=1716257876~exp=1716261476~hmac=d9065b9d11aef06c02bfb638cfd3a5b573fecdd9b2254bdc7d975443072f41b1&w=1380",
  ]

  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([])
  const [category, setCategory] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("")
  const [items, setItems] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try{
        const response = await axios.get(`${server}/products`)
        setProducts(response.data.products)
      }catch(error){
        console.log("Erro", error)
      }
    }

    fetchData()

  }, []);

  useEffect(() => {

    const fetchCategories = async () => {
      try{
        const response = await axios.get(`${server}/categories`)
        setItems(response.data.categories)
      }catch(error){
        console.log("Erro", error)
      }
    }

    fetchCategories()

  }, []);


  const cart = useSelector(state => state.cart.cart)
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if(userId){
      fetchAddresses()
    }
  }, [userId, modalVisible])

  const fetchAddresses = async () => {
    try{
      const response = await axios.get(`${server}/addresses/${userId}`)
      const { addresses } = response.data

      setAddresses(addresses)
    }catch(error){
      console.log("erro", error)
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('authToken')
      const decodedToken = jwtDecode(token)
      const userId = decodedToken.userId
      setUserId(userId)
    }

    fetchUser()
  }, [])

  return (
    <>
      <SafeAreaView
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right
          }
        ]}
      >
        <ScrollView>

          <MainHeader />

          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={styles.locationView}
          >
            <Ionicons name="location-outline" size={24} color="black" />

            <Pressable>
              {selectedAddress ? (
                <Text style={styles.locationText}>Enviar para {selectedAddress?.name} - {selectedAddress?.street}</Text>
              ) : (
                <Text style={styles.locationText}>Selecione um endereço</Text>
              )}
            </Pressable>

            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </Pressable>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {list.map((item, index) => {
              return (
                <Pressable key={index}
                  style={{
                    margin: 10,
                    justifyContent: 'center'
                  }}
                >
                  <Image source={{uri: item.image}}
                    style={{width: 50, height: 50, resizeMode: 'contain'}}
                  />

                  <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: "500", marginTop: 5 }}>{item?.name}</Text>
                </Pressable>
              )
            })}
          </ScrollView>

          <SliderBox images={images} autoPlay circleLoop
            dotColor={"#13274F"} inactiveDotColor="#90A4AE"
            ImageComponentStyle={{width: '100%'}}
          />

          <Text style={{ padding:10, fontSize:18, fontWeight:"bold" }}>Ofertas da semana</Text>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            {products.slice(0, 4).map((item, index) => {
              return (
                <Pressable
                  onPress={() => navigation.navigate("Info", {
                    id: item.id,
                    name: item.name,
                    price: item?.price,
                    carouselImages: item.images,
                    color: item?.color,
                    size: item?.size,
                    offerPrice: item?.offerPrice,
                    item: item
                  })}
                  key={index}
                  style={{
                  marginVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <Image
                    source={{uri:item?.images.find(item => item.default === 1).path}}
                    style={{
                      width:180,
                      height: 180,
                      resizeMode: "contain"
                    }}
                  />
                </Pressable>
              )
            })}
          </View>

          <Text style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 2,
            marginTop: 15
          }} />

          <Text style={{
            padding: 10,
            fontSize: 18,
            fontWeight: "bold"
          }}>
            Ofertas do dia
          </Text>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {products.slice(4, 8).map((item, index) => {

              return (
                <Pressable key={index}
                  onPress={() => navigation.navigate("Info", {
                    id: item.id,
                    name: item.name,
                    price: item?.price,
                    carouselImages: item.images,
                    color: item?.color,
                    size: item?.size,
                    offerPrice: item?.offerPrice,
                    item: item
                  })}
                  style={{
                  marginVertical: 10,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Image
                    source={{uri: item?.images.find(item => item.default === 1).path}}
                    style={{
                      width: 150,
                      height: 150,
                      resizeMode: 'contain'
                    }}
                  />

                  <View style={{
                    backgroundColor: '#E31837',
                    paddingVertical: 5,
                    width: 130,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    borderRadius: 4
                  }}>
                    <Text style={{
                      textAlign: 'center',
                      color: 'white',
                      fontSize: 13,
                      fontWeight: 'bold'
                    }}>
                      {Number(((item.price - item.offerPrice) / item.price) * 100).toFixed(2)}% de desconto
                    </Text>
                  </View>
                </Pressable>
              )
            })}
          </ScrollView>

          <Text style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 2,
            marginTop: 15
          }} />

          <View
            style={{
              marginHorizontal: 10,
              marginTop: 20,
              width: "45%",
              marginBottom: open ? 50 : 15,
            }}
          >
            <DropDownPicker
              style={{
                borderColor: "#B7B7B7",
                height: 30,
                marginBottom: open ? 120 : 15,
              }}
              open={open}
              value={category}
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="Escolha a categoria"
              placeholderStyle={{}}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>

          <View style={styles.productsView}>
            {products.slice(8)?.filter((item) => item.categorieId === category)
              .map((item, index) => {
                return (
                  <ProductItem item={item} key={index} />
                )
            })}
          </View>

        </ScrollView>
      </SafeAreaView>

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
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Selecione o endereço</Text>
          </View>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >

            {addresses?.map((item, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => setSelectedAddress(item)}
                  style={{
                    width: 140,
                    height: 140,
                    borderColor: '#D0D0D0',
                    borderWidth: 1,
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 3,
                    marginRight: 15,
                    marginTop: 10,
                    backgroundColor: selectedAddress === item ? "#FBCEB1" : 'white'
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 3
                    }}
                  >
                    <Text style={{fontSize: 13, fontWeight: 'bold'}}>{item?.name}</Text>
                    <Entypo name="location-pin" size={24} color={'red'} />
                  </View>

                  <Text numberOfLines={1} style={{width: 130, fontSize: 13, textAlign: 'center'}}>{item?.houseNumber} {item?.landmark}</Text>

                  <Text numberOfLines={1} style={{width: 130, fontSize: 13, textAlign: 'center'}}>{item?.street}</Text>
                  <Text numberOfLines={1} style={{width: 130, fontSize: 13, textAlign: 'center'}}>Brasil, Pederneiras</Text>
                </Pressable>
              )
            })}

            <Pressable
              onPress={() => {
                setModalVisible(false)
                navigation.navigate("Address")
              }}
              style={{
                width: 140,
                height: 140,
                borderColor: "#D0D0D0",
                marginTop: 10,
                borderWidth: 1,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={{ textAlign: 'center', color: '#0066b2', fontWeight: "500" }}>Adicionar endereço</Text>
            </Pressable>
          </ScrollView>

        </ModalContent>
      </BottomModal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  locationView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    padding: 10,
    backgroundColor: '#AFEEEE'
  },
  locationText: {
    fontSize: 15,
    fontWeight: "500"
  },
  productsView: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  }
})
