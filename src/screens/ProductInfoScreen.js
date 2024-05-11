import React, {useState} from "react";
import {View, StyleSheet, Text, ScrollView, ImageBackground, Dimensions, Pressable} from "react-native";
import MainHeader from "../components/MainHeader";
import {useNavigation, useRoute} from "@react-navigation/native";
import { MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import {useDispatch} from "react-redux";
import {addToCart} from "../redux/CartReducer";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const { width } = Dimensions.get("window")

export default function ProductInfoScreen(){

  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const route = useRoute()
  const product = route.params
  const dispatch = useDispatch()

  const [addedToCart, setAddedToCart] = useState(false);

  const addItemToCart = (item) => {
    setAddedToCart(true)
    dispatch(addToCart(item))
    setTimeout(() => {
      setAddedToCart(false)
    }, 60000)
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}
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
      <MainHeader />

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {product.carouselImages.map((item, index) => {
          return (
            <ImageBackground
              key={index}
              source={{uri:item}}
              style={styles.backgroundImage}
            >
              <View
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                {product?.offer && (
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: '#C60C30',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row'
                    }}
                  >
                    <Text
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        fontWeight: '600',
                        fontSize: 12
                      }}
                    >
                      - {product?.offer}
                    </Text>
                  </View>
                )}


                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: '#E0E0E0',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                  }}
                >
                  <MaterialCommunityIcons name="share-variant" size={24} color="black" />
                </View>
              </View>

              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#E0E0E0',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: 'auto',
                  marginLeft: 20,
                  marginBottom: 20
                }}
              >
                <AntDesign name="hearto" size={24} color="black" />
              </View>
            </ImageBackground>
          )
        })}
      </ScrollView>

      <View
        style={styles.infoView}
      >
        <Text style={styles.prdTitle}>{product?.title}</Text>

        <Text style={styles.price}>R$ {product?.price}</Text>
      </View>

      <Text style={{ height: 1, borderColor: '#D0D0D0', borderWidth: 1 }}></Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10
        }}
      >
        <Text>Cor: </Text>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>
          {product?.color}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10
        }}
      >
        <Text>Tamanho: </Text>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>
          {product?.size}
        </Text>
      </View>

      <Text style={{ height: 1, borderColor: '#D0D0D0', borderWidth: 1 }}></Text>

      <View
        style={{
          padding: 10
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            marginVertical: 5
          }}
        >
          Total: R$ {product?.price}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            marginVertical: 5,
            alignItems: 'center',
            gap: 5
          }}
        >
          <Ionicons name="location" size={24} color="black" />

          <Text
            style={{
              fontSize: 15,
              fontWeight: '500'
            }}
          >
            Enviar para João - Pederneiras 17284066
          </Text>
        </View>
      </View>

      <Text
        style={{
          color: 'green',
          marginHorizontal: 10,
          fontWeight: '500'
        }}
      >
        Em estoque
      </Text>

      <Pressable
        onPress={() => addItemToCart(product?.item)}
        style={{
          backgroundColor: '#FFC72C',
          padding: 10,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginVertical: 10
        }}
      >
        {addedToCart ? (
          <View>
            <Text>Adicionado ao carrinho</Text>
          </View>
        ) : (
          <Text>Adicionar ao carrinho</Text>
        )}
      </Pressable>

      <Pressable
        style={{
          backgroundColor: '#FFAC1C',
          padding: 10,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginTop: 10,
          marginBottom: 45
        }}
      >
        <Text>
          Comprar agora
        </Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  backgroundImage: {
    marginTop: 25,
    resizeMode: 'contain',
    width: width,
    height: width
  },
  infoView: {
    padding: 10,
  },
  prdTitle: {
    fontSize: 15,
    fontWeight: '500'
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 6
  }
})
